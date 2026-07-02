import json
from sqlalchemy.orm import Session
from app.models import Destination, District, BlogPost

# 14 Districts of Kerala data
SEED_DISTRICTS = [
    {"name": "Kasaragod", "slug": "kasaragod", "description": "The land of seven languages, famous for Bekal Fort, backwaters, and handloom hills.", "image": "/api/placeholder/400/300", "destination_count": 1},
    {"name": "Kannur", "slug": "kannur", "description": "The crown of Malabar, known for Theyyam performances, pristine beaches, and handloom factories.", "image": "/api/placeholder/400/300", "destination_count": 1},
    {"name": "Wayanad", "slug": "wayanad", "description": "A high-altitude mountain plateau offering waterfalls, spice plantations, caves, and wildlife.", "image": "/api/placeholder/400/300", "destination_count": 3},
    {"name": "Kozhikode", "slug": "kozhikode", "description": "The city of spices and legendary hospitality. Historic trading hub with beautiful beaches.", "image": "/api/placeholder/400/300", "destination_count": 1},
    {"name": "Malappuram", "slug": "malappuram", "description": "Rich cultural heritage, bounded by the Nilgiris and the Arabian Sea.", "image": "/api/placeholder/400/300", "destination_count": 0},
    {"name": "Palakkad", "slug": "palakkad", "description": "The gateway to Kerala, known for paddy fields, fortresses, and Silent Valley.", "image": "/api/placeholder/400/300", "destination_count": 2},
    {"name": "Thrissur", "slug": "thrissur", "description": "The cultural capital of Kerala, home to festivals, sacred sites, and Athirappilly falls.", "image": "/api/placeholder/400/300", "destination_count": 1},
    {"name": "Ernakulam", "slug": "ernakulam", "description": "The commercial hub of Kerala, merging ancient colonial history in Fort Kochi with city life.", "image": "/api/placeholder/400/300", "destination_count": 1},
    {"name": "Idukki", "slug": "idukki", "description": "The spice garden of Kerala, home to high ranges, wild reserves, dams, and tea gardens.", "image": "/api/placeholder/400/300", "destination_count": 4},
    {"name": "Kottayam", "slug": "kottayam", "description": "The land of letters, latex, and lakes, nested alongside Kumarakom backwaters.", "image": "/api/placeholder/400/300", "destination_count": 1},
    {"name": "Alappuzha", "slug": "alappuzha", "description": "The Venice of the East, world-famous for houseboats, snake boat races, and coir.", "image": "/api/placeholder/400/300", "destination_count": 2},
    {"name": "Pathanamthitta", "slug": "pathanamthitta", "description": "The pilgrim capital, known for Sabarimala and vast rubber plantations.", "image": "/api/placeholder/400/300", "destination_count": 0},
    {"name": "Kollam", "slug": "kollam", "description": "Historic trade center famous for cashew processing and Ashtamudi lake cruises.", "image": "/api/placeholder/400/300", "destination_count": 1},
    {"name": "Thiruvananthapuram", "slug": "thiruvananthapuram", "description": "The capital city, characterized by palaces, museums, and golden beaches of Kovalam.", "image": "/api/placeholder/400/300", "destination_count": 3}
]

