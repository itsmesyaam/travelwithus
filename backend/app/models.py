import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON, Numeric, Table
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    role = Column(String, default="user") # user, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    trips = relationship("TripPlan", back_populates="user", cascade="all, delete-orphan")

class Region(Base):
    __tablename__ = "regions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    
    districts = relationship("District", back_populates="region")

class District(Base):
    __tablename__ = "districts"

    id = Column(Integer, primary_key=True, index=True)
    region_id = Column(Integer, ForeignKey("regions.id"), nullable=True) # ForeignKey linked to Region
    name = Column(String, nullable=False, unique=True)
    slug = Column(String, nullable=False, unique=True, index=True)
    description = Column(String, nullable=False)
    image = Column(String, nullable=False)
    destination_count = Column(Integer, default=0)
    headquarters = Column(String, nullable=True)

    # Relationships
    region = relationship("Region", back_populates="districts")
    destinations = relationship("Destination", back_populates="district_rel")

# Association Table for M:N mapping of Destinations and Categories
destination_category_association = Table(
    "destination_category_map",
    Base.metadata,
    Column("destination_id", Integer, ForeignKey("destinations.id", ondelete="CASCADE"), primary_key=True),
    Column("category_id", Integer, ForeignKey("destination_categories.id", ondelete="CASCADE"), primary_key=True)
)

class DestinationCategory(Base):
    __tablename__ = "destination_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    icon = Column(String, nullable=True)

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=True) # Normalized reference

    # Existing columns (to preserve API/Query compatibility)
    name = Column(String, nullable=False, unique=True)
    slug = Column(String, nullable=False, unique=True, index=True)
    district = Column(String, nullable=False)
    region = Column(String, nullable=False) # North Kerala, Central Kerala, South Kerala
    description = Column(String, nullable=False)
    short_description = Column(String, nullable=False)
    image = Column(String, nullable=False)
    cover_image = Column(String, nullable=False)
    category = Column(String, nullable=False) # backwaters, hill-station, beach, etc.
    tags = Column(JSON, nullable=True) # List of tags
    rating = Column(Float, default=4.5)
    reviews = Column(Integer, default=0)
    best_time_to_visit = Column(String, nullable=False)
    min_temp = Column(Float, nullable=True)
    max_temp = Column(Float, nullable=True)
    elevation = Column(String, nullable=True)
    nearest_airport = Column(String, nullable=False)
    activities = Column(JSON, nullable=True) # List of activities
    highlights = Column(JSON, nullable=True) # List of highlights
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    is_hidden_gem = Column(Boolean, default=False)
    is_trending = Column(Boolean, default=False)
    price_range = Column(String, default="mid-range") # budget, mid-range, luxury

    # Relationships
    district_rel = relationship("District", back_populates="destinations")
    categories = relationship("DestinationCategory", secondary=destination_category_association)
    images = relationship("DestinationImage", back_populates="destination", cascade="all, delete-orphan")
    activities_rel = relationship("Activity", back_populates="destination", cascade="all, delete-orphan")
    hotels = relationship("Hotel", back_populates="destination", cascade="all, delete-orphan")
    restaurants = relationship("Restaurant", back_populates="destination", cascade="all, delete-orphan")

class DestinationImage(Base):
    __tablename__ = "destination_images"
    
    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id", ondelete="CASCADE"), nullable=False)
    url = Column(String, nullable=False)
    is_primary = Column(Boolean, default=False)
    alt_text = Column(String, nullable=True)
    
    destination = relationship("Destination", back_populates="images")

class ActivityCategory(Base):
    __tablename__ = "activity_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("activity_categories.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    difficulty = Column(String, default="easy") # easy, moderate, difficult, extreme
    duration_minutes = Column(Integer, default=60)
    base_price_inr = Column(Numeric(10, 2), default=0.0)
    min_age = Column(Integer, default=0)
    max_group_size = Column(Integer, nullable=True)
    is_active = Column(Boolean, default=True)
    
    destination = relationship("Destination", back_populates="activities_rel")

class AdventureActivity(Base):
    __tablename__ = "adventure_activities"
    
    id = Column(Integer, ForeignKey("activities.id", ondelete="CASCADE"), primary_key=True)
    risk_level = Column(String, default="moderate")
    equipment_required = Column(JSON, nullable=True)
    certified_operator_required = Column(Boolean, default=False)
    min_fitness_level = Column(Integer, default=1)
    insurance_required = Column(Boolean, default=False)

class Hotel(Base):
    __tablename__ = "hotels"
    
    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    star_rating = Column(Integer, nullable=True)
    address = Column(String, nullable=True)
    amenities = Column(JSON, default=dict)
    contact_phone = Column(String, nullable=True)
    contact_email = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    
    destination = relationship("Destination", back_populates="hotels")
    room_types = relationship("RoomType", back_populates="hotel", cascade="all, delete-orphan")

class RoomType(Base):
    __tablename__ = "room_types"
    
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False) # Deluxe, Suite, Cottage
    capacity = Column(Integer, default=2)
    base_price_inr = Column(Numeric(10, 2), nullable=False)
    
    hotel = relationship("Hotel", back_populates="room_types")

class Restaurant(Base):
    __tablename__ = "restaurants"
    
    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    cuisine_types = Column(JSON, default=list)
    price_range = Column(String, default="mid_range") # budget, mid_range, luxury
    avg_rating = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)
    
    destination = relationship("Destination", back_populates="restaurants")

class TripPlan(Base):
    __tablename__ = "trip_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    source_city = Column(String, nullable=False)
    start_date = Column(String, nullable=True)
    duration = Column(Integer, nullable=False)
    budget = Column(String, nullable=False) # budget, mid-range, luxury
    travelers_count = Column(Integer, default=1)
    interests = Column(JSON, nullable=True) # List of interests
    travel_style = Column(String, nullable=False) # Solo, Couple, Family, Friends
    accommodation_pref = Column(String, nullable=True) # Hotel, Resort, Homestay, Houseboat
    vehicle_pref = Column(String, nullable=True) # Public Transport, Car Rental, Private Cab
    food_pref = Column(String, nullable=True) # Vegetarian, Non-Vegetarian, Local Seafood
    accessibility_needs = Column(String, nullable=True)
    itinerary = Column(JSON, nullable=False) # Day by Day breakdown, packing tips, budget estimation
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="trips")

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True, index=True)
    excerpt = Column(String, nullable=False)
    content = Column(String, nullable=True)
    image = Column(String, nullable=False)
    author = Column(String, nullable=False)
    category = Column(String, nullable=False)
    read_time = Column(String, nullable=False)
    date = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
