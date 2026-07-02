# TravelWithUs AI — The Smartest Way to Explore God's Own Country

TravelWithUs AI is a premium, engineering-grade travel planning platform designed to make exploring Kerala seamless, interactive, and personalized. Built from scratch with a modular monorepo architecture, it features a cinematic Apple-inspired light/dark UI and a robust FastAPI backend.

---

## 🏗️ Architecture & Stack

### Frontend (`/frontend`)
- **Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS + Glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **State Management**: Zustand (Auth store syncing)

### Backend (`/backend`)
- **Framework**: FastAPI (Python 3.12)
- **ORMs**: SQLAlchemy v2.0
- **Database**: SQLite (local development fallback) & PostgreSQL (production database Neon/Render)
- **Auth**: JWT (JSON Web Tokens) with HS256 encryption & CryptContext bcrypt password hashing
- **Package Manager**: `uv` (Fastest dependency installer)

---

## 📂 Folder Structure

```
travelwithme/
├── backend/
│   ├── app/
│   │   ├── api/             # API Router endpoints (auth, destinations, trips)
│   │   ├── core/            # Security utilities and dependency injections
│   │   ├── services/        # AI Itinerary Generator service
│   │   ├── database.py      # SQLAlchemy connection engine & Base
│   │   ├── main.py          # FastAPI application startup & CORS
│   │   ├── models.py        # Database tables schemas (SQLAlchemy)
│   │   ├── schemas.py       # Pydantic request/response payload validation
│   │   └── seed.py          # Automatic seeding script for initial datasets
│   ├── Dockerfile           # Backend container settings
│   └── requirements.txt     # Python requirements manifest
├── frontend/
│   ├── src/
│   │   ├── assets/          # Project SVGs and illustrations
│   │   ├── components/
│   │   │   ├── landing/     # Landing sections (Hero, Map, Experiences, Seasonal, Testimonials)
│   │   │   ├── layout/      # Common shell templates (Navbar, Footer)
│   │   │   └── ui/          # Core reusable component library (Button, Badge, Card, Input)
│   │   ├── data/            # Local Kerala dataset mocks
│   │   ├── pages/           # Core page views (HomePage, ExplorePage, DestinationDetails, TripPlanner, Dashboard, Admin, Blog)
│   │   ├── stores/          # Zustand authentication stores
│   │   └── index.css        # Global CSS variables & glassmorphism animation tokens
│   ├── Dockerfile           # Production multi-stage Nginx builder
│   ├── tsconfig.json        # TypeScript compiler configurations
│   ├── vercel.json          # Redirect rules for client-side routing on Vercel
│   └── vite.config.ts       # Vite bundler alias maps & tailwind integration
├── docker-compose.yml       # Monorepo container orchestrator
└── README.md                # Project documentation entrypoint

```

---

## 🚀 Quick Setup & Run

### Method 1: Docker Compose (Recommended)
Compile and launch Postgres database, FastAPI backend, and Nginx-served Vite frontend automatically in one command:
```bash
docker-compose up --build
```
- Access Frontend: `http://localhost`
- Access Backend: `http://localhost:8000`

### Method 2: Manual Run

#### 1. Start the Backend API
Navigate to the backend directory, initialize virtual environment, install requirements, and run server:
```bash
cd backend
# Create virtual environment using uv
uv venv --python 3.12
# Activate virtual environment (Windows)
.venv\Scripts\activate
# Install dependencies
uv pip install -r requirements.txt
# Launch server
python -m uvicorn app.main:app --port 8000
```
*Note: The SQLite database `travelwithus.db` will be automatically created and fully seeded with 14 districts, 20 destinations, and blog posts on first startup.*

#### 2. Start the Frontend
In a new terminal window, navigate to the frontend directory, install npm packages, and run dev server:
```bash
cd frontend
npm install
npm run dev
```
- Frontend will open on `http://localhost:5173`. It is configured to automatically proxy `/api` calls to the backend on `http://localhost:8000`.

---

## 📡 API Endpoints Map

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Root Welcome Status | No |
| **GET** | `/api/health` | Service Health check | No |
| **POST** | `/api/auth/register` | Register new user profile | No |
| **POST** | `/api/auth/login` | Authenticate & retrieve JWT Token | No |
| **GET** | `/api/auth/me` | Fetch active user credentials | Yes |
| **GET** | `/api/destinations` | List destinations (with search & category filters) | No |
| **GET** | `/api/destinations/{slug}` | Get single destination details by slug | No |
| **GET** | `/api/districts` | List all 14 districts in Kerala | No |
| **POST** | `/api/trips/generate` | Generate travel plan itinerary dynamically | No |
| **POST** | `/api/trips/save` | Save a generated itinerary to user profile | Yes |
| **GET** | `/api/trips` | Fetch all saved itineraries for current user | Yes |

---

## 🔒 Security & Best Practices
- **Secure Authentication**: JWT tokens are signed using custom HS256 hashes. Passwords are encrypted using CryptContext bcrypt hashing.
- **SQL Injection Prevention**: Built entirely with SQLAlchemy v2.0 parameterized queries to prevent SQL injections.
- **Client-Side Routing Redirection**: `vercel.json` provides rewrite configurations to redirect direct routing URLs back to `index.html` on Vercel deployments.
- **CSS-First Theme variables**: Uses Tailwind CSS v4 variables configuration in `index.css` for high-performance theme toggles.
