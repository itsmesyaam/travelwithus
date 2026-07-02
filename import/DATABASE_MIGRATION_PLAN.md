# database Migration Plan — TravelWithUs Platform

This document describes the migration path from the basic relational database schema (designed for local SQLite/basic Postgres setups) to the production-grade PostgreSQL database schema designed for scale.

---

## 1. Schema Gap Analysis

| Entity / Domain | Current (Vite-SQLite Setup) | Proposed Production PostgreSQL Schema | Migration Impact |
| :--- | :--- | :--- | :--- |
| **Regions** | Represented as inline string in `destinations.region`. | Normalized `regions` table. | High normalization |
| **Districts** | Flat table. | Normalized, references `regions` via FK; includes geometry multipolygon. | Minor DDL update |
| **Destinations** | Flat table; float lat/long columns; string categories. | PostGIS `GEOGRAPHY(POINT,4326)` columns; M:N map with `destination_categories`. | Geolocation conversion |
| **Activities** | Stored as JSON list inside `destinations`. | Normalized `activities` and `adventure_activities` (1:1 extension model). | High normalization |
| **Hotels & dynamic pricing** | Not implemented. | `hotels` → `room_types` → `hotel_price_calendar` (partitioned by stay date). | New modules |
| **AI Vector Embeddings** | Not implemented. | `user_embeddings` and `destination_embeddings` (pgvector). | New modules |
| **Transport Network** | Not implemented. | `transport_hubs` → `transport_routes` → `transport_schedules`. | New modules |

---

## 2. Relational Schema Migration Steps

### Phase 1: Database Extensions & Custom Types
To support advanced queries, geographic operations, and AI capabilities, the following extensions must be loaded:
1. `postgis` & `postgis_topology` (geospatial operations)
2. `vector` (pgvector nearest-neighbor search for AI recommendation engine)
3. `uuid-ossp` (client-side UUID generation)
4. `pg_trgm` (fuzzy typing autocomplete search index)
5. `citext` (case-insensitive indexing for emails)

### Phase 2: Base Geography Spine
Create normalized lookups for the geographic spine:
1. Populate `regions` table:
   - "North Kerala", "Central Kerala", "South Kerala"
2. Modify `districts` to point at `regions` via `region_id`.
3. Create `destination_categories` lookup table.
4. Convert destinations coordinates:
   - Convert separate float `latitude`/`longitude` columns to PostGIS geography points:
     ```sql
     ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography
     ```

### Phase 3: Hotel & Pricing Partitioning
The production schema requires time-partitioned tables to avoid index bloat under heavy transactional loads:
- Range partition `hotel_price_calendar` on the `stay_date` column.
- Partitions must be pre-created (e.g. `hotel_price_calendar_2026`, `hotel_price_calendar_2027`) to avoid insertion failures.

### Phase 4: Polymorphic Relationships
- `itinerary_items` and `pricing_rules` store polymorphic associations (`item_type` enum + `ref_id` bigserial FKs).
- Composite indexes `(item_type, ref_id)` will be configured rather than foreign key constraints, since standard SQL does not support polymorphic foreign keys.

---

## 3. PostGIS & Indexing Upgrades

To support scale, the following indexes are required:
- **GIST spatial indexes** on all `geom` columns (`destinations`, `hotels`, `transport_hubs`, `districts`) to enable fast distance calculations (`ST_DWithin`).
- **GIN + pg_trgm indexes** on name search inputs (`destinations.name`, `hotels.name`) to enable autocomplete typeahead searches without external services.
- **BRIN (Block Range Index) indexes** on temporal climate/price histories (`climate_history`, `price_history`) to keep disk space low at scale.
- **ivfflat vector index** on embedding columns for sub-100ms vector matches.

---

## 4. Ingestion Sync (Preventing Data Loss)

To execute this migration without data corruption:
1. Backup SQLite database file `travelwithus.db` or primary database.
2. Run database migration script `schema.sql` to generate new production tables.
3. Execute a data-mapping Python script to load old database data and map destinations fields (converting inline string categories to categories tables map, converting coordinates to GIS geography, splitting tags and activity lists into matching records).
4. Run validation checks to ensure counts match prior to cutover.
