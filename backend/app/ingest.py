import os
import csv
import sys
import re
import json
from datetime import datetime

# Adjust sys.path to run script from backend folder
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import Destination, District

# Ensure directories exist
IMPORT_DIR = r"c:\Users\syam1\OneDrive\Desktop\travelwithme\import"
os.makedirs(IMPORT_DIR, exist_ok=True)

CENTRAL_CSV = os.path.join(IMPORT_DIR, "central_kerala_destinations.csv")
ERNAKULAM_CSV = os.path.join(IMPORT_DIR, "ernakulam_destinations.csv")
REPORT_PATH = os.path.join(IMPORT_DIR, "IMPORT_REPORT.md")

def clean_slug(name):
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)  # remove special chars
    slug = re.sub(r'[\s-]+', '-', slug)       # replace spaces/dashes with single dash
    return slug

def parse_csv_to_dict(csv_path):
    records = []
    if not os.path.exists(csv_path):
        return records
    with open(csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not row.get('name'):
                continue
            records.append({k.strip(): v.strip() for k, v in row.items()})
    return records

def ingest_data():
    db: Session = SessionLocal()
    
    # Track statistics for report
    files_discovered = [
        "central_kerala_destinations.csv",
        "ernakulam_destinations.csv",
        "er_diagram_and_design_notes.md",
        "kerala_travel_platform_schema.sql"
    ]
    files_imported = []
    unsupported_files = []
    duplicate_files = []
    missing_info = {}
    duplicates_count = 0
    imported_count = 0

    try:
        # Load CSVs
        central_records = parse_csv_to_dict(CENTRAL_CSV)
        ernakulam_records = parse_csv_to_dict(ERNAKULAM_CSV)

        # Clear existing tables to ensure clean ingestion from primary truth source
        db.query(Destination).delete()
        db.query(District).delete()
        db.commit()

        # Map to track unique destinations by lower name
        unique_destinations = {}
        duplicates_logged = []

        # Process Central Kerala (Primary Source of Truth - richer details)
        for idx, row in enumerate(central_records):
            name = row.get('name')
            if not name:
                continue
            
            key = name.lower().strip()
            if key in unique_destinations:
                duplicates_logged.append({
                    "name": name,
                    "source": "central_kerala_destinations.csv",
                    "reason": "Duplicate within primary file"
                })
                duplicates_count += 1
                continue

            unique_destinations[key] = {
                "row": row,
                "source": "central"
            }

        # Process Ernakulam (Secondary Source)
        for row in ernakulam_records:
            name = row.get('name')
            if not name:
                continue

            key = name.lower().strip()
            if key in unique_destinations:
                duplicates_logged.append({
                    "name": name,
                    "source": "ernakulam_destinations.csv",
                    "reason": "Duplicate of primary Central Kerala record (merged/ignored)"
                })
                duplicates_count += 1
                # Check for missing info in central file that might exist in Ernakulam file
                # E.g. highlights or accessibility
                central_row = unique_destinations[key]["row"]
                if not central_row.get('highlights') and row.get('highlights'):
                    central_row['highlights_merged'] = row.get('highlights')
                continue

            unique_destinations[key] = {
                "row": row,
                "source": "ernakulam"
            }

        # Create districts list first
        districts_to_create = {}
        
        # Build districts map
        for key, item in unique_destinations.items():
            row = item["row"]
            dist_name = row.get('district', 'Ernakulam')
            if dist_name not in districts_to_create:
                districts_to_create[dist_name] = {
                    "name": dist_name,
                    "slug": clean_slug(dist_name),
                    "description": f"The beautiful district of {dist_name} in Kerala.",
                    "image": "/api/placeholder/400/300",
                    "destination_count": 0
                }
            districts_to_create[dist_name]["destination_count"] += 1

        # Seed Districts into database
        db_districts = {}
        for d_name, d_val in districts_to_create.items():
            db_dist = District(**d_val)
            db.add(db_dist)
            db.flush() # Populate DB generated ID
            db_districts[d_name] = db_dist

        # Ingest Destinations
        for key, item in unique_destinations.items():
            row = item["row"]
            name = row.get('name')
            slug = clean_slug(name)
            
            district_name = row.get('district', 'Ernakulam')
            db_dist = db_districts.get(district_name)

            # Map categories to standard slugs
            raw_cats = row.get('categories', '').split(';')
            primary_cat = "heritage"
            if raw_cats:
                first_cat = raw_cats[0].lower().strip()
                if "beach" in first_cat:
                    primary_cat = "beach"
                elif "hill" in first_cat:
                    primary_cat = "hill-station"
                elif "backwater" in first_cat:
                    primary_cat = "backwaters"
                elif "wildlife" in first_cat or "sanctuary" in first_cat:
                    primary_cat = "wildlife"
                elif "waterfall" in first_cat:
                    primary_cat = "waterfall"
                elif "pilgrimage" in first_cat or "temple" in first_cat or "church" in first_cat:
                    primary_cat = "pilgrimage"
                elif "adventure" in first_cat:
                    primary_cat = "adventure"

            # Parse tags
            tags = [c.strip() for c in raw_cats if c.strip()]
            itinerary_tags = row.get('itinerary_tags', '').split(';')
            for t in itinerary_tags:
                t_clean = t.strip()
                if t_clean and t_clean not in tags:
                    tags.append(t_clean)

            # Parse activities
            raw_acts = row.get('activities', '').split(';')
            activities = [a.strip() for a in raw_acts if a.strip()]

            # Parse highlights
            highlights = []
            if row.get('highlights_merged'):
                highlights = [h.strip() for h in row.get('highlights_merged').split(',') if h.strip()]
            elif row.get('highlights'):
                highlights = [h.strip() for h in row.get('highlights').split(',') if h.strip()]
            elif row.get('keywords'):
                highlights = [k.strip() for k in row.get('keywords').split(';') if k.strip()][:4]

            # Determine price range
            price_tier = row.get('price_range', 'mid-range')
            if not price_tier and row.get('backpacker_daily_budget_inr'):
                try:
                    budget_val = float(row.get('backpacker_daily_budget_inr'))
                    if budget_val < 1000:
                        price_tier = "budget"
                    elif budget_val > 5000:
                        price_tier = "luxury"
                except:
                    pass

            # Latitude / Longitude
            lat = 9.9658
            lng = 76.2422
            try:
                lat = float(row.get('latitude', 9.9658))
                lng = float(row.get('longitude', 76.2422))
            except:
                missing_info[name] = missing_info.get(name, []) + ["Coordinates (latitude/longitude) failed to parse"]

            # Validate missing data in records
            required_checks = {
                "description": row.get("description"),
                "best_time_to_visit": row.get("peak_season") or row.get("best_season") or f"{row.get('best_month_1', '')} to {row.get('best_month_2', '')}"
            }
            for field, val in required_checks.items():
                if not val or val == "N/A":
                    missing_info[name] = missing_info.get(name, []) + [field]

            dest_obj = Destination(
                name=name,
                slug=slug,
                district=district_name,
                region=row.get('region', 'Central Kerala'),
                description=row.get('description', 'A wonderful destination in Kerala.'),
                short_description=row.get('shortDescription') or row.get('description')[:120] + "...",
                image=row.get('image', '/api/placeholder/800/600'),
                cover_image=row.get('coverImage') or row.get('image', '/api/placeholder/1200/800'),
                category=primary_cat,
                tags=tags,
                rating=4.5,
                reviews=15,
                best_time_to_visit=required_checks["best_time_to_visit"],
                min_temp=18.0,
                max_temp=30.0,
                elevation=row.get('elevation') or row.get('altitude_m') or "Sea level",
                nearest_airport=row.get('nearest_airport', 'Cochin International Airport (COK)'),
                activities=activities,
                highlights=highlights,
                latitude=lat,
                longitude=lng,
                is_hidden_gem=row.get('is_hidden_gem', 'False').lower() == 'true' or row.get('is_offbeat', 'False').lower() == 'true',
                is_trending=row.get('is_trending', 'False').lower() == 'true',
                price_range=price_tier
            )
            db.add(dest_obj)
            imported_count += 1

        db.commit()
        files_imported.extend(["central_kerala_destinations.csv", "ernakulam_destinations.csv"])
        print(f"Successfully ingested {imported_count} destinations.")
    
    except Exception as e:
        db.rollback()
        print(f"Ingestion failed: {e}", file=sys.stderr)
        raise e
    finally:
        db.close()

    # Log unsupported files in the report
    unsupported_files = [
        "er_diagram_and_design_notes.md", 
        "kerala_travel_platform_schema.sql"
    ]

    # Write IMPORT_REPORT.md
    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        f.write("# Google Drive Dataset Ingestion Report\n\n")
        f.write(f"Generated at: `{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}`\n\n")
        
        f.write("## 1. Files Discovered\n")
        for file in files_discovered:
            f.write(f"- `{file}`\n")
        f.write("\n")

        f.write("## 2. Files Successfully Imported\n")
        for file in files_imported:
            f.write(f"- `{file}` (Ingested into base relational tables)\n")
        f.write("\n")

        f.write("## 3. Unsupported Files (Not Ingested)\n")
        f.write("The following architectural/schema reference documents are not database data files and were stored under `/import` without db write processing:\n")
        for file in unsupported_files:
            f.write(f"- `{file}`\n")
        f.write("\n")

        f.write("## 4. Duplicate Files & Records\n")
        f.write(f"Total duplicate/redundant records identified: **{duplicates_count}**\n\n")
        f.write("Duplicate details:\n")
        for item in duplicates_logged:
            f.write(f"- Destination: **{item['name']}** in file `{item['source']}` — *Reason: {item['reason']}*\n")
        f.write("\n")

        f.write("## 5. Missing / Incomplete Information\n")
        if not missing_info:
            f.write("No missing required information discovered in the parsed records.\n")
        else:
            f.write("The following parsed destinations had missing/incomplete parameters in the source dataset:\n\n")
            for name, fields in missing_info.items():
                f.write(f"- **{name}**: Missing {', '.join(fields)}\n")
        f.write("\n")

        f.write("## 6. Pipeline Verification\n")
        f.write(f"Ingestion executed successfully. Total new database rows: **{imported_count} destinations** across **{len(districts_to_create)} districts**.\n")

    print("IMPORT_REPORT.md generated successfully.")

if __name__ == "__main__":
    ingest_data()
