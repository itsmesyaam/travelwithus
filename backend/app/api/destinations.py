from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Destination, District
from app.schemas import DestinationOut, DistrictOut

router = APIRouter(tags=["Destinations & Districts"])

@router.get("/destinations", response_model=List[DestinationOut])
def get_destinations(
    category: Optional[str] = None,
    region: Optional[str] = None,
    district: Optional[str] = None,
    is_trending: Optional[bool] = None,
    is_hidden_gem: Optional[bool] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieve all destinations, with optional filtering."""
    query = db.query(Destination)
    
    if category:
        query = query.filter(Destination.category == category)
    if region:
        query = query.filter(Destination.region == region)
    if district:
        query = query.filter(Destination.district == district)
    if is_trending is not None:
        query = query.filter(Destination.is_trending == is_trending)
    if is_hidden_gem is not None:
        query = query.filter(Destination.is_hidden_gem == is_hidden_gem)
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (Destination.name.ilike(search_filter)) | 
            (Destination.description.ilike(search_filter)) |
            (Destination.district.ilike(search_filter))
        )
        
    return query.all()

@router.get("/destinations/{slug}", response_model=DestinationOut)
def get_destination_by_slug(slug: str, db: Session = Depends(get_db)):
    """Retrieve a single destination by its unique slug."""
    dest = db.query(Destination).filter(Destination.slug == slug).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dest

@router.get("/districts", response_model=List[DistrictOut])
def get_districts(db: Session = Depends(get_db)):
    """Retrieve all districts of Kerala."""
    return db.query(District).all()

@router.get("/districts/{slug}", response_model=DistrictOut)
def get_district_by_slug(slug: str, db: Session = Depends(get_db)):
    """Retrieve a single district by its unique slug."""
    dist = db.query(District).filter(District.slug == slug).first()
    if not dist:
        raise HTTPException(status_code=404, detail="District not found")
    return dist
