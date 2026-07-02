# System Architecture V1.0 — TravelWithUs AI

This document outlines the system architecture, component integrations, data flow patterns, and deployment configurations for the Version 1.0 release of the TravelWithUs platform.

---

## 1. High-Level Component Architecture

```
                    ┌────────────────────────┐
                    │     React Frontend     │
                    │      (Vite + SPA)      │
                    └───────────┬────────────┘
                                │
                        HTTPS / REST APIs
                                │
                                ▼
                    ┌────────────────────────┐
                    │    FastAPI Backend     │
                    │   (Uvicorn + Python)   │
                    └───────────┬────────────┘
                                │
               ┌────────────────┴────────────────┐
               ▼                                 ▼
      ┌────────────────┐                ┌────────────────┐
      │   Neon / PG    │                │    External    │
      │   (Postgres)   │                │   AI Models    │
      └────────────────┘                └────────────────┘
```

---

## 2. Component Design Details

### 1. Frontend Architecture
- **Tech Stack**: React 19 + TypeScript + Vite.
- **State management**: Zustand stores managing user auth states (`authStore.ts`).
- **Styles**: Tailwind CSS v4 variables system.
- **Client Routing**: React Router DOM (v7) managing pages transition.

### 2. Backend Architecture
- **Tech Stack**: FastAPI (Python 3.12) running under Uvicorn server processes.
- **Data Access**: SQLAlchemy v2.0 ORM with connection pooling.
- **Endpoints**: Modular routers split by concerns (auth, destinations, trips).

### 3. Authentication Flow
1. User provides login credentials to the frontend form.
2. Credentials sent to backend `POST /api/auth/login`.
3. Backend validates password against hashed database records using `bcrypt`.
4. If valid, generates a **JWT access token** containing user ID, role, and expiration timestamp signed using HS256 with a secure key.
5. Frontend stores JWT token in `localStorage`.
6. Subsequent requests send the token in the `Authorization: Bearer <token>` header.

### 4. Database & Storage Architecture
- **Database Engine**: PostgreSQL (Neon for production/SQLite for local fallback).
- **PostGIS integration**: Geolocation points coordinates saved as `GEOGRAPHY(POINT, 4326)`.
- **Indexing**:
  - GIST index for geographic proximity checks.
  - GIN trgm index on name fields for typeahead search.
  - Standard B-Tree on unique columns (email, slug).

### 5. AI Layer (Itinerary Builder)
- **RAG Generation**:
  1. Parse user input criteria.
  2. Select matching candidate destinations from the database using SQL filters.
  3. Format candidate details into a prompt template alongside current weather context.
  4. Send formatted prompt to OpenAI/Gemini APIs using JSON schema validation.
  5. Return formatted JSON response to client.

### 6. Universal Ingestion Pipeline
- **Modules**: File Walkers -> Format Detectors -> Custom Parsers -> Validation Schemas -> DB Upserting.
- **Performance**: Streams file lines via generators, bulk inserts in batches of 1,000 using SQLAlchemy mappings to avoid ORM instantiation load.

---

## 3. Infrastructure, Security, & Monitoring

### Deployment Pipelines
- **Vite SPA**: Hosted on Vercel's Edge network, with rewrite rules mapping `/api/*` to the backend.
- **FastAPI Backend**: Dockerized and deployed as a web service on Render.
- **Database**: Hosted on Neon Cloud Console (Serverless PostgreSQL).

### Logging & Monitoring
- **Server Logging**: Structured log statements formatted via Python standard logging libraries.
- **Database Health**: Pre-ping parameters enabled in SQLAlchemy pool configurations to detect dropouts.

### Security Boundaries
- **CORS Configuration**: Explicit origin whitelist settings on the FastAPI middleware.
- **Password Safety**: Hashed at rest using bcrypt.
- **SQL Injections Prevention**: Pre-parameterized queries enforced automatically via SQLAlchemy ORM.
