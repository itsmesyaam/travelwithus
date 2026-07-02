from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.api import auth, destinations, trips
from app.seed import seed_database

# Initialize database tables on startup
Base.metadata.create_all(bind=engine)

# Seed database with initial destinations & districts
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title="KeralaX AI Backend",
    description="Enterprise-grade AI-powered Kerala travel planning backend API.",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For free tier / easy deployment testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router, prefix="/api")
app.include_router(destinations.router, prefix="/api")
app.include_router(trips.router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to KeralaX AI API Service. God's Own Country is waiting!",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
