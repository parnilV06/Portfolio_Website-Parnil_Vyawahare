# Parnil Portfolio Design System

**Status:** Established for future portfolio implementation. This document does not change the current rendered website.

## Identity and direction

The portfolio belongs to **Parnil** — a Computer Science student, full-stack developer, and product builder.

The intended direction is minimal, mature, technical, editorial, interactive, confident, modern, slightly experimental, and premium without being flashy. The core idea is:

> Minimal editorial design + physical/interactive objects + modern developer identity.

Interest should come from typography, composition, physical depth, interaction, subtle motion, and carefully chosen visual metaphors — not excessive decoration. The website must avoid generic developer-portfolio styling, cyberpunk, sci-fi, gaming, and futuristic HUD patterns.

## Color tokens

| Token | Value | Intended use |
| --- | --- | --- |
| Matte black | `#080808` | Primary background |
| Charcoal | `#111111` | Secondary background |
| Elevated 1 | `#151515` | Elevated surfaces |
| Elevated 2 | `#1B1B1B` | Elevated surfaces |
| Off-white | `#F2F2EE` | Primary text |
| Secondary text | `#A6A6A6` | Supporting text |
| Muted text | `#6F6F6F` | Muted metadata |
| Cyan | `#00FFF5` | Sparse active, hover, selected, feedback, and interaction accents |

Cyan is a restrained accent on a predominantly monochromatic interface. Do not use pervasive glow, large cyan gradients, or neon UI. Do not introduce additional major accent colors without a later explicit decision.

## Typography

Use a clean modern sans-serif for navigation, body copy, metadata, buttons, labels, and technical text. Use a refined serif or italic serif selectively for emphasis, individual words in large headings, and editorial contrast. Do not use the serif everywhere or make every section an oversized editorial headline.

Hierarchy:

1. **Display** — large expressive type, primarily for the hero and important introductions.
2. **Heading** — clear section headings.
3. **Subheading** — supporting information.
4. **Body** — concise readable copy.
5. **Metadata** — small uppercase or monospace-like technical labels where useful.

Avoid excessive uppercase and decorative typography that does not communicate information.

## Layout and surfaces

- Use generous whitespace, strong alignment, consistent horizontal margins, clear grid relationships, and restrained borders.
- Use asymmetric compositions when they improve hierarchy or interaction.
- Preserve visual hierarchy on mobile rather than mechanically stacking desktop elements.
- Empty space is intentional; do not fill it with decorative elements.
- Borders are thin, subtle, and low contrast unless a physical object needs stronger edges for depth.
- Avoid excessive rounded cards. Not every content group needs a card.

## Physicality and depth

Physical-looking digital objects are defining portfolio elements. Use layered surfaces, subtle perspective, realistic depth, restrained shadows, and raised/pressed states. Every object needs a conceptual relationship with its section:

- Keyboard → navigation and portfolio
- Folders/archive → projects
- Other sections → distinct visual treatments, not repeated folder metaphors

## Motion

Motion should be smooth, intentional, physical, responsive, and restrained. Prefer subtle hover movement, press/release interactions, gentle transitions, opacity changes, small translations, subtle parallax, and cursor-reactive backgrounds where appropriate.

Avoid bouncing, constant movement, flashy transitions, unnecessary spinning, aggressive particles, and animation without interaction or metaphorical purpose. Always support reduced motion.

## Backgrounds

Background effects may include extremely subtle particle fields, faint dot grids, soft cursor-reactive distortion, barely visible grain, thin animated curves, or restrained radial lighting. They should recede while reading and never compete with typography, project information, navigation, or interactive objects.

## Interaction language

Interactive elements should feel physical and deliberate:

- Keyboard keys: subtle hover response, physical depression on press, restrained cyan active feedback.
- Project folders: subtle lift/shift on hover, clear selected state, smooth opening.
- Buttons: clear hover state with subtle movement or accent change, no excessive glow.
- Links: clear but restrained hover feedback.

Use one consistent interaction language across the site. All interactions must remain keyboard accessible and usable without motion.

## Content principles

Visible copy must be concise, meaningful, and factual. Do not add filler, motivational slogans, fake statistics, unnecessary labels, decorative short verbs, generic AI-sounding descriptions, or invented claims. Content should communicate real information about Parnil, his work, experience, education, skills, and process as those details become available.

## Section intentions

These are future design intentions only; they are not implemented by this setup task.

- **Hero:** strongest visual moment, centered on the existing physical keyboard concept.
- **About:** restrained editorial personal-information layout.
- **Education:** clean, information-focused presentation.
- **Skills:** typography and interaction based; no technology-logo wall.
- **Featured projects:** physical folder/archive interaction for 4–5 selected projects.
- **All projects:** separate scalable folder-inspired gallery for many projects.
- **Experience:** timeline or structured information with a subtle background treatment, not another folder metaphor.
- **Process:** accessible from the keyboard through a modal or popover.
- **Resume:** accessible from the keyboard through a modal or popover.
- **Contact:** strong but minimal CTA with social links and restrained background animation.
- **Footer:** extremely minimal name, short statement, and social links.

## Do-not list

Do not add cyberpunk styling, excessive neon, glowing borders everywhere, futuristic HUDs, terminal windows, floating dashboards, random 3D objects, random cards, excessive glassmorphism, excessive gradients, excessive particles, decorative slogans, filler copy, unnecessary statistics, technology-logo walls, excessive pills, excessive rounded cards, generic AI portfolio sections, unnecessary headings, repeated hero-style typography, or visual elements without a conceptual purpose.

If an element does not improve information, interaction, hierarchy, or the visual metaphor, it probably does not belong.

## Implementation rule

This document is the design-system source of truth for subsequent portfolio work. The existing website UI/UX, JSX/TSX, CSS, Tailwind configuration, assets, copy, layout, colors, typography, animations, interactions, components, and navigation were intentionally left unchanged during this setup task.
