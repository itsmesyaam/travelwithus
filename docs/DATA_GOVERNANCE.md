# Data Governance Plan — KeralaX Platform

This document defines the strict policies, validation benchmarks, and metadata standards governing all data pipelines within the KeralaX platform.

---

## 1. Zero-Hardcoding Mandate
To ensure portability and decoupling:
- **No hardcoded production data** (destinations, districts, routes, blogs, hotels) is permitted in the frontend components or backend endpoints.
- All production data must reside in the relational database.
- Any initial seed arrays used for local development must be loadable dynamically from external seed files (e.g. JSON or CSV assets stored in `/import` or seed folders).

---

## 2. Ingestion Pipeline & Deduplication

### File Verification & Processing Flow
Every imported file must pass through the **Universal Ingestion Framework (UIF)** containing three strict stages:
1. **Schema Check**: Validates input columns, parsing types, and file layouts against predefined Pydantic models.
2. **Boundary Validation**: Validates numerical ranges (e.g. coordinates bounding box, positive currency values, integer groups sizes).
3. **Reference Verification**: Ensures any foreign keys references (e.g. `district_id`, `destination_id`) map to existing records.

### Deduplication Strategies
- **Key Identifiers**: Each destination is uniquely keyed in the index by its name (converted to a lowercase, stripped slug: `clean_slug(name)`).
- **Collision Rules**:
  - If a destination matches an existing record slug, the importer will check for fields updates.
  - If columns overlap, the record in `central_kerala_destinations.csv` takes priority.
  - Extra attributes from secondary files (e.g. Ernakulam files highlights) are merged into JSON properties arrays of the existing record instead of creating duplicates.

---

## 3. Metadata & Asset Standards

### Geolocation (Coordinate) Standards
- All spatial locations (destinations, hotels, restaurants, transit hubs) must use real-world latitude/longitude coordinates.
- Spatial coordinate columns must conform to the **WGS 84 (EPSG:4326)** reference system.
- Bounding Box restriction: Coordinates must fall within Kerala boundaries:
  - Latitude: `[8.17, 12.8]`
  - Longitude: `[74.85, 77.41]`

### Image Asset Standards
- **Source Resolution**: Standard layouts require responsive image links. Primary landscape images must maintain a 4:3 or 16:9 ratio.
- **Form**: Use standard WebP format (compressed at 80% quality) to ensure fast loading on mobile networks.
- **Alt Text**: Every image row must contain descriptive `alt_text` for screen readers and search optimization.

### Video Asset Standards
- **Source**: Host promotional videos externally (Vimeo, YouTube, or AWS S3 CDN).
- **Form**: Embed standard progressive MP4 / H.264 formats. Avoid heavy video weights.

---

## 4. Updates, Backups, & Auditing

### Update Process
- All modifications to destination descriptions, ratings, or district tags must be executed via the Admin Console CRUD interface (which saves directly to the PostgreSQL database) or an ingestion rerun.
- Direct manual updates of relational databases in staging/production are forbidden.

### Backup Strategy
- **Daily Snapshot**: Automated backups must run daily using PostgreSQL pg_dump tools, stored securely in distinct S3 storage silos.
- **Retention**: Keep daily snapshots for 30 days, weekly snapshots for 6 months, and monthly snapshots for 1 year.

### Audit Trails
- Tables (`destinations`, `itineraries`, `users`) must contain `created_at` and `updated_at` columns managed automatically via PostgreSQL database triggers.
- An `audit_logs` table must capture B2B or administrative edits: recording `user_id`, `action` (Insert/Update/Delete), `table_name`, `record_id`, and `timestamp`.
