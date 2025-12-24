# Central Feature Library

This library indexes all modular components, behaviors, and packages available in the `quartz-refi-template`. Use this as a reference when building your site.

---

## 1. Modular Packages

These are functional modules that can be added or removed during the setup process.

| Package | Purpose | Status | Documentation |
|---------|---------|--------|---------------|
| **Core** | Essential Quartz framework and base config. | Required | [PACKAGES.md#core-package](PACKAGES.md#core-package) |
| **Theme** | CSS variables, typography, and responsive patterns. | Required | [PACKAGES.md#theme-package](PACKAGES.md#theme-package) |
| **Multilang** | Multi-language support and LanguageSwitcher. | Optional | [packages/multilang/README.md](../packages/multilang/README.md) |
| **Analytics** | Plausible Analytics integration. | Optional | [packages/analytics/README.md](../packages/analytics/README.md) |
| **Comments** | Giscus (GitHub Discussions) integration. | Optional | [packages/comments/README.md](../packages/comments/README.md) |
| **OG Images** | Automatic social media image generation. | Optional | [packages/og-images/README.md](../packages/og-images/README.md) |

---

## 2. UI Elements & Sections

Use these CSS classes in your Markdown files to build structured pages. All elements automatically use your site's accent colors.

### Layout Primitives
*   `.section-container`: A standard vertical section with a top border.
*   `.section-container-tinted`: A section with a light accent background.
*   `.section-content-centered`: Centers content within the site's max-width.
*   `.section-content-wide`: A slightly wider centered container.

### Interactive Components
*   `.cta-button`: A professional, bordered button that inverts colors on hover.
*   `.two-col-grid`: A responsive 2-column grid that stacks on mobile.
*   `.three-col-grid`: A responsive 3-column grid that stacks on mobile.
*   `.grid-item`: A bordered card container for grid items.

### Hero Patterns
*   `.hero-section`: Container for the homepage hero.
*   `.hero-content`: Inner container for hero text and CTAs.
*   `.hero-text`: Large, readable subtitle for the hero.
*   `.hero-cta`: Flex container for hero buttons.

For implementation examples, see: [docs/ELEMENTS-CATALOG.md](ELEMENTS-CATALOG.md)

---

## 3. Intelligence Layer (AI Modules)

These modules are designed for **Pathway C (AI-Augmented)** operators using Cursor.

| Module | Purpose | File Path |
|--------|---------|-----------|
| **Project Overview** | Core context about the node's mission and team. | `.cursorrules/project-overview.mdc` |
| **Site Customization** | Guidance on design patterns and theme colors. | `.cursorrules/site-customization.mdc` |
| **Upstream Sync** | Instructions for pulling updates from the template. | `.cursorrules/upstream-sync.mdc` |
| **Module Index** | (New) Helps AI navigate this modular library. | `.cursorrules/module-index.mdc` |

---

## 4. Presets (Starter Kits)

Presets provide pre-configured combinations of colors, layout, and starter content.

*   **Ocean Blue**: Professional and calm (ReFi BCN).
*   **Forest Green**: Ecological and grounded (Regenerant Catalunya).
*   **Mediterranean**: Warm and coastal (ReFi Mediterranean).
*   **Earth Tones**: Organic and rooted.
*   **Sunset**: Energetic and welcoming.

See: [docs/PRESETS.md](PRESETS.md)

---
*Questions about a feature? Check the [Discussions](https://github.com/ReFiDAO/quartz-refi-template/discussions).*


