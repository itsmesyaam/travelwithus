from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Any
from datetime import datetime

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Login Schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Destination Schemas
class DestinationBase(BaseModel):
    name: str
    slug: str
    district: str
    region: str
    description: str
    short_description: str
    image: str
    cover_image: str
    category: str
    tags: Optional[List[str]] = []
    rating: Optional[float] = 4.5
    reviews: Optional[int] = 0
    best_time_to_visit: str
    min_temp: Optional[float] = None
    max_temp: Optional[float] = None
    elevation: Optional[str] = None
    nearest_airport: str
    activities: Optional[List[str]] = []
    highlights: Optional[List[str]] = []
    latitude: float
    longitude: float
    is_hidden_gem: Optional[bool] = False
    is_trending: Optional[bool] = False
    price_range: Optional[str] = "mid-range"

class DestinationCreate(DestinationBase):
    pass

class DestinationOut(DestinationBase):
    id: int

    class Config:
        from_attributes = True

# District Schemas
class DistrictBase(BaseModel):
    name: str
    slug: str
    description: str
    image: str
    destination_count: Optional[int] = 0

class DistrictCreate(DistrictBase):
    pass

class DistrictOut(DistrictBase):
    id: int

    class Config:
        from_attributes = True

# Trip Plan Schemas
class TripPlanCreate(BaseModel):
    source_city: str
    start_date: Optional[str] = None
    duration: int = Field(..., ge=1, le=14)
    budget: str
    travelers_count: int = Field(1, ge=1)
    interests: List[str]
    travel_style: str
    accommodation_pref: Optional[str] = None
    vehicle_pref: Optional[str] = None
    food_pref: Optional[str] = None
    accessibility_needs: Optional[str] = None

class TripPlanOut(BaseModel):
    id: int
    user_id: Optional[int] = None
    source_city: str
    start_date: Optional[str] = None
    duration: int
    budget: str
    travelers_count: int
    interests: Optional[List[str]] = []
    travel_style: str
    accommodation_pref: Optional[str] = None
    vehicle_pref: Optional[str] = None
    food_pref: Optional[str] = None
    accessibility_needs: Optional[str] = None
    itinerary: Any
    generated_at: datetime

    class Config:
        from_attributes = True

# Blog Post Schemas
class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: Optional[str] = None
    image: str
    author: str
    category: str
    read_time: str
    date: str

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostOut(BlogPostBase):
    id: int

    class Config:
        from_attributes = True
