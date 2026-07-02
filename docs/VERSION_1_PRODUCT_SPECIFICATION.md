# Version 1.0 Product Specification — KeralaX AI

This document defines the product scope, requirements, and technical boundaries for the Version 1.0 release of the KeralaX AI SaaS travel platform.

---

## 1. Product Scope

### Features Included (V1.0)
- **AI Itinerary Generator**: User input wizard (duration, budget, pace, region, interests) yielding structured day-by-day itineraries, hotel suggestions, transit, and packing lists.
- **Dynamic Exploration Board**: Multi-criteria search and filter grids (categories, regions, districts, hidden gems) dynamically loaded from the PostgreSQL database.
- **Destination Detail Pages**: Rich content, coordinates, best time to visit, and integrated AI Concierge sidebar.
- **Auth & Profiles**: JWT-based sign-in, user dashboard containing saved itineraries, and user profile management.
- **Admin Control Console**: Live records management to create, edit, or disable destination profiles and track active users.
- **Dynamic Seeding & Ingestion**: Automated CSV ingestion pipeline validating database values on boot.

### Features Excluded (V1.0)
- **Direct Bookings**: Checkout systems, payment gateways, and active bookings (reserving rooms/tickets directly).
- **Social Features**: Friend networks, public itinerary sharing links, and user reviews.
- **Advanced AI Agents**: Real-time voice assistants or continuous multi-turn interactive chatbots.
- **Partner Portal**: Direct B2B merchant portal (resorts/guides logging in to upload inventory).

---

## 2. User Personas & User Stories

### Persona: Arjun (The Experiential Solo Traveler)
- **Bio**: A 28-year-old software developer from Bangalore seeking authentic, offbeat cultural experiences.
- **User Story**: *As Arjun, I want to filter destinations by "hidden gems" and get an AI itinerary that avoids congested tourist centers so that I can explore local culture in peace.*

### Persona: Sarah (The Premium Family Organizer)
- **Bio**: A 38-year-old project manager from London planning a 7-day trip for her family of four.
- **User Story**: *As Sarah, I want to specify a luxury budget and get premium accommodation suggestions aligned with children-friendly activities so that my family remains comfortable.*

---

## 3. Screen Inventory & Navigation Flow

### Screen Inventory
1. **Home Landing Page (`/`)**: Hero cinematic showcase, interactive map by region, testimonials, and blog stories.
2. **Explore Board (`/explore`)**: Search input, category scrollbars, district dropdowns, and destination grid cards.
3. **Destination Detail (`/destination/:slug`)**: Banner header, packing tips card, highlights, and AI Concierge sidebar.
4. **Trip Planner Wizard (`/planner`)**: Form input selectors, dynamic timeline render, costing tables, and PDF exporter.
5. **User Dashboard (`/dashboard`)**: Profile overview and saved itineraries accordion.
6. **Admin Console (`/admin`)**: Tabbed CRUD registries for destinations list and member profiles.
7. **Blog Index & Detail (`/blog`, `/blog/:slug`)**: Travel articles list and reading layout.

### Navigation Flow
```
               [Home Landing]
               /      │     \
              v       v      v
      [Explore]  [Planner]  [Blog Index]
          │           │          │
          v           v          v
     [Details]   [Itinerary]  [Blog Detail]
          │           │
          v           v
      [Register/Login Modal]
              │
              v
     [User Dashboard] ───> [Admin Console] (If admin)
```

---

## 4. API Inventory & Database Modules

### API Inventory
- **Auth Paths**:
  - `POST /api/auth/register` — Create user credentials.
  - `POST /api/auth/login` — Get JWT token.
  - `GET /api/auth/me` — Read profile details.
- **Destinations Paths**:
  - `GET /api/destinations` — Retrieve destinations list (with query filters).
  - `GET /api/destinations/{slug}` — Retrieve single destination.
  - `GET /api/districts` — Retrieve districts list.
- **Itinerary Paths**:
  - `POST /api/trips/generate` — Generate trip details.
  - `POST /api/trips/save` — Save generated plan.
  - `GET /api/trips` — Fetch user saved plans list.

### Database Modules
- **Users Table**: User authentication credentials and roles database.
- **Districts Table**: Kerala's 14 districts descriptions and metrics.
- **Destinations Table**: Primary destination information (description, coordinates, ratings, airport tags, entry fees).
- **Trip Plans Table**: Saved JSON itineraries linked to users.
- **Blog Posts Table**: Published article logs.

---

## 5. Non-Functional Requirements & Targets

### Performance Targets
- **Itinerary Generation**: Complete generation in under 1 second.
- **Data Query Latency**: P95 database queries under 100ms.
- **Frontend Page Load**: Lighthouse performance score of >90.

### Accessibility (A11y)
- **WCAG 2.1 AA Compliance**: Require appropriate color contrasts across all text elements.
- **Keyboard Navigation**: Active links, input fields, and modal triggers must support keyboard focus outlines.
- **Screen Reader Support**: Img components must define functional `alt` attributes.

### SEO Requirements
- **Dynamic Meta Tags**: Unique HTML titles and descriptions for every page route.
- **Structured Schema**: JSON-LD schemas mapped to destinations and blog posts to enable rich Google Search snippets.

### Deployment Requirements
- Monorepo deployed with divided pipelines:
  - **Frontend**: Vercel (static assets + redirect rewrites).
  - **Backend**: Render Web Service (FastAPI container + uvicorn).
  - **Database**: Neon (PostgreSQL cloud database).
