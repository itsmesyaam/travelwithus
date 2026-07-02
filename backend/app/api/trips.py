from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import TripPlan, User
from app.schemas import TripPlanCreate, TripPlanOut
from app.services.ai_planner import get_fallback_itinerary
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/trips", tags=["AI Trip Planner"])

@router.post("/generate")
def generate_trip_plan(plan_in: TripPlanCreate):
    """
    Generate an AI-powered travel plan and itinerary for Kerala.
    Does not require authentication to allow guests to try out the planner.
    """
    try:
        itinerary = get_fallback_itinerary(
            source_city=plan_in.source_city,
            duration=plan_in.duration,
            budget=plan_in.budget,
            travelers_count=plan_in.travelers_count,
            interests=plan_in.interests,
            travel_style=plan_in.travel_style,
            accommodation_pref=plan_in.accommodation_pref,
            vehicle_pref=plan_in.vehicle_pref,
            food_pref=plan_in.food_pref
        )
        return itinerary
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate trip plan: {str(e)}"
        )

@router.post("/save", response_model=TripPlanOut)
def save_trip_plan(
    plan_data: dict,  # Receives full generated itinerary dict along with params
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Save a generated trip plan to the user's dashboard.
    Requires user authentication.
    """
    # Extract metadata fields
    source_city = plan_data.get("source_city", "Unknown")
    duration = plan_data.get("duration", 3)
    budget = plan_data.get("budget", "mid-range")
    travelers_count = plan_data.get("travelers_count", 1)
    travel_style = plan_data.get("travel_style", "Solo")
    interests = plan_data.get("interests", [])
    
    # Save to db
    db_plan = TripPlan(
        user_id=current_user.id,
        source_city=source_city,
        duration=duration,
        budget=budget,
        travelers_count=travelers_count,
        travel_style=travel_style,
        interests=interests,
        accommodation_pref=plan_data.get("accommodation_pref"),
        vehicle_pref=plan_data.get("vehicle_pref"),
        food_pref=plan_data.get("food_pref"),
        itinerary=plan_data.get("itinerary", plan_data) # Use full plan dict
    )
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan

@router.get("", response_model=List[TripPlanOut])
def get_user_trips(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve all saved trip plans for the current authenticated user.
    """
    return db.query(TripPlan).filter(TripPlan.user_id == current_user.id).all()
