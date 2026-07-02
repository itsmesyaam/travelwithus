# Release Plan — TravelWithUs AI

This document establishes the release phases, exit criteria, risks, and success metrics for the rollout of the TravelWithUs travel platform.

---

## 1. Release Timeline Overview

```
 [ Alpha ] ────> [ Private Beta ] ────> [ Public Beta ] ────> [ Version 1.0 ] ────> [ Version 1.1 ] ────> [ Version 2.0 ]
 Internal         Select Users          Open to Public       Stable SaaS          Dynamic APIs         AI Vector Search
 Testing          Feedback Group        Scaling Check        Launch               Integrations         Scale Launch
```

---

## 2. Release Phase Specifications

### Phase 1: Alpha (Internal Dev Testing)
- **Features**: Core landing page, rule-based planner, database seeding script, basic explore Board.
- **Testing Requirements**:
  - Unit tests for the backend routers.
  - End-to-end local generation testing with various traveler profiles.
- **Exit Criteria**:
  - 100% test coverage on core routing endpoints.
  - Zero compile errors in the frontend build.
- **Risks**: Local SQLite DB concurrency bottlenecks.
- **Success Metrics**: Latency for local rule-based itinerary generation under 500ms.

### Phase 2: Private Beta (Selective User Feedback Group)
- **Features**: JWT authorization, dashboards, Saved plans lists, and Admin console.
- **Testing Requirements**:
  - Closed user testing (approx. 50 select travelers).
  - Validation checks on Neon/PostgreSQL database connections.
- **Exit Criteria**:
  - Zero critical data loss during saves/deletes.
  - Positive UX feedback on the wizard flow.
- **Risks**: JWT validation errors on specific browsers.
- **Success Metrics**: 80% user retention within the select test group.

### Phase 3: Public Beta (Open Scaling Check)
- **Features**: Monorepo deployed on cloud platforms, `/import` dataset loading, and initial blog pages.
- **Testing Requirements**:
  - Load testing (simulating up to 1,000 concurrent generations).
  - Security scans for SQL injection or JWT token leaks.
- **Exit Criteria**:
  - Server remains responsive under heavy concurrent loads.
  - Audit trail triggers execute successfully on updates.
- **Risks**: Neon/Render free tier limits exceeded.
- **Success Metrics**: P99 response latency under 1.5 seconds under load.

### Phase 4: Version 1.0 (Stable SaaS Launch)
- **Features**: All Phase 1-3 features finalized, production SEO metadata, WCAG accessibility support, and fully configured Docker containers.
- **Testing Requirements**:
  - Final accessibility validation (audit score > 95).
  - Production DB backup/restore dry runs.
- **Exit Criteria**:
  - No open critical issues.
  - Vercel, Render, and Neon production instances fully verified.
- **Risks**: Domain DNS propagation or routing delays.
- **Success Metrics**: NPS score of >75 across the first 1,000 active users.

### Phase 5: Version 1.1 (Dynamic APIs)
- **Features**: Universal Ingestion Framework (UIF) supporting XLSX/JSON, PostGIS interactive maps search.
- **Testing Requirements**:
  - Bulk upload stress testing (10,000 destinations in single upload).
  - Spatial indexing tests on coordinates.
- **Exit Criteria**:
  - Upload file formats detected and parsed automatically.
  - Map radius queries load in under 100ms.
- **Risks**: File corruptions or invalid formats upload crashes.
- **Success Metrics**: Ingestion processing time of under 30 seconds for large files.

### Phase 6: Version 2.0 (Vector Match Scale Launch)
- **Features**: pgvector matches query routing, B2B partner program integration, and dynamic price calendars.
- **Testing Requirements**:
  - Approximate Nearest Neighbor (ANN) index scaling tests.
  - Dynamic pricing stress testing under date ranges partition.
- **Exit Criteria**:
  - Sub-100ms vector matching on 100,000 user profiles.
  - Partition tables successfully auto-create on new year boundaries.
- **Risks**: Vector index accuracy degradation as volume scales.
- **Success Metrics**: Itinerary conversion rate increases by 25% due to vector personalization.
