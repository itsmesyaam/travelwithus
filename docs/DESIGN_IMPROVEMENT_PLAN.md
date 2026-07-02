# Design Improvement Plan & Priorities — KeralaX AI

This document establishes a prioritized roadmap to remediate visual deficits, performance bottlenecks, and accessibility gaps before launching the application.

---

## 1. Prioritized Improvements List

### 🚨 Priority 1 (Critical) — Launch Blockers
1. **Frontend Code-Splitting**: Split the heavy admin and dashboard page routes using `React.lazy` to bring the core bundle chunk below the 500kB warning threshold.
2. **WCAG Color Contrast Fix**: Update light-mode emerald green text colors (`hsl(158, 64%, 32%)`) to a darker shade (`hsl(158, 64%, 20%)`) when overlaying white backgrounds, resolving accessibility contrast failure.
3. **Database Count Query Optimization**: Refactor database aggregate count queries in the seed/API routes to use standard grouping SQL statements rather than ORM iterating, avoiding N+1 performance lag.
4. **Keyboard Focus & Access Control**: Configure focus indicators (`ring-2 ring-emerald-500`) and key triggers (arrow key selection) on the custom dropdown filters in `ExplorePage.tsx`.

### ⚡ Priority 2 (Important) — High UX Value
1. **Interactive Map Scaling**: Restrict map grids on widescreen desktop views to a maximum scale of `1280px` to prevent card pixelation and layout stretching.
2. **Category Scroll Indicators**: Add visual fade gradients (left/right shadows) to the horizontal category scrollbar to indicate hidden content.
3. **Password Strength Indicators**: Implement security checks on the user signup registration form displaying active strength levels (weak, moderate, strong).
4. **AI Concierge Dynamic Interface**: Convert the static response templates on the destination details page sidebar to support real-time user-input prompts.

### 🌟 Priority 3 (Nice to Have) — Aesthetic Polish
1. **Traveler Statistics Widgets**: Add dynamic counters (e.g. "Total Distance Planned", "Favorite Region") to the user profile dashboard.
2. **Social Media Sharing Blocks**: Add one-click social share links for saved itineraries and travel blog posts.
3. **Placeholder Skeleton Cards**: Render shimmer loading card skeletons in `ExplorePage.tsx` during dynamic API fetches to improve perceived performance.

---

## 2. Testing & Verification Checklist
Once the improvements are implemented:
- Run `npm run build` in the `frontend/` directory to verify the bundle sizes.
- Execute Lighthouse scans to verify a11y scores reach >95.
- Query API latency metrics under concurrent load test scripts to confirm sub-100ms response targets.
