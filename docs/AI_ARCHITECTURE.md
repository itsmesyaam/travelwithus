# AI Layer Architecture — KeralaX Platform

This document describes the design of the KeralaX AI layer, which orchestrates route optimization, nearest-neighbor vector recommendations, weather-aware scheduling, and model provider abstraction.

---

## 1. Provider Abstraction Layer (Dynamic Model Routing)

To prevent vendor lock-in, all AI requests are routed through a **Model Abstraction Interface** (`LLMService`). The platform can switch between providers (OpenAI, Gemini, Anthropic, or local open-source models) via environment configurations without modifying application code.

```
                  ┌──────────────────────┐
                  │      LLMService      │
                  └──────────┬───────────┘
                             │ (Config)
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
     ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
     │  OpenAIProvider│  │ GeminiProvider │  │AnthropicProvider│
     └─────────────┘  └─────────────┘  └─────────────┘
```

### Abstraction Interface Layout
```python
class LLMProvider(ABC):
    @abstractmethod
    async def generate_itinerary(self, prompt: str, schema: dict) -> dict:
        pass

class LLMService:
    def __init__(self, provider_name: str):
        self.provider = ProviderFactory.get(provider_name)
```

---

## 2. Recommendation Engine & Vector Embeddings

### Vector Strategy (pgvector)
- **Embedding Generation**: Text representations of user travel preferences and destination highlights are passed through the `text-embedding-3-small` or `text-multilingual-embedding-002` models to produce **1536-dimensional vectors**.
- **Vector Storage**: Embeddings are stored in the database using the `vector` (pgvector) extension:
  - `user_embeddings` (representing short-term and long-term interest vectors).
  - `destination_embeddings` (representing destination description and activity vectors).
- **Matching Search**: Retrieve matching spots via cosine distance operations:
  ```sql
  SELECT destination_id, (embedding <=> :user_vector) AS distance 
  FROM destination_embeddings 
  ORDER BY distance ASC LIMIT 10;
  ```
- **Performance**: Build `IVFFlat` or `HNSW` vector indexes on embedding tables to maintain sub-100ms queries.

---

## 3. RAG (Retrieval-Augmented Generation) Architecture
To ensure zero-hallucination planning:
1. **Retrieve**: Query the database using filters (district, region, budget) and vector embeddings to extract candidates.
2. **Augment**: Assemble candidate descriptions, activities, hotels, and current weather constraints into a structured prompt context.
3. **Generate**: Request the LLM to sequence the travel itinerary matching the context schema.

---

## 4. Intelligent Context Features

### Weather-Aware & Seasonal Scheduling
- **Weather Feed**: Check current forecast data from `weather_current` table prior to itinerary construction.
- **Rules Engine**:
  - If current monsoon metrics exceed threshold (heavy rainfall > 50mm), the generator automatically replaces waterfalls and outdoor treks with indoor museums, heritage walks, or culinary activities.
  - If season is winter, prioritize scenic hill-stations. If summer, prioritize beach, backwater, or indoor spice tours.

### Budget Optimizer
- Calculates estimated pricing for hotels, transport routes, and activity entry fees using the `itinerary_budget` schema.
- Employs a linear cost-bound adjustment:
  - If user selects "Budget", the optimizer selects hostels/homestays, routes via public transport (bus/train), and selects low-entry-fee activities.
  - If "Luxury", the optimizer swaps in premium resorts, private vehicle routes, and expensive houseboat cruises.

---

## 5. Future Voice & Multilingual Roadmaps

### Multilingual Translation
- Keep database tables schema content in English.
- Use the Abstraction Layer or translation services to dynamically localize the generated itineraries into German, French, Arabic, Hindi, or Malayalam at the API output boundary.

### Voice Integration
- Expose streaming websockets on `/api/speech/chat`.
- Read user vocal queries, run Speech-to-Text translation (Whisper API), pipeline the text query to the RAG planner, and convert response text back to voice streams (text-to-speech).
