# Google Drive Dataset Ingestion Report

Generated at: `2026-07-02 12:09:50`

## 1. Files Discovered
- `central_kerala_destinations.csv`
- `ernakulam_destinations.csv`
- `er_diagram_and_design_notes.md`
- `kerala_travel_platform_schema.sql`

## 2. Files Successfully Imported
- `central_kerala_destinations.csv` (Ingested into base relational tables)
- `ernakulam_destinations.csv` (Ingested into base relational tables)

## 3. Unsupported Files (Not Ingested)
The following architectural/schema reference documents are not database data files and were stored under `/import` without db write processing:
- `er_diagram_and_design_notes.md`
- `kerala_travel_platform_schema.sql`

## 4. Duplicate Files & Records
Total duplicate/redundant records identified: **18**

Duplicate details:
- Destination: **Fort Kochi** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Cherai Beach** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Mattancherry Palace (Dutch Palace)** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Jew Town & Paradesi Synagogue** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Marine Drive** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Bolgatty Palace** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Chottanikkara Bhagavathy Temple** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Hill Palace Museum** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Wonderla Kochi** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Thattekkad Bird Sanctuary** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Bhoothathankettu Dam** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Kalady** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Munambam Beach** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Paniyeli Poru** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Mangalavanam Bird Sanctuary** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Kumbalangi Village** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **Pallipuram Fort** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*
- Destination: **St. George Orthodox Church, Kadamattom** in file `ernakulam_destinations.csv` — *Reason: Duplicate of primary Central Kerala record (merged/ignored)*

## 5. Missing / Incomplete Information
No missing required information discovered in the parsed records.

## 6. Pipeline Verification
Ingestion executed successfully. Total new database rows: **62 destinations** across **4 districts**.
