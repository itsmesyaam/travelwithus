# Changelog — KeralaX AI SaaS Platform

All notable changes to this project will be documented in this file.

---

## [1.0.0] — 2026-07-02

### Added
- **Premium UI Concept Redesign (Inspired by Apple, Airbnb, Epic, and MNTN)**:
  - Refactored `HeroSection` into a full-viewport immersive landscape slider with a custom multi-layered SVG wave/water divider at the bottom.
  - Implemented `QuickLinksSection` with circular category action buttons (Backwaters, Hill Stations, Beaches, Wildlife) below the hero transition (inspired by the `Mézenc` design).
  - Redesigned `KeralaMap` into a custom interactive SVG map of Kerala featuring coordinates, Western Ghats path bounds, pulsing map markers, and pastel-toned hover regions (inspired by the `epic` map).
  - Upgraded `BookingStepsSection` into a vertical staggered storytelling layout with huge background numbers, accent divider lines, and high-quality photography matching the `MNTN` design.
- **Bento-Style Landing Page Redesign (WANDER Concept)**:
  - Redesigned the hero section as a floating bento card with full-screen dynamic imagery, massive title fonts, and dual custom pills CTAs.
  - Implemented the "Why Choose Us" split grid widget containing left-side statistics row and right-side stacked translucent value feature cards.
  - Engineered the "Top Destinations" portrait card slider display with stars review levels and starting price badges.
  - Added the three-column "Tour Packages" bento block showing custom routes.
  - Built the "1-2-3 Booking Steps" horizontal workflow checklist.
- **Landing Page Immersive Visuals & Trust Seals Redesign**:
  - Implemented a Ken Burns cross-fading background image slider featuring Munnar, Alleppey, and Varkala travel imagery.
  - Added a top utility header contact bar in the navbar displaying telephone, email, and travel tips links.
  - Integrated red and emerald green Govt. Approved, Travelers' Choice, and Safe Tourism seals into the hero layout.
  - Applied premium typography welcome badges to elevate the visual landing layout.
- **Database Schema Improvements & Migrations**:
  - Normalized regions lookup table (`regions`).
  - Normalized districts table with geographic references (`districts` pointing to `regions`).
  - Normalized categories map table (`destination_categories` and dynamic `destination_category_map` M:N lookup).
  - Normalized activities and hotels tables structure mapping.
  - Integrated SQLite-friendly fallbacks for coordinates & geometry columns.
- **Seeding Upgrades**: Refactored `seed.py` to parse CSV datasets and dynamically build relational lookups, establishing a robust database spine.
- **Dynamic Frontend Integration**: Connected explore boards and destination detail pages to fetch records dynamically from the backend APIs with static network fallbacks.
- **Ingestion Pipeline**: Custom database parser [ingest.py](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/backend/app/ingest.py) that cleans, processes, and deduplicates Google Drive datasets.
- **Governance & Specification Documents**: Generated all product vision, engineering standards, design guidelines, data governance, and AI layer architecture blueprints under the `/docs` directory.
