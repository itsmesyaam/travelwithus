# Feature Backlog — TravelWithUs AI

This document catalogs the complete feature backlog for the TravelWithUs platform, categorized by target release milestones.

---

## 1. Core (Version 1.0) — Stable Release

### Feature: Rule-Based AI Travel Planner
- **Description**: RAG-based travel planning wizard outputting days breakdown, hotels, transit, and costing summaries.
- **Business Value**: Core product experience, drives premium conversions.
- **User Value**: Frictionless, sub-second personalized planning.
- **Technical Complexity**: Medium (JSON schema formatting, prompt token control).
- **Priority**: Critical.
- **Dependencies**: SQLite/PostgreSQL destinations registry.
- **Estimated Development Effort**: 8 Days (Completed).

### Feature: Auth & Saved Profiles
- **Description**: Sign-in modals, JWT verification, and user profiles dashboard.
- **Business Value**: Captures user details, increases user retention.
- **User Value**: Safely save and retrieve travel itineraries.
- **Technical Complexity**: Medium (Password hashing, security boundaries).
- **Priority**: High.
- **Dependencies**: Users database table.
- **Estimated Development Effort**: 5 Days (Completed).

---

## 2. Version 1.1 — Dynamic Integrations & Performance

### Feature: Universal Ingestion Framework (UIF)
- **Description**: Multi-format local importer pipeline supporting XLSX, JSON, CSV, and Markdown data.
- **Business Value**: Allows automated imports from diverse local tourism departments.
- **User Value**: Immediate access to fresh, accurate travel databases.
- **Technical Complexity**: High (File parsing libraries, transaction batching).
- **Priority**: High.
- **Dependencies**: Relational tables schema.
- **Estimated Development Effort**: 6 Days.

### Feature: Interactive PostGIS Map Search
- **Description**: Render interactive maps overlaying destination spots using real-world coordinates and radius search calculations.
- **Business Value**: High user engagement, drives discovery.
- **User Value**: Discover nearby attractions based on actual geographic distance.
- **Technical Complexity**: High (PostGIS spatial queries, MapLibre/Leaflet React integration).
- **Priority**: Medium.
- **Dependencies**: PostGIS extension, destinations coordinate columns.
- **Estimated Development Effort**: 7 Days.

---

## 3. Version 1.5 — Commercial & Booking Features

### Feature: B2B Sponsored Placement
- **Description**: Allow registered local hotels/resorts to bid for sponsorship insertion inside generated itineraries.
- **Business Value**: Generates initial advertising and partner commission revenue streams.
- **User Value**: Offers direct, vetted booking options matched to budget.
- **Technical Complexity**: High (Bidding auctions algorithms, ad placement logs).
- **Priority**: Medium.
- **Dependencies**: Partner program tables, dynamic pricing multipliers.
- **Estimated Development Effort**: 12 Days.

### Feature: Dynamic OTA Pricing Calendar
- **Description**: Real-time room availability and pricing calendar partitioned by date for dynamic cost estimates.
- **Business Value**: Prerequisite for direct booking integration.
- **User Value**: Accurate hotel cost transparency prior to booking.
- **Technical Complexity**: High (PostgreSQL table partitioning, date-range checks).
- **Priority**: Medium.
- **Dependencies**: Room types table schema.
- **Estimated Development Effort**: 10 Days.

---

## 4. Version 2.0 — AI vector Scaling & Marketplace

### Feature: Vector-based Recommendations (pgvector)
- **Description**: Sub-100ms vector search querying user preference vectors against destination vector embeddings.
- **Business Value**: True AI personalized experiences, increases conversion.
- **User Value**: Highly matched destinations recommendations based on implicit click history.
- **Technical Complexity**: High (pgvector setup, embedding cron jobs).
- **Priority**: High.
- **Dependencies**: pgvector database extension, OpenAI API.
- **Estimated Development Effort**: 9 Days.

### Feature: Local Guide Marketplace
- **Description**: B2B2C marketplace where local guides list custom tours and travelers can reserve services.
- **Business Value**: Marketplace fee transactions revenue model.
- **User Value**: Safe connection to certified local guides.
- **Technical Complexity**: Very High (Multi-tenant messaging, rating systems, booking triggers).
- **Priority**: Low.
- **Dependencies**: User profiles, payment processors.
- **Estimated Development Effort**: 20 Days.

---

## 5. Future — Voice & Multilingual Expansion

### Feature: Voice Chat Assistant
- **Description**: WebSocket-based speech recognition and translation enabling voice-driven itinerary planning.
- **Business Value**: Technological leadership, USP.
- **User Value**: Hands-free route planning while traveling.
- **Technical Complexity**: Extremely High (Real-time audio processing, Whisper integrations).
- **Priority**: Low.
- **Dependencies**: Model abstraction layers, audio buffers.
- **Estimated Development Effort**: 25 Days.
