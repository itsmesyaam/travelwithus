import json
import os
import csv
import re
from sqlalchemy.orm import Session
from app.models import (
    Base, User, Region, District, DestinationCategory, Destination, 
    DestinationImage, ActivityCategory, Activity, Hotel, RoomType, 
    Restaurant, BlogPost
)

# 14 Districts of Kerala data
SEED_DISTRICTS = [
    {"name": "Kasaragod", "slug": "kasaragod", "region": "North Kerala", "description": "The land of seven languages, famous for Bekal Fort, backwaters, and handloom hills.", "image": "/api/placeholder/400/300"},
    {"name": "Kannur", "slug": "kennur", "region": "North Kerala", "description": "The crown of Malabar, known for Theyyam performances, pristine beaches, and handloom factories.", "image": "/api/placeholder/400/300"},
    {"name": "Wayanad", "slug": "wayanad", "region": "North Kerala", "description": "A high-altitude mountain plateau offering waterfalls, spice plantations, caves, and wildlife.", "image": "/api/placeholder/400/300"},
    {"name": "Kozhikode", "slug": "kozhikode", "region": "North Kerala", "description": "The city of spices and legendary hospitality. Historic trading hub with beautiful beaches.", "image": "/api/placeholder/400/300"},
    {"name": "Malappuram", "slug": "malappuram", "region": "North Kerala", "description": "Rich cultural heritage, bounded by the Nilgiris and the Arabian Sea.", "image": "/api/placeholder/400/300"},
    {"name": "Palakkad", "slug": "palakkad", "region": "Central Kerala", "description": "The gateway to Kerala, known for paddy fields, fortresses, and Silent Valley.", "image": "/api/placeholder/400/300"},
    {"name": "Thrissur", "slug": "thrissur", "region": "Central Kerala", "description": "The cultural capital of Kerala, home to festivals, sacred sites, and Athirappilly falls.", "image": "/api/placeholder/400/300"},
    {"name": "Ernakulam", "slug": "ernakulam", "region": "Central Kerala", "description": "The commercial hub of Kerala, merging ancient colonial history in Fort Kochi with city life.", "image": "/api/placeholder/400/300"},
    {"name": "Idukki", "slug": "idukki", "region": "Central Kerala", "description": "The spice garden of Kerala, home to high ranges, wild reserves, dams, and tea gardens.", "image": "/api/placeholder/400/300"},
    {"name": "Kottayam", "slug": "kottayam", "region": "South Kerala", "description": "The land of letters, latex, and lakes, nested alongside Kumarakom backwaters.", "image": "/api/placeholder/400/300"},
    {"name": "Alappuzha", "slug": "alappuzha", "region": "South Kerala", "description": "The Venice of the East, world-famous for houseboats, snake boat races, and coir.", "image": "/api/placeholder/400/300"},
    {"name": "Pathanamthitta", "slug": "pathanamthitta", "region": "South Kerala", "description": "The pilgrim capital, known for Sabarimala and vast rubber plantations.", "image": "/api/placeholder/400/300"},
    {"name": "Kollam", "slug": "kollam", "region": "South Kerala", "description": "Historic trade center famous for cashew processing and Ashtamudi lake cruises.", "image": "/api/placeholder/400/300"},
    {"name": "Thiruvananthapuram", "slug": "thiruvananthapuram", "region": "South Kerala", "description": "The capital city, characterized by palaces, museums, and golden beaches of Kovalam.", "image": "/api/placeholder/400/300"}
]

SEED_CATEGORIES = [
    {"name": "backwaters", "icon": "Ship"},
    {"name": "hill-station", "icon": "Mountain"},
    {"name": "beach", "icon": "Umbrella"},
    {"name": "wildlife", "icon": "Trees"},
    {"name": "heritage", "icon": "Building"},
    {"name": "pilgrimage", "icon": "Activity"},
    {"name": "adventure", "icon": "Compass"},
    {"name": "waterfall", "icon": "Droplet"}
]

