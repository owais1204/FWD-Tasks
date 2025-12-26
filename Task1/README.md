# Task 1 — README

**Title**  
Colorful Intro / Profile Card (HTML + CSS)

**Questions / Description**  
Create a single, responsive intro/profile card that presents a title, short description, and a CTA button using semantic HTML and modern CSS.

**Aim**  
Build a centered, professional, and responsive card demonstrating CSS variables, spacing, shadows, and typography.

**Step by Step Procedure**  
1. Create `index.html` with a semantic structure: container → card → heading, paragraph, button.  
2. Link `styles.css`; define `:root` tokens (colors, radius, shadow).  
3. Center the card (`display:grid;place-items:center`) and limit width with `min()`/`clamp()`.  
4. Add hover elevation (small `transform` + `box-shadow`).  
5. Test responsiveness at ~1200px, 820px, 520px.

**Explanation of Concepts**  
- Semantic HTML improves accessibility/SEO.  
- CSS custom properties centralize theme values.  
- Fluid/responsive sizing with `clamp()` and `%`.  
- Hover transitions for visual affordance.

**Answers**  
Expected screen: a centered colorful card with heading, short text, and a “Get Started” button; scales neatly on mobile.

**Files & Hints**  
- Files: `index.html`, `styles.css`  
- Hints: Keep contrast ≥ 4.5:1; use `box-sizing: border-box`.

**Viva Questions & Answers**  
1. *Why semantic tags?* Better structure, accessibility, SEO.  
2. *What does `clamp()` do?* Constrains a value between min–max with a preferred middle.  
3. *Margin vs Padding?* Outer vs inner spacing.  
4. *Why CSS variables?* Reusable theme tokens.  
5. *What creates stacking context?* Positioning/transform/z-index.

**Outcome**  
A neat, responsive card showcasing core HTML/CSS layout skills.
