# Project Rules & MANDATORY Instructions — KeralaX Platform

This document defines the strict, non-negotiable guidelines governing every modification and addition to the KeralaX codebase. Violation of these rules constitutes a compile or PR rejection.

---

## 1. Zero-Placeholder Production Data
- **No Mock Hotfixes**: Never insert temporary placeholders or hardcoded records (e.g. mock hotels, dummy destinations) in backend routers or frontend views.
- **Dynamic Seeding**: If new mock data is needed for tests, it must be loaded from CSV or JSON files inside the `/import` or seed folders.

---

## 2. Relational Integrity & Schema Migrations
- **No Direct Schema Updates**: Never execute raw schema modification queries directly on the production database.
- **Migrations Required**: Every schema or table update requires a corresponding SQLAlchemy model update in `models.py` and a documented migration instruction script.
- **Relational Constraints**: Always enforce foreign key constraints, table indexes, and coordinate boundary rules at the database engine level.

---

## 3. Strict Validation & Error Handling
- **API Inputs**: Every backend endpoint accepting data must validate payloads using Pydantic schemas. No raw dictionaries or unchecked payloads.
- **Null Safety**: Always handle empty states, network errors, and loading states on the frontend using clean fallbacks and spinners.
- **Problem Details**: Error payloads must return explicit error codes and user-friendly error statements.

---

## 4. UI/UX & Aesthetics Mandate
- **Responsive Layout**: Every page must fit correctly on screens ranging from mobile (`375px`) to wide desktop (`1280px`).
- **Dark Theme Compliance**: Every view component must support dark mode transitions using standard CSS variables and Tailwind classes.
- **No Default Controls**: Standard HTML button, select, or input outlines must be styled to match the premium design guidelines.

---

## 5. Performance, SEO, & Code Quality
- **N+1 Queries**: Never loop database queries inside SQLAlchemy logic. Always load relationships using explicit `selectinload` or `joinedload` operators.
- **SEO Elements**: Every frontend page route must contain descriptive title tags, meta descriptions, and clean heading structures.
- **Bundle Weight**: Keep components focused, avoid massive third-party package dependencies, and split code chunks where possible.
- **Accessibility (A11y)**: Use semantic HTML layout tags (`<header>`, `<nav>`, `<main>`, `<section>`), require `alt` descriptions on all images, and ensure appropriate color contrasts.

---

## 6. Commit & Git Quality
- **Meaningful Commits**: Every git commit message must follow the convention (`feat:`, `fix:`, `docs:`, `chore:`) and clearly state what changed.
- **Safe Keys**: NEVER commit environment files (`.env`), database snapshot files (`.db`), or private API keys.
- **Review Compliance**: Ensure the code compiles with zero TypeScript errors or linter errors prior to launching a pull request.
