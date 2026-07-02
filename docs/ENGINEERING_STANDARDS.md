# Engineering Standards — KeralaX Platform

This document establishes the official engineering constitution for all contributors to the KeralaX monorepo. It details code quality, architecture guidelines, patterns, and security constraints.

---

## 1. Directory Structure & Naming Conventions

### Workspace Structure
```
travelwithme/
├── backend/                 # FastAPI Application (Python)
│   ├── app/
│   │   ├── api/             # HTTP endpoints routers
│   │   ├── core/            # Config, security, DB setup
│   │   ├── models/          # SQLAlchemy Database Models
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── services/        # Business logic services
│   │   └── seed/            # Seeding scripts
│   ├── tests/               # Pytest suite
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                # React Vite Application
│   ├── src/
│   │   ├── components/      # Reusable functional components
│   │   │   ├── ui/          # Core atoms/UI primitives
│   │   │   └── layout/      # Layout containers
│   │   ├── pages/           # High-level route views
│   │   ├── stores/          # Zustand store definitions
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility initializations (axios, utils)
│   │   └── index.css        # Tailwind V4 styles
│   ├── Dockerfile
│   └── tsconfig.json
└── docs/                    # Architectural Specifications
```

### Naming Conventions
- **Files/Folders (React)**: PascalCase for components (`Navbar.tsx`), camelCase for utility files, hooks, and stores (`authStore.ts`).
- **Files/Folders (FastAPI)**: snake_case for all modules, files, and directories (`ai_planner.py`).
- **Database Tables/Columns**: `snake_case` plural for tables (`destinations`), `snake_case` singular for columns (`popularity_score`).
- **CSS classes**: kebab-case (`btn-primary`, `glass-strong`).

---

## 2. Frontend (React 19 & TypeScript) Standards
- **Component Patterns**: Explicitly write components as functional exports:
  ```typescript
  interface ButtonProps { ... }
  export function Button({ children }: ButtonProps) { ... }
  ```
- **Type Safety**: Strictly avoid `any`. Use strict TypeScript interfaces. Add explicit return types to custom hooks and event handlers.
- **State Management**: Use Zustand for global states (auth, theme, maps context). Keep local visual states (dropdown togglers, simple tab selectors) local to the component.
- **Tailwind CSS v4**: Define custom color and animation tokens in the `@theme` block of `index.css`. Avoid inline ad-hoc classes.

---

## 3. Backend (FastAPI & SQLAlchemy) Standards
- **Relational Models**: Explicitly inherit from `Base` declarative definitions. Use lazy relationships correctly (`lazy="selectin"` for collections, `lazy="joined"` for 1:1 and N:1 relations) to prevent N+1 query overhead.
- **Schemas**: Use Pydantic v2 schemas (`BaseModel`) for request/response bodies. Match database model parameters exactly. Ensure all schemas use `from_attributes = True` for direct ORM serialization.
- **Endpoint Routers**: Group routes logically in separate files. Add response models to all HTTP routes for validation and documentation generation:
  ```python
  @router.get("/destinations", response_model=List[DestinationOut])
  ```

---

## 4. API Design Standards
- **RESTful endpoints**: Always use standard REST conventions:
  - `GET /api/destinations`
  - `GET /api/destinations/{slug}`
  - `POST /api/trips/generate`
- **JSON responses**: All payloads must be structured JSON. Error responses must follow the RFC 7807 problem details structure.
- **Query Parameters**: Use query parameters for sorting, filtering, or paginating. Keep paths for unique keys or slugs.

---

## 5. Security & Environment Standards
- **Data Protection**: Sensitive details (tokens, database connection strings) must reside in environment files (`.env`). NEVER check these files into source control.
- **Authentication**: Secure endpoints using standard OAuth2 password flow with JWT bearer tokens. Set token expiration thresholds appropriately.
- **Bcrypt Hashing**: Encrypt passwords with strong cryptographic algorithms (bcrypt) prior to database insertion.

---

## 6. Git Workflow & Review Checklist

### Branch Strategy
- `master` / `main` represents production.
- Feature work branches off `main` with standard prefix `feat/`, `fix/`, `docs/`, or `chore/`.

### Commits Convention
Format all commits as:
`<type>: <description>`
- `feat: Add dynamic itinerary save endpoints`
- `fix: Fix React hydration compile warnings`

### Code Review Checklist
- Does the code compiled without warnings or TypeScript errors?
- Are environment variables handled securely without leaks?
- Are database calls structured to avoid N+1 query problems?
- Does the UI layout support responsive screen resizing?
- Is accessibility supported (correct tags, colors contrast, keyboard focus)?