# 20 Featured Destinations data
SEED_DESTINATIONS = [
    {
        "name": "Munnar", "slug": "munnar", "district": "Idukki", "region": "Central Kerala",
        "description": "Munnar is Kerala's premier hill station, situated at an altitude of 1,600 meters. Sprawling tea estates, mist-clad valleys, and rare flora like the Neelakurinji flower define its beauty.",
        "short_description": "Mist-covered tea gardens and cool mountain breezes.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "hill-station", "tags": ["hills", "tea gardens", "trekking", "nature"],
        "rating": 4.8, "reviews": 1250, "best_time_to_visit": "October to March",
        "min_temp": 12.0, "max_temp": 25.0, "elevation": "1600m", "nearest_airport": "Cochin International Airport (COK)",
        "activities": ["Tea Garden Walk", "Wildlife Safari", "Mountain Trekking", "Boating"],
        "highlights": ["Eravikulam National Park", "Mattupetty Dam", "Anamudi Peak", "Lockhart Gap"],
        "latitude": 10.0889, "longitude": 77.0595, "is_hidden_gem": False, "is_trending": True, "price_range": "mid-range"
    },
    {
        "name": "Alleppey (Alappuzha)", "slug": "alleppey", "district": "Alappuzha", "region": "South Kerala",
        "description": "Famous as the Venice of the East, Alappuzha is renowned for its vast network of tranquil canals, houseboats, and coir industries. Cruising here offers an intimate glimpse into rural Kerala life.",
        "short_description": "World-famous houseboats and serene backwater canals.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "backwaters", "tags": ["backwaters", "houseboats", "lakes", "seafood"],
        "rating": 4.9, "reviews": 1840, "best_time_to_visit": "September to March",
        "min_temp": 22.0, "max_temp": 32.0, "elevation": "Sea level", "nearest_airport": "Cochin International Airport (COK)",
        "activities": ["Houseboat Stay", "Canoeing", "Seafood Dining", "Toddy Shop Visits"],
        "highlights": ["Vembanad Lake", "Kuttanad Paddy Fields", "Alappuzha Beach", "Pathiramanal Island"],
        "latitude": 9.4981, "longitude": 76.3388, "is_hidden_gem": False, "is_trending": True, "price_range": "mid-range"
    },
    {
        "name": "Wayanad", "slug": "wayanad", "district": "Wayanad", "region": "North Kerala",
        "description": "Wayanad is a gorgeous highland district filled with spice plantations, waterfalls, caves, and rich tribal heritage. It is a haven for adventure enthusiasts and nature lovers.",
        "short_description": "Spicy mountain air, waterfalls, and prehistoric caves.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "hill-station", "tags": ["caves", "trekking", "waterfalls", "spices"],
        "rating": 4.7, "reviews": 920, "best_time_to_visit": "October to May",
        "min_temp": 15.0, "max_temp": 28.0, "elevation": "700m-2100m", "nearest_airport": "Calicut International Airport (CCJ)",
        "activities": ["Cave Exploration", "Trekking", "Bamboo Rafting", "Ziplining"],
        "highlights": ["Edakkal Caves", "Banasura Sagar Dam", "Pookode Lake", "Chembra Peak"],
        "latitude": 11.6854, "longitude": 76.1320, "is_hidden_gem": False, "is_trending": True, "price_range": "mid-range"
    },
    {
        "name": "Kovalam", "slug": "kovalam", "district": "Thiruvananthapuram", "region": "South Kerala",
        "description": "Kovalam is an internationally renowned beach town featuring three adjacent crescent beaches. Its shallow waters and low tidal waves make it ideal for swimming and wellness therapies.",
        "short_description": "Three beautiful crescent beaches and luxury wellness resorts.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "beach", "tags": ["beach", "surfing", "ayurveda", "luxury"],
        "rating": 4.6, "reviews": 1100, "best_time_to_visit": "September to March",
        "min_temp": 23.0, "max_temp": 33.0, "elevation": "Sea level", "nearest_airport": "Trivandrum International Airport (TRV)",
        "activities": ["Surfing", "Ayurvedic Massage", "Catamaran Rides", "Sunbathing"],
        "highlights": ["Lighthouse Beach", "Hawah Beach", "Samudra Beach", "Halcyon Castle"],
        "latitude": 8.4004, "longitude": 76.9787, "is_hidden_gem": False, "is_trending": False, "price_range": "luxury"
    },
    {
        "name": "Varkala", "slug": "varkala", "district": "Thiruvananthapuram", "region": "South Kerala",
        "description": "Varkala is famous for its unique geological lateral cliffs overlooking the Arabian Sea, vibrant hippie cafes, paragliding adventure, and the ancient Janardhana Swamy Temple.",
        "short_description": "Stunning seaside cliffs, surf retreats, and bohemian cafes.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "beach", "tags": ["cliffs", "surf", "yoga", "cafes"],
        "rating": 4.8, "reviews": 980, "best_time_to_visit": "October to March",
        "min_temp": 22.0, "max_temp": 32.0, "elevation": "30m", "nearest_airport": "Trivandrum International Airport (TRV)",
        "activities": ["Cliff Walk", "Surfing", "Paragliding", "Yoga Sessions"],
        "highlights": ["Varkala Cliff", "Papanasam Beach", "Kappil Lake", "Janardhana Swamy Temple"],
        "latitude": 8.7338, "longitude": 76.7086, "is_hidden_gem": False, "is_trending": True, "price_range": "budget"
    },
    {
        "name": "Kochi (Fort Kochi)", "slug": "kochi", "district": "Ernakulam", "region": "Central Kerala",
        "description": "Fort Kochi is a historic seaside neighbourhood known for its Chinese fishing nets, colonial Dutch architecture, Portuguese churches, spice markets, and art cafes.",
        "short_description": "Historic seaport with Chinese fishing nets and colonial charm.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "heritage", "tags": ["history", "culture", "art", "shopping"],
        "rating": 4.7, "reviews": 1540, "best_time_to_visit": "October to March",
        "min_temp": 23.0, "max_temp": 32.0, "elevation": "Sea level", "nearest_airport": "Cochin International Airport (COK)",
        "activities": ["History Walk", "Spice Market Tour", "Kathakali Watching", "Art Cafe Hopping"],
        "highlights": ["Chinese Fishing Nets", "Santa Cruz Basilica", "Jewish Synagogue", "Mattancherry Palace"],
        "latitude": 9.9644, "longitude": 76.2428, "is_hidden_gem": False, "is_trending": False, "price_range": "mid-range"
    },
    {
        "name": "Thekkady (Periyar)", "slug": "thekkady", "district": "Idukki", "region": "Central Kerala",
        "description": "Located around the Periyar National Park, Thekkady is a dense evergreen forest sanctuary harboring elephants, tigers, and rare birds, bordered by pepper and cardamom hills.",
        "short_description": "Elephant safaris, boating, and fresh spice plantations.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "wildlife", "tags": ["forest", "elephants", "boating", "spices"],
        "rating": 4.7, "reviews": 1130, "best_time_to_visit": "September to May",
        "min_temp": 15.0, "max_temp": 26.0, "elevation": "900m", "nearest_airport": "Madurai Airport (IXM) or COK",
        "activities": ["Lake Boat Safari", "Jungle Patrol", "Spice Plantation Walk", "Bamboo Rafting"],
        "highlights": ["Periyar Lake", "Periyar Tiger Reserve", "Mangala Devi Temple", "Chellarkovil Viewpoint"],
        "latitude": 9.6015, "longitude": 77.1611, "is_hidden_gem": False, "is_trending": False, "price_range": "mid-range"
    },
    {
        "name": "Athirappilly Waterfalls", "slug": "athirappilly", "district": "Thrissur", "region": "Central Kerala",
        "description": "Often called the Niagra of India, Athirappilly is Kerala's largest waterfall, cascading down 80 feet through lush green Sholayar forest ranges.",
        "short_description": "Kerala's largest, most dramatic waterfall cascades.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "waterfall", "tags": ["waterfall", "forest", "photography", "nature"],
        "rating": 4.8, "reviews": 1420, "best_time_to_visit": "June to November",
        "min_temp": 20.0, "max_temp": 30.0, "elevation": "120m", "nearest_airport": "Cochin International Airport (COK)",
        "activities": ["Waterfall Trekking", "Nature Walks", "Bird Watching", "Forest Safaris"],
        "highlights": ["Athirappilly Falls", "Vazhachal Falls", "Sholayar Dam", "Charpa Falls"],
        "latitude": 10.2851, "longitude": 76.5698, "is_hidden_gem": False, "is_trending": True, "price_range": "budget"
    },
    {
        "name": "Gavi", "slug": "gavi", "district": "Pathanamthitta", "region": "South Kerala",
        "description": "An eco-tourism gem hidden inside Ranni reserve forest. Gavi is known for its untouched wildlife, mist-filled valleys, cardamom forests, and clean lake waters.",
        "short_description": "An pristine forest haven for eco-tourism and wilderness.",
        "image": "/api/placeholder/800/600", "cover_image": "/api/placeholder/1200/800",
        "category": "wildlife", "tags": ["eco-tourism", "offbeat", "camping", "elephants"],
        "rating": 4.6, "reviews": 230, "best_time_to_visit": "September to February",
        "min_temp": 10.0, "max_temp": 22.0, "elevation": "1000m", "nearest_airport": "Cochin International Airport (COK)",
        "activities": ["Forest Trekking", "Canoeing", "Wildlife Spotting", "Camping"],
        "highlights": ["Gavi Lake", "Cardamom Processing Factory", "Sabarmala Viewpoint"],
        "latitude": 9.4388, "longitude": 77.1643, "is_hidden_gem": True, "is_trending": False, "price_range": "budget"
    }
]