SEED_BLOG_POSTS = [
    {
        "title": "Munnar Travel Guide: Tea Gardens & Mist",
        "slug": "munnar-travel-guide",
        "excerpt": "A comprehensive native travel guide to exploring the mist-clad hills, tea estates, and viewpoints of Munnar.",
        "content": "Full article guide on Munnar...",
        "image": "/api/placeholder/800/600",
        "author": "Hari Prasad",
        "category": "Guide",
        "read_time": "6 mins",
        "date": "2026-06-30"
    },
    {
        "title": "Kettuvallam: Houseboats of Alleppey",
        "slug": "alleppey-houseboats",
        "excerpt": "Everything you need to know about booking, staying, and cruising in a traditional Kerala houseboat in Alappuzha.",
        "content": "Full article guide on Alleppey...",
        "image": "/api/placeholder/800/600",
        "author": "Anila Joseph",
        "category": "Guide",
        "read_time": "4 mins",
        "date": "2026-06-28"
    },
    {
        "title": "Fort Kochi Art & Heritage Walking Tour",
        "slug": "fort-kochi-walking-tour",
        "excerpt": "Discover the historic seaports, ancient churches, and hipster art cafes of Fort Kochi with our ultimate native guide.",
        "content": "Full article guide on Fort Kochi...",
        "image": "/api/placeholder/800/600",
        "author": "Rahul Nair",
        "category": "Culture",
        "read_time": "5 mins",
        "date": "2026-06-25"
    },
    {
        "title": "7 Hidden Gems in Kerala You've Never Heard Of",
        "slug": "kerala-hidden-gems",
        "excerpt": "Escape the crowds and discover misty meadows, secret waterfalls, and quiet lagoons hidden away from mainstream tourism.",
        "content": "Full article on hidden gems...",
        "image": "/api/placeholder/800/600",
        "author": "Anjali Menon",
        "category": "Offbeat",
        "read_time": "8 mins",
        "date": "2026-06-18"
    }
]

def clean_slug(name):
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug)
    return slug

def load_destinations_from_csv(csv_path):
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

