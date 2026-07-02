import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON
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

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
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

class District(Base):
    __tablename__ = "districts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    slug = Column(String, nullable=False, unique=True, index=True)
    description = Column(String, nullable=False)
    image = Column(String, nullable=False)
    destination_count = Column(Integer, default=0)

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
