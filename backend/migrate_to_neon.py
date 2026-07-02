import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add parent directory to path so we can import app modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.models import Base, User, TripPlan

def migrate():
    # Source SQLite database
    sqlite_url = "sqlite:///travelwithus.db"
    
    # Target Neon PostgreSQL database (loaded from environment)
    postgres_url = os.getenv("DATABASE_URL")
    if not postgres_url:
        print("ERROR: DATABASE_URL environment variable is not set.")
        print("Please set your DATABASE_URL to your Neon connection string prior to running:")
        print("Linux/macOS: export DATABASE_URL='postgresql://...'")
        print("Windows (Powershell): $env:DATABASE_URL='postgresql://...'")
        sys.exit(1)
        
    print(f"Connecting to source SQLite database: {sqlite_url}")
    source_engine = create_engine(sqlite_url)
    SourceSession = sessionmaker(bind=source_engine)
    source_session = SourceSession()
    
    print(f"Connecting to target PostgreSQL database...")
    target_engine = create_engine(postgres_url)
    TargetSession = sessionmaker(bind=target_engine)
    target_session = TargetSession()
    
    # Ensure tables exist in target PostgreSQL database
    print("Creating tables in PostgreSQL target if they do not exist...")
    Base.metadata.create_all(bind=target_engine)
    
    try:
        # 1. Migrate Users
        print("\nMigrating Users...")
        sqlite_users = source_session.query(User).all()
        user_id_map = {}
        for user in sqlite_users:
            # Check if user already exists
            existing = target_session.query(User).filter_by(email=user.email).first()
            if not existing:
                new_user = User(
                    email=user.email,
                    hashed_password=user.hashed_password,
                    full_name=user.full_name,
                    role=user.role,
                    is_active=user.is_active,
                    created_at=user.created_at
                )
                target_session.add(new_user)
                target_session.flush() # Populate user ID
                user_id_map[user.id] = new_user.id
                print(f" -> Migrated user: {user.email}")
            else:
                user_id_map[user.id] = existing.id
                print(f" -> Skipped existing user: {user.email}")
                
        # 2. Migrate Trip Plans
        print("\nMigrating Trip Plans...")
        sqlite_trips = source_session.query(TripPlan).all()
        for trip in sqlite_trips:
            # Map user ID if applicable
            mapped_user_id = user_id_map.get(trip.user_id) if trip.user_id else None
            
            new_trip = TripPlan(
                user_id=mapped_user_id,
                source_city=trip.source_city,
                start_date=trip.start_date,
                duration=trip.duration,
                budget=trip.budget,
                travelers_count=trip.travelers_count,
                interests=trip.interests,
                travel_style=trip.travel_style,
                accommodation_pref=trip.accommodation_pref,
                vehicle_pref=trip.vehicle_pref,
                food_pref=trip.food_pref,
                accessibility_needs=trip.accessibility_needs,
                itinerary=trip.itinerary,
                generated_at=trip.generated_at
            )
            target_session.add(new_trip)
            print(f" -> Migrated trip plan from {trip.source_city} ({trip.duration} days)")
            
        target_session.commit()
        print("\nSUCCESS: All user profiles and trip plans migrated successfully to Neon PostgreSQL!")
        
    except Exception as e:
        target_session.rollback()
        print(f"\nERROR occurred during database migration: {e}")
        sys.exit(1)
    finally:
        source_session.close()
        target_session.close()

if __name__ == "__main__":
    migrate()
