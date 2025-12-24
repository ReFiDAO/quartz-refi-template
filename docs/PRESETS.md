# Presets Library (Themes + Layouts + Elements)

This template includes **presets**: curated combinations of theme tokens, layout configuration, optional component overrides, and starter content.

Presets are selected during `npm run setup`.

## What is a preset?

A preset can change:
- **Theme**: `quartz/styles/custom.scss` (tokens + styles)
- **Quartz config**: `quartz.config.ts` (colors, typography, plugins defaults)
- **Layout**: `quartz.layout.ts` (header/footer composition)
- **Components**: optional overrides in `quartz/components/` (e.g., `Profile.tsx`)
- **Starter content**: `content/index.md`

## Available presets

### `refibcn_toolkit` — ReFi BCN Toolkit (blue)

- **Best for**: local node sites that want a crisp “toolkit” look with strong borders and a fixed header.
- **Theme**: blue accent tokens on warm sand background.
- **Layout**: standard header/footer (optionally adds LanguageSwitcher when multilang is enabled).

### `refiprovence_toolkit` — ReFi Provence Toolkit (blue)

- **Best for**: small local nodes; currently the same “toolkit” structure as BCN.
- **Theme**: blue accent tokens on warm sand background.
- **Layout**: standard header/footer (optionally adds LanguageSwitcher when multilang is enabled).

### `refimediterranean_ocean` — ReFi Mediterranean (ocean)

- **Best for**: regional node sites with a coastal/ocean identity.
- **Theme**: ocean palette (deep blue → aqua) + warm gold accent.
- **Layout**: standard header/footer (optionally adds LanguageSwitcher when multilang is enabled).

### `regenerant_green_program` — Regenerant (green program)

- **Best for**: program/grants sites with structured navigation and wider content width.
- **Theme**: green accent tokens + optional partner accent tokens.
- **Components**: includes a `Body.tsx` override that is “carousel-ready” (loads `carousel.inline.ts` if a carousel exists in content).

### `refidao_dark_gradient` — ReFi DAO (dark gradient)

- **Best for**: network-level portals that want dark-by-default styling and a rich header.
- **Theme**: forces dark mode + gradient tokens.
- **Components**: adds a `Profile` dropdown menu component used in the header.

## Where presets live in the template repo

- Presets: `packages/presets/*`
- Shared elements: `packages/elements/*`













