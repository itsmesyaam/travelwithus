# Brand Rename Report — KeraLax to TravelWithUs

This report summarizes the project-wide rebranding operation to rename all instances of **KeraLax** to **TravelWithUs**.

---

## 1. Overview of Changes

All occurrences of the former brand names (**KeraLax**, **KeralaX**, **KERALAX**, and **keralax**) have been recursively replaced with **TravelWithUs** (respecting case alignment) across 39 files in the monorepo workspace.

---

## 2. Rebranded Files List

Below are all the files modified during the search-and-replace pipeline:

### Configuration & Root files:
- [CHANGELOG.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/CHANGELOG.md)
- [DEPLOYMENT_GUIDE.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/DEPLOYMENT_GUIDE.md)
- [docker-compose.yml](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docker-compose.yml)
- [PROJECT_STATUS.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/PROJECT_STATUS.md)
- [README.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/README.md)
- [render.yaml](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/render.yaml)
- [task.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/task.md)

### Backend Service files:
- [backend/app/database.py](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/backend/app/database.py)
- [backend/app/main.py](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/backend/app/main.py)
- [backend/app/core/security.py](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/backend/app/core/security.py)

### Frontend Service & Page files:
- [frontend/vercel.json](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/vercel.json)
- [frontend/src/App.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/App.tsx)
- [frontend/src/components/landing/TestimonialsSection.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/components/landing/TestimonialsSection.tsx)
- [frontend/src/components/layout/Footer.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/components/layout/Footer.tsx)
- [frontend/src/components/layout/Navbar.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/components/layout/Navbar.tsx)
- [frontend/src/data/kerala.ts](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/data/kerala.ts)
- [frontend/src/pages/AdminPage.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/pages/AdminPage.tsx)
- [frontend/src/pages/DashboardPage.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/pages/DashboardPage.tsx)
- [frontend/src/pages/DestinationDetailsPage.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/pages/DestinationDetailsPage.tsx)
- [frontend/src/pages/HomePage.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/pages/HomePage.tsx)
- [frontend/src/pages/StaticPages.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/pages/StaticPages.tsx)
- [frontend/src/pages/TripPlannerPage.tsx](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/pages/TripPlannerPage.tsx)
- [frontend/src/stores/authStore.ts](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/frontend/src/stores/authStore.ts)

### System Blueprint Documentation (docs/):
- [docs/AI_ARCHITECTURE.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/AI_ARCHITECTURE.md)
- [docs/DATA_GOVERNANCE.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/DATA_GOVERNANCE.md)
- [docs/DESIGN_IMPROVEMENT_PLAN.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/DESIGN_IMPROVEMENT_PLAN.md)
- [docs/ENGINEERING_STANDARDS.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/ENGINEERING_STANDARDS.md)
- [docs/FEATURE_BACKLOG.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/FEATURE_BACKLOG.md)
- [docs/MONETIZATION_STRATEGY.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/MONETIZATION_STRATEGY.md)
- [docs/PERFORMANCE_AUDIT.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/PERFORMANCE_AUDIT.md)
- [docs/PRODUCT_REVIEW.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/PRODUCT_REVIEW.md)
- [docs/PRODUCT_VISION.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/PRODUCT_VISION.md)
- [docs/PROJECT_RULES.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/PROJECT_RULES.md)
- [docs/RELEASE_PLAN.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/RELEASE_PLAN.md)
- [docs/SYSTEM_ARCHITECTURE_V1.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/SYSTEM_ARCHITECTURE_V1.md)
- [docs/UI_UX_AUDIT.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/UI_UX_AUDIT.md)
- [docs/UI_UX_DESIGN_SYSTEM.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/UI_UX_DESIGN_SYSTEM.md)
- [docs/VERSION_1_PRODUCT_SPECIFICATION.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/docs/VERSION_1_PRODUCT_SPECIFICATION.md)

### Database Schemas (import/):
- [import/DATABASE_MIGRATION_PLAN.md](file:///c:/Users/syam1/OneDrive/Desktop/travelwithme/import/DATABASE_MIGRATION_PLAN.md)

---

## 3. Database Migration Details

- Renamed the local SQLite file from `backend/keralax.db` to `backend/travelwithus.db` (preserving user local test data and history).
- Updated backend database configurations so it defaults to `sqlite:///./travelwithus.db` on startup when no `DATABASE_URL` is configured.

---

## 4. Remaining Manual Actions Required

- **GitHub Repository Details**:
  - The repository description and topics (tags) on the GitHub homepage should be updated to refer to **TravelWithUs** instead of **KeraLax**.
- **External Integration Keys (Render/Vercel Configs)**:
  - If you previously set a `JWT_SECRET` containing the string `keralax` inside Render settings, update it to use a rebranded string (though Render JWT credentials should be randomly generated strings for security).
- **Client Cache Clear**:
  - Because `localStorage` is used to persist theme keys (`travelwithus-dark`) and tokens (`travelwithus-token`), users who previously logged in on the local dev server under `keralax-token` will be requested to log in again, as the key has been rebranded.