def seed_database(db: Session):
    """Seed the database with initial districts, destinations, and blog posts if empty."""
    # Resolve CSV path dynamically
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    import_dir = os.path.join(base_dir, "import")
    csv_path = os.path.join(import_dir, "central_kerala_destinations.csv")
    csv_exists = os.path.exists(csv_path)

    # 1. Seed Regions
    if db.query(Region).count() == 0:
        print("Seeding Regions...")
        for r_name in ["North Kerala", "Central Kerala", "South Kerala"]:
            db.add(Region(name=r_name, description=f"The scenic region of {r_name} in Kerala."))
        db.commit()

    # Create mapping helper for regions
    region_map = {r.name: r.id for r in db.query(Region).all()}

    # 2. Seed Districts
    if db.query(District).count() == 0:
        print("Seeding Districts...")
        if csv_exists:
            print("Importing districts from CSV dataset...")
            records = load_destinations_from_csv(csv_path)
            dist_names = set(r.get('district', 'Ernakulam') for r in records)
            for d_name in dist_names:
                # Find matching region
                matching_row = next((r for r in records if r.get('district') == d_name), None)
                region_name = matching_row.get('region', 'Central Kerala') if matching_row else 'Central Kerala'
                region_id = region_map.get(region_name, region_map.get("Central Kerala"))
                
                db_dist = District(
                    name=d_name,
                    slug=clean_slug(d_name),
                    region_id=region_id,
                    description=f"The beautiful district of {d_name} in Kerala.",
                    image="/api/placeholder/400/300",
                    destination_count=sum(1 for r in records if r.get('district') == d_name)
                )
                db.add(db_dist)
            db.commit()
            print("Districts seeded from CSV successfully.")
        else:
            for dist_data in SEED_DISTRICTS:
                reg_id = region_map.get(dist_data["region"], region_map.get("Central Kerala"))
                db_dist = District(
                    name=dist_data["name"],
                    slug=dist_data["slug"],
                    region_id=reg_id,
                    description=dist_data["description"],
                    image=dist_data["image"]
                )
                db.add(db_dist)
            db.commit()
            print("Districts seeded from fallback successfully.")

    # Create mapping helper for districts
    district_map = {d.name.lower(): d.id for d in db.query(District).all()}

    # 3. Seed Destination Categories
    if db.query(DestinationCategory).count() == 0:
        print("Seeding Categories...")
        for cat in SEED_CATEGORIES:
            db_cat = DestinationCategory(name=cat["name"], icon=cat["icon"])
            db.add(db_cat)
        db.commit()

    # Create mapping helper for categories
    cat_map = {c.name.lower(): c.id for c in db.query(DestinationCategory).all()}

    # 4. Seed Activity Categories
    if db.query(ActivityCategory).count() == 0:
        print("Seeding Activity Categories...")
        for act_cat in ["sightseeing", "adventure", "dining", "wellness"]:
            db_act_cat = ActivityCategory(name=act_cat)
            db.add(db_act_cat)
        db.commit()
    
    act_cat_map = {ac.name.lower(): ac.id for ac in db.query(ActivityCategory).all()}

    # 5. Seed Destinations
    if db.query(Destination).count() == 0:
        print("Seeding Destinations...")
        if csv_exists:
            print("Importing destinations from CSV dataset...")
            records = load_destinations_from_csv(csv_path)
            
            for row in records:
                name = row.get('name')
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

                tags = [c.strip() for c in raw_cats if c.strip()]
                itinerary_tags = row.get('itinerary_tags', '').split(';')
                for t in itinerary_tags:
                    t_clean = t.strip()
                    if t_clean and t_clean not in tags:
                        tags.append(t_clean)

                activities = [a.strip() for a in row.get('activities', '').split(';') if a.strip()]
                
                highlights = []
                if row.get('highlights'):
                    highlights = [h.strip() for h in row.get('highlights').split(',') if h.strip()]
                elif row.get('keywords'):
                    highlights = [k.strip() for k in row.get('keywords').split(';') if k.strip()][:4]

                lat = float(row.get('latitude', 9.9658))
                lng = float(row.get('longitude', 76.2422))
                dist_name = row.get('district', 'Ernakulam').lower().strip()
                dist_id = district_map.get(dist_name, district_map.get("ernakulam"))

                db_dest = Destination(
                    name=name,
                    slug=clean_slug(name),
                    district_id=dist_id,
                    district=row.get('district', 'Ernakulam'),
                    region=row.get('region', 'Central Kerala'),
                    description=row.get('description', 'A wonderful destination in Kerala.'),
                    short_description=row.get('shortDescription') or row.get('description')[:120] + "...",
                    image=row.get('image', '/api/placeholder/800/600'),
                    cover_image=row.get('coverImage') or row.get('image', '/api/placeholder/1200/800'),
                    category=primary_cat,
                    tags=tags,
                    rating=4.5,
                    reviews=15,
                    best_time_to_visit=row.get('peak_season') or f"{row.get('best_month_1', '')} to {row.get('best_month_2', '')}",
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
                    price_range=row.get('price_range', 'mid-range')
                )
                
                # Associate standard category lookups
                matching_cat_id = cat_map.get(primary_cat)
                if matching_cat_id:
                    db_dest.categories.append(db.query(DestinationCategory).filter_by(id=matching_cat_id).first())
                
                db.add(db_dest)
                db.flush() # Populate destination.id for child creations
                
                # Seed secondary activities
                for act_idx, act_name in enumerate(activities):
                    act_cat_id = act_cat_map.get("adventure") if "trek" in act_name.lower() or "surf" in act_name.lower() else act_cat_map.get("sightseeing")
                    db_activity = Activity(
                        destination_id=db_dest.id,
                        category_id=act_cat_id,
                        name=act_name,
                        description=f"Experience {act_name} at {name}.",
                        base_price_inr=150.0 + (act_idx * 100)
                    )
                    db.add(db_activity)
                
                # Seed secondary hotels
                db_hotel = Hotel(
                    destination_id=db_dest.id,
                    name=f"{name} Garden Resort",
                    latitude=lat + 0.01,
                    longitude=lng + 0.01,
                    star_rating=4,
                    address=f"Green Hills Road, {name}, Kerala",
                    amenities={"wifi": True, "pool": True}
                )
                db.add(db_hotel)
                db.flush()
                
                db_room = RoomType(
                    hotel_id=db_hotel.id,
                    name="Deluxe Garden View",
                    capacity=2,
                    base_price_inr=3500.00
                )
                db.add(db_room)

            db.commit()
            print(f"Destinations seeded from CSV successfully ({len(records)} records).")
        else:
            print("CSV dataset not found. Seeding from offline fallback...")
            # Handled through seed script parameters if fallback triggers.
            db.commit()

    # 6. Seed Blog Posts
    if db.query(BlogPost).count() == 0:
        print("Seeding Blog Posts...")
        for blog_data in SEED_BLOG_POSTS:
            db_blog = BlogPost(**blog_data)
            db.add(db_blog)
        db.commit()
        print("Blog posts seeded successfully.")
