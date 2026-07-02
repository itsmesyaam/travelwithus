from typing import List, Dict, Any, Optional
import random

# Core destination metadata matching seed data for lookups
DESTINATION_DETAILS = {
    "munnar": {
        "name": "Munnar",
        "district": "Idukki",
        "hotels": {
            "budget": "Green Valley Vista (INR 2,500/night)",
            "mid-range": "Blanket Hotel & Spa (INR 7,000/night)",
            "luxury": "Windermere Estate (INR 15,000/night)"
        },
        "restaurants": ["Rapsy Restaurant (Kerala Meals, Biryani)", "Saravana Bhavan (South Indian Veg)", "The Tea Room (High Tea, Continental)"],
        "activities": [
            {"time": "09:00 AM", "title": "Eravikulam National Park Safari", "description": "Spot the endangered Nilgiri Tahr and take in the panoramic mountain views.", "cost": 200, "duration": "3 hours"},
            {"time": "02:00 PM", "title": "Tata Tea Museum Tour", "description": "Learn about the history of tea processing in Munnar and enjoy tea tasting.", "cost": 150, "duration": "2 hours"},
            {"time": "05:00 PM", "title": "Sunset at Lockhart Gap", "description": "Witness the beautiful sunset over the valley surrounded by tea gardens.", "cost": 0, "duration": "1.5 hours"},
            {"time": "10:00 AM", "title": "Mattupetty Dam & Lake Boating", "description": "Enjoy speed boating in the serene reservoir waters surrounded by hills.", "cost": 300, "duration": "2 hours"},
            {"time": "02:30 PM", "title": "Kundala Lake Pedal Boating", "description": "Boating under the shade of pine trees; look out for cherry blossoms.", "cost": 150, "duration": "1.5 hours"}
        ]
    },
    "alleppey": {
        "name": "Alleppey (Alappuzha)",
        "district": "Alappuzha",
        "hotels": {
            "budget": "Zostel Alleppey (INR 1,200/night)",
            "mid-range": "Lake Palace Resort (INR 8,000/night)",
            "luxury": "Oberoi Vrinda Houseboat (INR 45,000/night)"
        },
        "restaurants": ["Cassia Restaurant (Seafood)", "Thaff Restaurant (Traditional Kerala Biryani)", "Halais Restaurant (Malabar Specialities)"],
        "activities": [
            {"time": "11:30 AM", "title": "Houseboat Embarkation & Cruise", "description": "Board a luxury houseboat from Punnamada Jetty for a cruise through Vembanad Lake.", "cost": 8000, "duration": "Full Day"},
            {"time": "04:30 PM", "title": "Kanoe Cruise in Narrow Canals", "description": "Explore the peaceful village life and narrow canals on a small open country boat.", "cost": 500, "duration": "2 hours"},
            {"time": "05:30 PM", "title": "Alappuzha Beach Sunset walk", "description": "Walk along the historic pier and enjoy local street snacks like spicy mango.", "cost": 0, "duration": "1.5 hours"}
        ]
    },
    "wayanad": {
        "name": "Wayanad",
        "district": "Wayanad",
        "hotels": {
            "budget": "Wayanad Gate (INR 2,200/night)",
            "mid-range": "Vythiri Resort (INR 9,500/night)",
            "luxury": "The Windflower Resorts & Spa (INR 16,000/night)"
        },
        "restaurants": ["1980's A Nostalgic Restaurant (Kerala Feast)", "ClayHut A Family Restaurant", "Wilton Hotel & Restaurant"],
        "activities": [
            {"time": "09:00 AM", "title": "Trek to Edakkal Caves", "description": "Hike up the Ambukuthi Hill to see the ancient Neolithic stone carvings.", "cost": 100, "duration": "3 hours"},
            {"time": "01:30 PM", "title": "Banasura Sagar Dam Visit", "description": "Visit India's largest earthen dam and go speed-boating in the blue waters.", "cost": 250, "duration": "2 hours"},
            {"time": "04:00 PM", "title": "Pookode Lake Boating & Walk", "description": "A natural freshwater lake nestled among mountains, ideal for pedal boating.", "cost": 100, "duration": "1.5 hours"}
        ]
    },
    "kochi": {
        "name": "Kochi",
        "district": "Ernakulam",
        "hotels": {
            "budget": "Hostel 18 Fort Kochi (INR 900/night)",
            "mid-range": "Forte Kochi (INR 8,500/night)",
            "luxury": "Brunton Boatyard (INR 20,000/night)"
        },
        "restaurants": ["Kashi Art Cafe (European, Breakfast)", "Fort House Restaurant (Seafood)", "Oceanos Restaurant (Traditional Seafood)"],
        "activities": [
            {"time": "09:30 AM", "title": "Fort Kochi Walking Tour", "description": "Explore the Chinese Fishing Nets, St. Francis Church, and Dutch Cemetery.", "cost": 0, "duration": "3 hours"},
            {"time": "02:00 PM", "title": "Mattancherry Palace & Jew Town", "description": "Visit the Dutch Palace, Jewish Synagogue, and shop for spices and antiques.", "cost": 50, "duration": "2.5 hours"},
            {"time": "06:00 PM", "title": "Kathakali Dance Performance", "description": "Watch a classical dance-drama performance at the Kathakali Center.", "cost": 400, "duration": "2 hours"}
        ]
    },
    "kovalam": {
        "name": "Kovalam",
        "district": "Thiruvananthapuram",
        "hotels": {
            "budget": "Hotel Sea View (INR 1,800/night)",
            "mid-range": "The Travancore Heritage (INR 7,000/night)",
            "luxury": "The Leela Kovalam (INR 22,000/night)"
        },
        "restaurants": ["Curry Leaf Restaurant", "Bait - The Leela (Upscale Seafood)", "Sanasa Restaurant"],
        "activities": [
            {"time": "08:00 AM", "title": "Lighthouse Beach Water Sports", "description": "Enjoy parasailing, jet skiing, and swimming in the calm bay waters.", "cost": 1200, "duration": "3 hours"},
            {"time": "04:00 PM", "title": "Vizhinjam Lighthouse Climb", "description": "Climb up for spectacular panoramic views of the coast and Arabian Sea.", "cost": 50, "duration": "1 hour"},
            {"time": "06:00 PM", "title": "Ayurvedic Massage Session", "description": "Indulge in a relaxing Abhyanga full-body oil massage by certified experts.", "cost": 1500, "duration": "1.5 hours"}
        ]
    },
    "varkala": {
        "name": "Varkala",
        "district": "Thiruvananthapuram",
        "hotels": {
            "budget": "Satta Beach Residence (INR 1,500/night)",
            "mid-range": "Elixir Cliff Beach Resort (INR 6,500/night)",
            "luxury": "Gateway Varkala - IHCL (INR 14,000/night)"
        },
        "restaurants": ["Darjeeling Cafe (Cafe, Seafood)", "Abba Restaurant & Bakery", "Cafe Del Mar"],
        "activities": [
            {"time": "08:30 AM", "title": "Varkala Cliff Surfing Lesson", "description": "Take a beginner-friendly surf lesson on the beautiful black sand beach.", "cost": 1500, "duration": "2 hours"},
            {"time": "04:30 PM", "title": "Janardhana Swamy Temple Visit", "description": "Explore the 2000-year-old temple overlooking the beach.", "cost": 0, "duration": "1.5 hours"},
            {"time": "06:00 PM", "title": "Cliff Walk and Shopping", "description": "Browse local shops selling Tibetan crafts, incense, and enjoy cliffside dining.", "cost": 0, "duration": "2 hours"}
        ]
    },
    "thekkady": {
        "name": "Thekkady",
        "district": "Idukki",
        "hotels": {
            "budget": "Wild Corridor (INR 2,200/night)",
            "mid-range": "Greenwoods Resort (INR 8,000/night)",
            "luxury": "Spice Village - CGH Earth (INR 18,000/night)"
        },
        "restaurants": ["Chrissie's Cafe (Italian, Garden setting)", "Our Place (Continental)", "Ambadi Restaurant (Traditional Kerala)"],
        "activities": [
            {"time": "07:30 AM", "title": "Periyar Lake Boat Safari", "description": "Spot wild elephants, gaurs, and birds on a morning boat cruise inside the reserve.", "cost": 450, "duration": "2 hours"},
            {"time": "01:30 PM", "title": "Spice Plantation Guided Tour", "description": "Learn how cardamom, pepper, vanilla, and cocoa are cultivated.", "cost": 150, "duration": "2 hours"},
            {"time": "06:00 PM", "title": "Kalaripayattu Martial Art Show", "description": "Watch a thrilling performance of Kerala's ancient martial art form.", "cost": 300, "duration": "1.5 hours"}
        ]
    }
}

