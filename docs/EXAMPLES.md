# Example Implementations

This document showcases websites built using the Quartz ReFi Template, serving as reference implementations for future node websites.

## ReFi Mediterranean

**Complete questionnaire-based implementation** - A comprehensive regional node website built following the full questionnaire workflow.

### Overview

- **Repository**: https://github.com/ReFiDAO/ReFi-Mediterranean
- **Live Site**: https://refidao.github.io/ReFi-Mediterranean
- **Questionnaire**: See `docs/QUESTIONNAIRE.md` in repository
- **Implementation Date**: December 2024

### Key Features

- **9 Pages**: Homepage, About, Vision, Nodes & Partners, Initiatives, Events, Resources, Get Involved, Contact
- **Theme**: Mediterranean Ocean preset with Classic & Professional typography (Merriweather/Source Serif)
- **Multi-Language**: EN/ES/IT configured (English complete, others as placeholders)
- **Deployment**: GitHub Pages at `refidao.github.io/ReFi-Mediterranean`

### Implementation Highlights

#### Configuration

- **Base URL**: `refidao.github.io/ReFi-Mediterranean` (GitHub Pages)
- **Typography**: Merriweather (headers) + Source Serif Pro (body)
- **Colors**: Mediterranean ocean palette (deep blue → aqua + warm gold)
- **Navigation**: About, Vision, Nodes & Partners, Initiatives, Get Involved, Contact

#### Content Structure

**Homepage Sections:**
- Hero with title "A bioregional node for holistic regeneration"
- What We Do (6 activities: Funding rounds, Impact reporting, Ecosystem building, Tools onboarding, Partnerships, Storytelling)
- Featured GG23 ImpactQF Round
- Get Involved section

**Additional Pages:**
- **About**: Bioregional framing, how we work, values
- **Vision**: Mission, values, goals, approach
- **Nodes & Partners**: Member organizations, matching pool partners
- **Initiatives**: GG23 ImpactQF round details, bioregional reforestation placeholder
- **Events**: Past events (GG23), future events placeholder
- **Resources**: Curated library with categories (Impact Reporting, Funding Mechanisms, Guides, References)
- **Get Involved**: CTAs for projects, donors, partners, nodes
- **Contact**: Round operators, social links, contact info

#### Assets

- **Logo**: Olive Gold variant (primary), Ocean variant (dark mode)
- **Hero Banner**: Social Media Banner Olive Gold
- **Favicon**: Generated from logo mark (TODO in questionnaire)

#### Multi-Language

- **Locales**: en-US (default), es-ES, it-IT
- **Structure**: `content/en/`, `content/es/`, `content/it/`
- **Status**: English complete, Spanish and Italian placeholders

### Questionnaire Implementation

**Questionnaire Location**: `docs/QUESTIONNAIRE.md`

**Key Questionnaire Answers Implemented:**

- **Site Name**: ReFi Mediterranean
- **Tagline**: "Regenerative Finance for the Mediterranean"
- **Domain**: GitHub Pages subpath
- **Color Scheme**: Mediterranean (preset)
- **Typography**: Classic & Professional
- **Navigation**: 6 main pages
- **Homepage Sections**: Hero, What We Do, Featured Initiative, Get Involved
- **Multi-Language**: EN/ES/IT

### Technical Implementation

#### Configuration Files

- `quartz.config.ts`: Typography, colors, baseUrl configured
- `quartz.layout.ts`: Navigation and footer links updated
- `quartz/components/Navigation.tsx`: Page links with language prefix support
- `quartz/components/PageTitle.tsx`: Logo with relative paths for GitHub Pages
- `quartz/components/Footer.tsx`: Logo with relative paths

#### Content Files

- `content/index.md`: Complete homepage with all sections
- `content/about/index.md`: Full about page
- `content/vision/index.md`: Vision and mission
- `content/nodes-and-partners/index.md`: Partners structure
- `content/initiatives/index.md`: GG23 round + placeholder
- `content/events/index.md`: Events grid
- `content/resources/index.md`: Resources library
- `content/get-involved/index.md`: CTAs for different audiences
- `content/contact/index.md`: Contact information

