
================================================================================
v0.1.7 CHANGES
================================================================================

Fix: Sidebar layout — both Sidebar First and Sidebar Second were rendering
on the left side because the layout code put them both in a single <aside>
and used a single two-column grid with no concept of "right" vs "left".

OLD (broken): One <aside> containing both sidebars, grid class based on
which sidebar happened to be present, no true left/right distinction.

NEW (correct): Four explicit layout cases in page.html.twig:
  1. No sidebars        → full width (unchanged)
  2. Sidebar First only → LEFT sidebar | content (2-col grid)
  3. Sidebar Second only→ content | RIGHT sidebar (2-col grid)
  4. Both sidebars      → left | content | right (3-col grid)

CSS: Added .luna-layout-three-col for the 3-column case.
     Sidebar First always renders left, Sidebar Second always renders right.
     Both get sticky positioning on desktop viewports.
     Added min-width:0 to prevent grid blowout with long content.