DEFAULT_DESTINATIONS = ["kochi", "munnar", "thekkady", "alleppey", "kovalam"]

def get_fallback_itinerary(
    source_city: str,
    duration: int,
    budget: str,
    travelers_count: int,
    interests: List[str],
    travel_style: str,
    accommodation_pref: Optional[str] = "Hotel",
    vehicle_pref: Optional[str] = "Private Cab",
    food_pref: Optional[str] = "Local Seafood"
) -> Dict[str, Any]:
    """
    Generates a realistic, highly personalized day-by-day Kerala itinerary
    using a rule-based expert system mapping real coordinates and attractions.
    """
    # 1. Decide route sequence based on duration & interests
    selected_keys = []
    
    if "beach" in [i.lower() for i in interests]:
        selected_keys += ["kochi", "varkala", "kovalam"]
    if "hill-station" in [i.lower() for i in interests] or "adventure" in [i.lower() for i in interests]:
        selected_keys += ["munnar", "thekkady", "wayanad"]
    if "backwaters" in [i.lower() for i in interests]:
        selected_keys += ["alleppey", "kochi"]
        
    # Deduplicate and match duration limits
    selected_keys = list(dict.fromkeys(selected_keys))
    if not selected_keys:
        selected_keys = DEFAULT_DESTINATIONS.copy()
        
    # Match route size to duration
    if duration <= 3:
        route = selected_keys[:2]
    elif duration <= 5:
        route = selected_keys[:3]
    else:
        route = selected_keys[:4]
        
    # Ensure route is logical from north to south if possible, or Kochi centered
    if "kochi" in route:
        route.remove("kochi")
        route = ["kochi"] + route # Kochi is always a great entry point

    days = []
    day_count = 1
    
    # Generate daily breakdown
    for dest_key in route:
        if dest_key not in DESTINATION_DETAILS:
            continue
        dest_info = DESTINATION_DETAILS[dest_key]
        dest_name = dest_info["name"]
        
        # Calculate days per destination
        days_allocated = 2 if duration > 3 and len(route) >= 2 else 1
        if day_count > duration:
            break
            
        for d in range(days_allocated):
            if day_count > duration:
                break
                
            day_activities = []
            available_acts = dest_info["activities"]
            
            # Select 2-3 activities for the day
            acts = random.sample(available_acts, min(len(available_acts), 3))
            
            # Order activities by time
            acts.sort(key=lambda x: x["time"])
            
            day_title = f"Explore the wonders of {dest_name}"
            if day_count == 1:
                day_title = f"Arrival in {dest_name} & Sightseeing"
            elif day_count == duration:
                day_title = f"Departure from {dest_name}"

            day_obj = {
                "day": day_count,
                "title": day_title,
                "destination": dest_name,
                "activities": acts,
                "meals": {
                    "lunch": f"Enjoy lunch at {dest_info['restaurants'][0]}",
                    "dinner": f"Dinner at {dest_info['restaurants'][1]}"
                },
                "accommodation": dest_info["hotels"].get(budget.lower(), dest_info["hotels"]["mid-range"]),
                "travel_time": "1-2 hours local transfer" if d > 0 else "3-4 hours scenic drive to next hub"
            }
            days.append(day_obj)
            day_count += 1

    # Packing suggestions based on interests & season
    packing_suggestions = ["Comfortable light cotton clothing", "Sunscreen & Sunglasses", "Insect repellent", "Umbrella or raincoat"]
    if any(k in ["munnar", "wayanad", "thekkady"] for k in route):
        packing_suggestions.append("Light jacket or sweater for cool evenings")
    if "beach" in [i.lower() for i in interests]:
        packing_suggestions.append("Swimwear & Sandals")

    # Local Travel Tips
    travel_tips = [
        "In Kerala, traditional dress is preferred at places of worship. Dress modestly.",
        "Hire local guides for forest treks to ensure safety and support local community tourism.",
        "Keep cash handy, as remote hills or smaller local diners may not accept digital payments.",
        "Try fresh coconut water ('Karikku') from roadside vendors for hydration during transfers."
    ]

    # Calculate budget breakdown based on travelers and quality
    base_costs = {"budget": 3000, "mid-range": 8000, "luxury": 22000}
    multiplier = base_costs.get(budget.lower(), 8000)
    
    accommodation_total = multiplier * duration * travelers_count
    food_total = 1200 * duration * travelers_count
    transport_total = 2500 * duration # car rental / cab
    activity_total = 1000 * duration * travelers_count
    grand_total = accommodation_total + food_total + transport_total + activity_total

    budget_breakdown = {
        "currency": "INR",
        "accommodation": accommodation_total,
        "food": food_total,
        "transport": transport_total,
        "activities": activity_total,
        "total": grand_total
    }

    # Generate title
    title = f"{duration}-Day Scenic {', '.join([DESTINATION_DETAILS[k]['name'] for k in route])} Exploration"

    return {
        "title": title,
        "duration": duration,
        "source_city": source_city,
        "destinations": [DESTINATION_DETAILS[k]["name"] for k in route],
        "days": days,
        "budget_breakdown": budget_breakdown,
        "packing_suggestions": packing_suggestions,
        "travel_tips": travel_tips
    }