#### Deployment

- `.github/workflows/deploy.yml`: GitHub Actions workflow
- `package-lock.json`: Committed for CI/CD
- `.nojekyll`: Created during build

### Lessons Learned

1. **Static Asset Paths**: Use `pathToRoot()` and `joinSegments()` for relative paths to work with GitHub Pages subpaths
2. **Package Lock**: Always commit `package-lock.json` for `npm ci` in CI/CD
3. **Gradual Development**: Questionnaire supports incremental completion
4. **Questionnaire TODOs**: Document missing items clearly for future work

### Development Process

Followed the [Questionnaire-Based Development Workflow](QUESTIONNAIRE-WORKFLOW.md):

1. ✅ Configuration setup from questionnaire sections 1-3
2. ✅ Asset processing from questionnaire section 2
3. ✅ Content development from questionnaire sections 5-6
4. ✅ Multi-language setup from questionnaire section 5.3
5. ✅ Deployment configuration
6. ✅ Testing and fixes

### Reference Points

- **Questionnaire**: `docs/QUESTIONNAIRE.md` - Complete filled questionnaire
- **Workflow**: See [QUESTIONNAIRE-WORKFLOW.md](QUESTIONNAIRE-WORKFLOW.md) for step-by-step process
- **Content Templates**: Used templates from `docs/CONTENT-TEMPLATES.md`
- **Past Documentation**: `docs/past docs/` contains GG23 round documentation used for Initiatives page

## Other Example Sites

### ReFi Barcelona

- **Site**: https://refibcn.cat
- **Theme**: Ocean Blue preset
- **Features**: Ecosystem map, Regenerant Catalunya program

### ReFi DAO

- **Site**: https://refidao.com
- **Theme**: Dark gradient preset
- **Features**: Network-level portal, Profile dropdown

### Regenerant Catalunya

- **Site**: https://regenerant.refibcn.cat
- **Theme**: Green Program preset
- **Features**: Program-focused, carousel support

## Implementation Patterns

### Pattern 1: Standard Local Node

**Example**: ReFi Barcelona (initial version)

**Characteristics:**
- 5-6 pages (Homepage, About, Ecosystem, Contact)
- Single language
- Standard navigation
- Basic homepage sections

**Best For**: New nodes starting out

### Pattern 2: Comprehensive Regional Node

**Example**: ReFi Mediterranean

**Characteristics:**
- 8-9 pages (all standard + Vision, Nodes & Partners, Events, Resources)
- Multi-language support
- Full homepage sections including team
- Comprehensive content

**Best For**: Established regional nodes with multiple initiatives

### Pattern 3: Program/Grants Site

**Example**: Regenerant Catalunya

**Characteristics:**
- Program-focused structure
- Partner/project showcases
- Tools and resources
- Carousel components

**Best For**: Specific programs or grant rounds

## Getting Started with Your Own Site

1. **Review Examples**: Study ReFi Mediterranean and other examples
2. **Complete Questionnaire**: Fill out `docs/QUESTIONNAIRE.md`
3. **Follow Workflow**: Use [QUESTIONNAIRE-WORKFLOW.md](QUESTIONNAIRE-WORKFLOW.md)
4. **Reference Templates**: Use `docs/CONTENT-TEMPLATES.md` for structure
5. **Iterate**: Start with essentials, add content over time

## Contributing Examples

If you've built a site using this template and want to share it as an example:

1. Ensure your site is publicly accessible
2. Document key implementation decisions
3. Share your questionnaire (if willing)
4. Submit a pull request adding your site to this document

---

*For detailed implementation guidance, see [QUESTIONNAIRE-WORKFLOW.md](QUESTIONNAIRE-WORKFLOW.md).*







