-- ============================================================================
-- KERALA AI TRAVEL PLATFORM — PRODUCTION POSTGRESQL SCHEMA
-- Chief Data Architect Design
-- Target scale: millions of users, sub-second AI itinerary generation
-- ============================================================================

-- ============================================================================
-- 0. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS postgis;             -- geospatial types & indexes
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";          -- UUID generation
CREATE EXTENSION IF NOT EXISTS pg_trgm;              -- fuzzy text / autocomplete search
CREATE EXTENSION IF NOT EXISTS btree_gin;            -- composite GIN indexes
CREATE EXTENSION IF NOT EXISTS vector;               -- pgvector for AI embeddings (recommendation engine)
CREATE EXTENSION IF NOT EXISTS citext;                -- case-insensitive email storage

-- Reusable enum types -------------------------------------------------------
CREATE TYPE traveler_pace AS ENUM ('relaxed', 'moderate', 'fast');
CREATE TYPE budget_tier AS ENUM ('budget', 'mid_range', 'luxury');
CREATE TYPE item_type AS ENUM ('activity', 'hotel', 'restaurant', 'transport', 'festival', 'wildlife', 'free_time');
CREATE TYPE itinerary_status AS ENUM ('draft', 'ai_generated', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE difficulty_level AS ENUM ('easy', 'moderate', 'difficult', 'extreme');
CREATE TYPE transport_mode_enum AS ENUM ('bus', 'train', 'boat', 'taxi', 'flight', 'auto_rickshaw', 'ferry', 'houseboat');
CREATE TYPE pricing_entity_type AS ENUM ('hotel_room', 'activity', 'transport_route', 'restaurant_slot');

-- updated_at trigger helper --------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. GEOGRAPHY / CORE REFERENCE
-- ============================================================================

CREATE TABLE regions (
    region_id       SMALLSERIAL PRIMARY KEY,
    name            TEXT NOT NULL UNIQUE,          -- e.g. North Kerala, Central Kerala, South Kerala
    description     TEXT
);

CREATE TABLE districts (
    district_id     SMALLSERIAL PRIMARY KEY,
    region_id       SMALLINT NOT NULL REFERENCES regions(region_id) ON DELETE RESTRICT,
    name            TEXT NOT NULL UNIQUE,          -- e.g. Ernakulam, Idukki, Wayanad
    geom            GEOGRAPHY(MULTIPOLYGON, 4326),
    headquarters    TEXT
);
CREATE INDEX idx_districts_geom ON districts USING GIST (geom);
CREATE INDEX idx_districts_region ON districts (region_id);

CREATE TABLE destination_categories (
    category_id     SMALLSERIAL PRIMARY KEY,
    name            TEXT NOT NULL UNIQUE,          -- beach, hill_station, backwater, heritage, wildlife, pilgrimage
    icon            TEXT
);

CREATE TABLE destinations (
    destination_id      BIGSERIAL PRIMARY KEY,
    district_id          SMALLINT NOT NULL REFERENCES districts(district_id) ON DELETE RESTRICT,
    name                  TEXT NOT NULL,
    slug                  TEXT NOT NULL UNIQUE,
    geom                  GEOGRAPHY(POINT, 4326) NOT NULL,
    description           TEXT,
    avg_visit_duration_minutes INTEGER DEFAULT 120,
    entry_fee_inr         NUMERIC(10,2) DEFAULT 0,
    popularity_score      NUMERIC(5,2) DEFAULT 0,     -- maintained by AI ranking job
    altitude_m            INTEGER,
    is_active             BOOLEAN NOT NULL DEFAULT TRUE,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_destinations_geom ON destinations USING GIST (geom);
CREATE INDEX idx_destinations_district ON destinations (district_id);
CREATE INDEX idx_destinations_name_trgm ON destinations USING GIN (name gin_trgm_ops);
CREATE INDEX idx_destinations_popularity ON destinations (popularity_score DESC) WHERE is_active;
CREATE TRIGGER trg_destinations_updated BEFORE UPDATE ON destinations
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE destination_category_map (
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    category_id     SMALLINT NOT NULL REFERENCES destination_categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (destination_id, category_id)
);
CREATE INDEX idx_dcm_category ON destination_category_map (category_id);

CREATE TABLE destination_images (
    image_id        BIGSERIAL PRIMARY KEY,
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    url             TEXT NOT NULL,
    is_primary      BOOLEAN NOT NULL DEFAULT FALSE,
    alt_text        TEXT
);
CREATE INDEX idx_dest_images_dest ON destination_images (destination_id);

-- ============================================================================
-- 2. SEASONS, WEATHER & CLIMATE HISTORY
-- ============================================================================

CREATE TABLE seasons (
    season_id       SMALLSERIAL PRIMARY KEY,
    name            TEXT NOT NULL UNIQUE,      -- Monsoon, Post-Monsoon, Winter, Summer
    start_month     SMALLINT NOT NULL CHECK (start_month BETWEEN 1 AND 12),
    end_month       SMALLINT NOT NULL CHECK (end_month BETWEEN 1 AND 12),
    description     TEXT
);

CREATE TABLE destination_seasonality (
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    season_id       SMALLINT NOT NULL REFERENCES seasons(season_id) ON DELETE CASCADE,
    crowd_level     SMALLINT NOT NULL CHECK (crowd_level BETWEEN 1 AND 5),
    recommended     BOOLEAN NOT NULL DEFAULT TRUE,
    notes           TEXT,
    PRIMARY KEY (destination_id, season_id)
);

CREATE TABLE weather_stations (
    station_id      SMALLSERIAL PRIMARY KEY,
    district_id     SMALLINT NOT NULL REFERENCES districts(district_id) ON DELETE RESTRICT,
    name            TEXT NOT NULL,
    geom            GEOGRAPHY(POINT, 4326) NOT NULL,
    provider        TEXT                         -- e.g. IMD station code
);
CREATE INDEX idx_weather_stations_geom ON weather_stations USING GIST (geom);

-- Live/near-real-time weather feed (high write volume, short retention)
CREATE TABLE weather_current (
    station_id      SMALLINT NOT NULL REFERENCES weather_stations(station_id) ON DELETE CASCADE,
    recorded_at     TIMESTAMPTZ NOT NULL,
    temp_c          NUMERIC(4,1),
    humidity_pct    NUMERIC(4,1),
    rainfall_mm     NUMERIC(6,2),
    wind_speed_kmh  NUMERIC(5,1),
    condition       TEXT,
    PRIMARY KEY (station_id, recorded_at)
) PARTITION BY RANGE (recorded_at);
CREATE TABLE weather_current_2026_07 PARTITION OF weather_current
    FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE weather_current_2026_08 PARTITION OF weather_current
    FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE INDEX idx_weather_current_station_time ON weather_current (station_id, recorded_at DESC);

-- Long-term climate history — append-only, ideal for BRIN indexing
CREATE TABLE climate_history (
    station_id      SMALLINT NOT NULL REFERENCES weather_stations(station_id) ON DELETE CASCADE,
    record_date     DATE NOT NULL,
    min_temp_c      NUMERIC(4,1),
    max_temp_c      NUMERIC(4,1),
    rainfall_mm     NUMERIC(6,2),
    humidity_avg_pct NUMERIC(4,1),
    PRIMARY KEY (station_id, record_date)
) PARTITION BY RANGE (record_date);
CREATE TABLE climate_history_pre2026 PARTITION OF climate_history
    FOR VALUES FROM (MINVALUE) TO ('2026-01-01');
CREATE TABLE climate_history_2026 PARTITION OF climate_history
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
CREATE INDEX idx_climate_history_brin ON climate_history USING BRIN (record_date);

-- ============================================================================
-- 3. ACTIVITIES & ADVENTURE
-- ============================================================================

CREATE TABLE activity_categories (
    activity_category_id SMALLSERIAL PRIMARY KEY,
    name                  TEXT NOT NULL UNIQUE      -- trekking, houseboat, ayurveda, cultural, water_sports
);

CREATE TABLE activities (
    activity_id         BIGSERIAL PRIMARY KEY,
    destination_id      BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    activity_category_id SMALLINT NOT NULL REFERENCES activity_categories(activity_category_id),
    name                 TEXT NOT NULL,
    description          TEXT,
    difficulty           difficulty_level NOT NULL DEFAULT 'easy',
    duration_minutes     INTEGER NOT NULL DEFAULT 60,
    base_price_inr       NUMERIC(10,2) NOT NULL DEFAULT 0,
    min_age              SMALLINT DEFAULT 0,
    max_group_size        SMALLINT,
    is_active            BOOLEAN NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_activities_destination ON activities (destination_id);
CREATE INDEX idx_activities_category ON activities (activity_category_id);
CREATE INDEX idx_activities_name_trgm ON activities USING GIN (name gin_trgm_ops);

-- Adventure activities extend activities 1:1 with adventure-specific attributes
CREATE TABLE adventure_activities (
    activity_id          BIGINT PRIMARY KEY REFERENCES activities(activity_id) ON DELETE CASCADE,
    risk_level            difficulty_level NOT NULL DEFAULT 'moderate',
    equipment_required     TEXT[],
    certified_operator_required BOOLEAN NOT NULL DEFAULT FALSE,
    season_id              SMALLINT REFERENCES seasons(season_id),
    min_fitness_level       SMALLINT CHECK (min_fitness_level BETWEEN 1 AND 5),
    insurance_required       BOOLEAN NOT NULL DEFAULT FALSE
);

-- ============================================================================
-- 4. HOTELS & DYNAMIC PRICING SUPPORT
-- ============================================================================

CREATE TABLE hotels (
    hotel_id        BIGSERIAL PRIMARY KEY,
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    geom            GEOGRAPHY(POINT, 4326) NOT NULL,
    star_rating     SMALLINT CHECK (star_rating BETWEEN 1 AND 5),
    address         TEXT,
    amenities       JSONB NOT NULL DEFAULT '{}',
    contact_phone   TEXT,
    contact_email   TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_hotels_geom ON hotels USING GIST (geom);
CREATE INDEX idx_hotels_destination ON hotels (destination_id);
CREATE INDEX idx_hotels_amenities ON hotels USING GIN (amenities);
CREATE INDEX idx_hotels_name_trgm ON hotels USING GIN (name gin_trgm_ops);

CREATE TABLE room_types (
    room_type_id    BIGSERIAL PRIMARY KEY,
    hotel_id        BIGINT NOT NULL REFERENCES hotels(hotel_id) ON DELETE CASCADE,
    name            TEXT NOT NULL,               -- Deluxe, Suite, Cottage
    capacity        SMALLINT NOT NULL DEFAULT 2,
    base_price_inr  NUMERIC(10,2) NOT NULL
);
CREATE INDEX idx_room_types_hotel ON room_types (hotel_id);

-- Date-partitioned price/availability calendar — powers dynamic pricing
CREATE TABLE hotel_price_calendar (
    room_type_id    BIGINT NOT NULL REFERENCES room_types(room_type_id) ON DELETE CASCADE,
    stay_date       DATE NOT NULL,
    price_inr       NUMERIC(10,2) NOT NULL,
    rooms_available SMALLINT NOT NULL DEFAULT 0,
    demand_index    NUMERIC(5,2) DEFAULT 1.0,     -- multiplier fed by pricing engine
    PRIMARY KEY (room_type_id, stay_date)
) PARTITION BY RANGE (stay_date);
CREATE TABLE hotel_price_calendar_2026 PARTITION OF hotel_price_calendar
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
CREATE TABLE hotel_price_calendar_2027 PARTITION OF hotel_price_calendar
    FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');
CREATE INDEX idx_hotel_price_cal_date ON hotel_price_calendar (stay_date);

-- ============================================================================
-- 5. RESTAURANTS
-- ============================================================================

CREATE TABLE restaurants (
    restaurant_id   BIGSERIAL PRIMARY KEY,
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    geom            GEOGRAPHY(POINT, 4326) NOT NULL,
    cuisine_types   TEXT[] NOT NULL DEFAULT '{}',
    price_range     budget_tier NOT NULL DEFAULT 'mid_range',
    avg_rating      NUMERIC(3,2) DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE INDEX idx_restaurants_geom ON restaurants USING GIST (geom);
CREATE INDEX idx_restaurants_destination ON restaurants (destination_id);
CREATE INDEX idx_restaurants_cuisine ON restaurants USING GIN (cuisine_types);

-- ============================================================================
-- 6. TRANSPORT
-- ============================================================================

CREATE TABLE transport_hubs (
    hub_id          BIGSERIAL PRIMARY KEY,
    destination_id  BIGINT REFERENCES destinations(destination_id) ON DELETE SET NULL,
    name            TEXT NOT NULL,
    mode            transport_mode_enum NOT NULL,
    geom            GEOGRAPHY(POINT, 4326) NOT NULL
);
CREATE INDEX idx_transport_hubs_geom ON transport_hubs USING GIST (geom);

CREATE TABLE transport_routes (
    route_id        BIGSERIAL PRIMARY KEY,
    mode            transport_mode_enum NOT NULL,
    origin_hub_id   BIGINT NOT NULL REFERENCES transport_hubs(hub_id) ON DELETE CASCADE,
    dest_hub_id     BIGINT NOT NULL REFERENCES transport_hubs(hub_id) ON DELETE CASCADE,
    distance_km     NUMERIC(7,2),
    duration_minutes INTEGER,
    operator        TEXT,
    base_fare_inr   NUMERIC(10,2),
    CHECK (origin_hub_id <> dest_hub_id)
);
CREATE INDEX idx_transport_routes_origin ON transport_routes (origin_hub_id);
CREATE INDEX idx_transport_routes_dest ON transport_routes (dest_hub_id);

CREATE TABLE transport_schedules (
    schedule_id     BIGSERIAL PRIMARY KEY,
    route_id        BIGINT NOT NULL REFERENCES transport_routes(route_id) ON DELETE CASCADE,
    departure_time  TIME NOT NULL,
    arrival_time    TIME NOT NULL,
    days_of_week    SMALLINT[] NOT NULL DEFAULT '{1,2,3,4,5,6,7}'  -- 1=Mon .. 7=Sun
);
CREATE INDEX idx_transport_schedules_route ON transport_schedules (route_id);

-- ============================================================================
-- 7. FESTIVALS
-- ============================================================================

CREATE TABLE festivals (
    festival_id     BIGSERIAL PRIMARY KEY,
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    month           SMALLINT CHECK (month BETWEEN 1 AND 12),
    day_start       SMALLINT,
    day_end         SMALLINT,
    is_lunar_calendar BOOLEAN NOT NULL DEFAULT FALSE,
    description     TEXT
);
CREATE INDEX idx_festivals_destination ON festivals (destination_id);
CREATE INDEX idx_festivals_month ON festivals (month);

-- ============================================================================
-- 8. WILDLIFE
-- ============================================================================

CREATE TABLE wildlife_sanctuaries (
    sanctuary_id    BIGSERIAL PRIMARY KEY,
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    area_sq_km      NUMERIC(10,2),
    geom            GEOGRAPHY(POLYGON, 4326),
    entry_fee_inr   NUMERIC(10,2) DEFAULT 0
);
CREATE INDEX idx_wildlife_sanctuaries_geom ON wildlife_sanctuaries USING GIST (geom);

CREATE TABLE species (
    species_id          BIGSERIAL PRIMARY KEY,
    name                TEXT NOT NULL,
    scientific_name     TEXT,
    conservation_status TEXT                       -- IUCN category
);

CREATE TABLE sanctuary_species_map (
    sanctuary_id        BIGINT NOT NULL REFERENCES wildlife_sanctuaries(sanctuary_id) ON DELETE CASCADE,
    species_id           BIGINT NOT NULL REFERENCES species(species_id) ON DELETE CASCADE,
    population_estimate   INTEGER,
    PRIMARY KEY (sanctuary_id, species_id)
);

-- ============================================================================
-- 9. USERS & PREFERENCES
-- ============================================================================

CREATE TABLE users (
    user_id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    email           CITEXT UNIQUE,
    phone           TEXT UNIQUE,
    home_location   GEOGRAPHY(POINT, 4326),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE user_preferences (
    user_id                 UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    travel_style             TEXT[],                 -- ['adventure','cultural','relaxation']
    budget_level             budget_tier NOT NULL DEFAULT 'mid_range',
    interests                TEXT[],
    dietary_restrictions     TEXT[],
    mobility_needs           TEXT,
    preferred_pace           traveler_pace NOT NULL DEFAULT 'moderate',
    preferred_group_size     SMALLINT DEFAULT 1,
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE user_trip_history (
    trip_history_id BIGSERIAL PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    visited_date    DATE NOT NULL,
    rating          SMALLINT CHECK (rating BETWEEN 1 AND 5)
);
CREATE INDEX idx_trip_history_user ON user_trip_history (user_id, visited_date DESC);
CREATE INDEX idx_trip_history_destination ON user_trip_history (destination_id);

-- ============================================================================
-- 10. ITINERARY ENGINE
-- ============================================================================

CREATE TABLE itineraries (
    itinerary_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title            TEXT,
    start_date       DATE NOT NULL,
    end_date         DATE NOT NULL,
    total_budget_inr NUMERIC(12,2),
    status           itinerary_status NOT NULL DEFAULT 'draft',
    generated_by_ai  BOOLEAN NOT NULL DEFAULT FALSE,
    ai_model_version_id BIGINT,                     -- FK added after ai_model_versions is created
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (end_date >= start_date)
);
CREATE INDEX idx_itineraries_user ON itineraries (user_id, created_at DESC);
CREATE INDEX idx_itineraries_status ON itineraries (status);
CREATE TRIGGER trg_itineraries_updated BEFORE UPDATE ON itineraries
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE itinerary_days (
    itinerary_day_id BIGSERIAL PRIMARY KEY,
    itinerary_id     UUID NOT NULL REFERENCES itineraries(itinerary_id) ON DELETE CASCADE,
    day_number       SMALLINT NOT NULL,
    day_date         DATE NOT NULL,
    destination_id   BIGINT REFERENCES destinations(destination_id) ON DELETE SET NULL,
    UNIQUE (itinerary_id, day_number)
);
CREATE INDEX idx_itinerary_days_itinerary ON itinerary_days (itinerary_id);

CREATE TABLE itinerary_items (
    itinerary_item_id BIGSERIAL PRIMARY KEY,
    itinerary_day_id  BIGINT NOT NULL REFERENCES itinerary_days(itinerary_day_id) ON DELETE CASCADE,
    item_type         item_type NOT NULL,
    ref_id            BIGINT NOT NULL,               -- polymorphic FK -> activities/hotels/restaurants/transport_routes/festivals/sanctuaries
    start_time        TIME,
    end_time          TIME,
    sequence_order    SMALLINT NOT NULL,
    estimated_cost_inr NUMERIC(10,2) DEFAULT 0,
    notes             TEXT,
    UNIQUE (itinerary_day_id, sequence_order)
);
CREATE INDEX idx_itinerary_items_day ON itinerary_items (itinerary_day_id);
CREATE INDEX idx_itinerary_items_ref ON itinerary_items (item_type, ref_id);

-- ============================================================================
-- 11. BUDGET PLANNER
-- ============================================================================

CREATE TABLE budget_categories (
    budget_category_id SMALLSERIAL PRIMARY KEY,
    name                TEXT NOT NULL UNIQUE           -- accommodation, food, transport, activities, misc
);

CREATE TABLE itinerary_budget (
    itinerary_id        UUID NOT NULL REFERENCES itineraries(itinerary_id) ON DELETE CASCADE,
    budget_category_id  SMALLINT NOT NULL REFERENCES budget_categories(budget_category_id),
    planned_amount_inr   NUMERIC(12,2) NOT NULL DEFAULT 0,
    actual_amount_inr    NUMERIC(12,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (itinerary_id, budget_category_id)
);

-- ============================================================================
-- 12. DISTANCE MATRIX & TRAVEL TIME MATRIX (precomputed, powers fast AI planning)
-- ============================================================================

CREATE TABLE distance_matrix (
    origin_destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    target_destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    distance_km             NUMERIC(8,2) NOT NULL,
    computed_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (origin_destination_id, target_destination_id),
    CHECK (origin_destination_id <> target_destination_id)
);
CREATE INDEX idx_distance_matrix_target ON distance_matrix (target_destination_id);

CREATE TABLE travel_time_matrix (
    origin_destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    target_destination_id  BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    mode                     transport_mode_enum NOT NULL,
    duration_minutes         INTEGER NOT NULL,
    traffic_factor           NUMERIC(4,2) NOT NULL DEFAULT 1.0,
    computed_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (origin_destination_id, target_destination_id, mode),
    CHECK (origin_destination_id <> target_destination_id)
);
CREATE INDEX idx_travel_time_matrix_target ON travel_time_matrix (target_destination_id);

-- ============================================================================
-- 13. PEAK CROWD PREDICTION
-- ============================================================================

CREATE TABLE crowd_predictions (
    destination_id           BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    predict_date              DATE NOT NULL,
    predicted_crowd_level      SMALLINT NOT NULL CHECK (predicted_crowd_level BETWEEN 1 AND 5),
    confidence_score            NUMERIC(4,3),
    model_version               TEXT NOT NULL,
    PRIMARY KEY (destination_id, predict_date)
) PARTITION BY RANGE (predict_date);
CREATE TABLE crowd_predictions_2026 PARTITION OF crowd_predictions
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
CREATE TABLE crowd_predictions_2027 PARTITION OF crowd_predictions
    FOR VALUES FROM ('2027-01-01') TO ('2028-01-01');
CREATE INDEX idx_crowd_predictions_date ON crowd_predictions (predict_date);

-- ============================================================================
-- 14. DYNAMIC PRICING SUPPORT (generic, covers hotels/activities/transport/restaurants)
-- ============================================================================

CREATE TABLE pricing_rules (
    pricing_rule_id BIGSERIAL PRIMARY KEY,
    entity_type     pricing_entity_type NOT NULL,
    entity_id       BIGINT NOT NULL,               -- polymorphic reference
    rule_type       TEXT NOT NULL,                 -- 'seasonal', 'demand', 'last_minute', 'early_bird', 'festival'
    multiplier      NUMERIC(5,3) NOT NULL DEFAULT 1.0,
    condition       JSONB NOT NULL DEFAULT '{}',
    valid_from      DATE NOT NULL,
    valid_to        DATE NOT NULL,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    CHECK (valid_to >= valid_from)
);
CREATE INDEX idx_pricing_rules_entity ON pricing_rules (entity_type, entity_id);
CREATE INDEX idx_pricing_rules_validity ON pricing_rules (valid_from, valid_to) WHERE is_active;

CREATE TABLE price_history (
    entity_type     pricing_entity_type NOT NULL,
    entity_id       BIGINT NOT NULL,
    price_date      DATE NOT NULL,
    price_inr       NUMERIC(10,2) NOT NULL,
    demand_index    NUMERIC(5,2) DEFAULT 1.0,
    PRIMARY KEY (entity_type, entity_id, price_date)
) PARTITION BY RANGE (price_date);
CREATE TABLE price_history_2026 PARTITION OF price_history
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
CREATE INDEX idx_price_history_brin ON price_history USING BRIN (price_date);

-- ============================================================================
-- 15. AI RECOMMENDATION ENGINE
-- ============================================================================

CREATE TABLE ai_model_versions (
    ai_model_version_id BIGSERIAL PRIMARY KEY,
    name                 TEXT NOT NULL,               -- 'itinerary_ranker', 'crowd_predictor'
    version               TEXT NOT NULL,
    deployed_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    metrics                JSONB DEFAULT '{}',
    is_active               BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (name, version)
);

ALTER TABLE itineraries
    ADD CONSTRAINT fk_itineraries_model_version
    FOREIGN KEY (ai_model_version_id) REFERENCES ai_model_versions(ai_model_version_id);

-- pgvector embeddings: 256-dim example, tune to your embedding model
CREATE TABLE user_embeddings (
    user_id         UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    embedding       VECTOR(256) NOT NULL,
    model_version   TEXT NOT NULL,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_user_embeddings_ann ON user_embeddings
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 200);

CREATE TABLE destination_embeddings (
    destination_id  BIGINT PRIMARY KEY REFERENCES destinations(destination_id) ON DELETE CASCADE,
    embedding       VECTOR(256) NOT NULL,
    model_version   TEXT NOT NULL,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_destination_embeddings_ann ON destination_embeddings
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE TABLE recommendation_logs (
    recommendation_id  BIGSERIAL NOT NULL,
    user_id             UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    destination_id       BIGINT NOT NULL REFERENCES destinations(destination_id) ON DELETE CASCADE,
    score                 NUMERIC(6,4) NOT NULL,
    ai_model_version_id    BIGINT NOT NULL REFERENCES ai_model_versions(ai_model_version_id),
    recommended_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    clicked                 BOOLEAN NOT NULL DEFAULT FALSE,
    booked                  BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (recommendation_id, recommended_at)   -- partition key must be part of the PK
) PARTITION BY RANGE (recommended_at);
CREATE TABLE recommendation_logs_2026_h1 PARTITION OF recommendation_logs
    FOR VALUES FROM ('2026-01-01') TO ('2026-07-01');
CREATE TABLE recommendation_logs_2026_h2 PARTITION OF recommendation_logs
    FOR VALUES FROM ('2026-07-01') TO ('2027-01-01');
CREATE INDEX idx_recommendation_logs_user ON recommendation_logs (user_id, recommended_at DESC);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