# 4 Seed Blog Posts
SEED_BLOG_POSTS = [
    {
        "title": "A Local's Guide to Exploring Fort Kochi",
        "slug": "local-guide-fort-kochi",
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
    import re
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug)
    return slug

def load_destinations_from_csv(csv_path):
    import csv
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
    import os
    
    # Resolve CSV path dynamically
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    import_dir = os.path.join(base_dir, "import")
    csv_path = os.path.join(import_dir, "central_kerala_destinations.csv")
    
    csv_exists = os.path.exists(csv_path)
    
    # 1. Seed Districts
    if db.query(District).count() == 0:
        if csv_exists:
            print("Importing districts from CSV dataset...")
            records = load_destinations_from_csv(csv_path)
            dist_names = set(r.get('district', 'Ernakulam') for r in records)
            for d_name in dist_names:
                db_dist = District(
                    name=d_name,
                    slug=clean_slug(d_name),
                    description=f"The beautiful district of {d_name} in Kerala.",
                    image="/api/placeholder/400/300",
                    destination_count=sum(1 for r in records if r.get('district') == d_name)
                )
                db.add(db_dist)
            db.commit()
            print("Districts seeded from CSV successfully.")
        else:
            for dist_data in SEED_DISTRICTS:
                db_dist = District(**dist_data)
                db.add(db_dist)
            db.commit()
            print("Districts seeded from fallback successfully.")

    # 2. Seed Destinations
    if db.query(Destination).count() == 0:
        if csv_exists:
            print("Importing destinations from CSV dataset...")
            records = load_destinations_from_csv(csv_path)
            
            # Map categories to standard slugs
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

                db_dest = Destination(
                    name=name,
                    slug=clean_slug(name),
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
                db.add(db_dest)
            db.commit()
            print(f"Destinations seeded from CSV successfully ({len(records)} records).")
        else:
            for dest_data in SEED_DESTINATIONS:
                db_dest = Destination(**dest_data)
                db.add(db_dest)
            db.commit()
            print("Destinations seeded from fallback successfully.")

    # 3. Seed Blog Posts
    if db.query(BlogPost).count() == 0:
        for blog_data in SEED_BLOG_POSTS:
            db_blog = BlogPost(**blog_data)
            db.add(db_blog)
        db.commit()
        print("Blog posts seeded successfully.")
