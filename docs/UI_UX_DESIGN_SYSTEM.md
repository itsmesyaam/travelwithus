# UI/UX Design System — TravelWithUs AI Platform

This document outlines the UI tokens, visual guidelines, layout components, and animation patterns for the TravelWithUs platform. It draws inspiration from Apple’s clean spatial aesthetics, Airbnb’s card-driven clarity, and the natural tones of Kerala.

---

## 1. Core Visual Tones (Color Palette)

### 🌿 Forest Greens (Brand Spine)
- **Forest Emerald**: `hsl(158, 64%, 32%)` — Primary buttons, active highlights, success badges.
- **Teal Mint**: `hsl(168, 76%, 42%)` — Gradients, accents, hover overlays.
- **Sage Mist**: `hsl(150, 24%, 96%)` — Light mode secondary backgrounds.

### 🏖️ Sand & Spice (Accents)
- **Warm Sand**: `hsl(38, 48%, 92%)` — Decorative borders, warm cards, light background tints.
- **Sunset Gold**: `hsl(42, 94%, 55%)` — Rating stars, spotlight highlights, trending indicators.

### 🌌 Base Slate (Neutral Tones)
- **Light Theme Background**: `hsl(0, 0%, 100%)` (White) and `hsl(210, 20%, 98%)` (Soft grey).
- **Dark Theme Background**: `hsl(220, 30%, 6%)` (Deep navy midnight) and `hsl(220, 26%, 10%)` (Slate dark).
- **Text Primary**: `hsl(215, 28%, 17%)` (Light mode), `hsl(210, 20%, 96%)` (Dark mode).

---

## 2. Typography & Hierarchy
- **Font Family**: `Inter, system-ui, sans-serif` (Premium Google Font, anti-aliased).
- **Size Scale**:
  - **Display (Hero)**: `4.5rem` / `72px` (Tracking tight, boldest)
  - **H1 (Header)**: `3.0rem` / `48px` (Tracking tight, bold)
  - **H2 (Section Header)**: `2.0rem` / `32px` (Semi-bold)
  - **Body (Text)**: `1.0rem` / `16px` (Line height `1.625` for optimal reading)
  - **Meta (Label)**: `0.75rem` / `12px` (Tracking wide, uppercase, bold)

---

## 3. Layout Grid & Spacing System
- **Grid Layout**: 12-column grid layout for page designs, with `1.5rem` / `24px` gutter gaps.
- **Container limits**: Maximum layout width set to `1280px` (`max-w-7xl`).
- **Responsive Gaps**:
  - `4px` (xs), `8px` (sm), `16px` (md), `24px` (lg), `48px` (xl)

---

## 4. Apple-Inspired Glassmorphism Rules
To create high-end visual depth, use the following translucent layouts:

### Light Theme Glass (`.glass`)
- **Background**: `rgba(255, 255, 255, 0.45)`
- **Border**: `1px solid rgba(255, 255, 255, 0.4)`
- **Blur**: `backdrop-filter: blur(20px)`
- **Shadow**: `0 8px 32px 0 rgba(31, 38, 135, 0.04)`

### Dark Theme Glass (`.glass-dark`)
- **Background**: `rgba(15, 23, 42, 0.45)`
- **Border**: `1px solid rgba(255, 255, 255, 0.05)`
- **Blur**: `backdrop-filter: blur(20px)`
- **Shadow**: `0 8px 32px 0 rgba(0, 0, 0, 0.3)`

---

## 5. UI Elements

### Buttons
- **Primary Buttons**: Emerald green to teal gradient, fully rounded (`rounded-full`), smooth transitions:
  ```css
  background: linear-gradient(to right, hsl(158, 64%, 32%), hsl(168, 76%, 42%));
  ```
- **Secondary Buttons**: Transparent backgrounds, bordered by thin lines, highlighting soft hover fills.

### Cards
- **Hover Lift**: Every card component must use smooth scaling transformations (`scale-101`) and shadows offset updates on mouse-overs to mimic physical lifting.
- **Radii**: Card corners use a wide radius of `24px` (`rounded-3xl`) to present modern softness.

---

## 6. Motion & Micro-Animations

### Animation Keys
- **Float**: Continuous subtle translateY offset translations (`-4px` to `4px`) for floating orbs.
- **Shimmer**: Infinite gradients shift animations for loading skeleton templates.
- **Fade-In-Up**: Clean route transitions translating elements upward during entry:
  ```css
  transform: translateY(20px); opacity: 0; -> transform: translateY(0); opacity: 1;
  ```

---

## 7. Responsive Breakpoints
- **Mobile**: `< 640px` (Stack details vertically, slide-out hamburger navigation).
- **Tablet (md)**: `768px` (2-column grids, inline navigation tabs).
- **Desktop (lg)**: `1024px` (3 or 4-column grids, full navigation headers).
- **Wide Desktop (xl)**: `1280px` (Container max constraints).
