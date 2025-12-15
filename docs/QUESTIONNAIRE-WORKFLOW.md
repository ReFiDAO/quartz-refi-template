# Questionnaire-Based Development Workflow

This guide explains how to build a complete ReFi node website using the questionnaire-based development approach. This systematic process ensures all aspects of your site are properly configured and developed.

## Overview

The questionnaire-based workflow transforms your answers into a fully functional website through six phases:

1. **Configuration Setup** - Map questionnaire answers to site configuration
2. **Asset Processing** - Organize and integrate visual assets
3. **Content Development** - Create pages from questionnaire content
4. **Multi-Language Setup** - Configure translations (if needed)
5. **Deployment** - Set up GitHub Pages and workflows
6. **Testing & Launch** - Verify and publish

## Prerequisites

Before starting, ensure you have:

- [ ] Completed the [Questionnaire](QUESTIONNAIRE.md) with all essential sections (1-3)
- [ ] Forked the template repository
- [ ] Assets prepared and uploaded to `assets/` folder
- [ ] Reference materials in `docs/` folder
- [ ] Node.js v22+ and npm v10.9.2+ installed

## Phase 1: Configuration Setup

Map questionnaire answers to configuration files.

### 1.1 Basic Site Information → `quartz.config.ts`

**Questionnaire Section 1.1-1.5** → Configuration settings:

```typescript
// quartz.config.ts
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Your Site Name",  // From 1.1
    pageTitleSuffix: " - Your Tagline",  // From 1.2
    baseUrl: "yourdomain.com",  // From 1.3
    // ...
  }
}
```

**Mapping Reference:**

| Questionnaire | Config File | Setting | Example |
|--------------|-------------|---------|---------|
| 1.1 Site Name | `quartz.config.ts` | `pageTitle` | "ReFi Mediterranean" |
| 1.2 Tagline | `quartz.config.ts` | `pageTitleSuffix` | " - Regenerative Finance..." |
| 1.3 Domain | `quartz.config.ts` | `baseUrl` | "refidao.github.io/ReFi-Mediterranean" |
| 1.4 Contact Email | `content/contact/index.md` | Contact page | "contact@example.com" |
| 1.5 GitHub Repo | `.github/workflows/deploy.yml` | Repository reference | "ReFiDAO/ReFi-Mediterranean" |

**Domain Format Notes:**

- **GitHub Pages**: `username.github.io/repository-name` (no `https://`)
- **Subdomain**: `subdomain.refidao.com` (no `https://`)
- **Custom domain**: `yourdomain.com` (no `https://`)

### 1.2 Branding & Visual Identity → `quartz.config.ts` + `custom.scss`

**Questionnaire Section 3** → Theme configuration:

**Color Scheme (Section 3.1):**

If you selected a preset scheme (e.g., "Mediterranean"), the colors are already configured. If custom:

```typescript
// quartz.config.ts
theme: {
  colors: {
    lightMode: {
      light: "#F5F5DC",        // Background
      lightgray: "#E8E8D8",     // Secondary background
      gray: "#7A8A9A",          // Muted text
      darkgray: "#2C3E50",      // Body text
      dark: "#0D4A6B",          // Headings
      secondary: "#1E7A9F",     // Links
      tertiary: "#D4A574",      // Hover states
      highlight: "rgba(30, 122, 159, 0.15)",
      textHighlight: "rgba(30, 122, 159, 0.25)",
    },
    darkMode: {
      // Dark mode variants
    }
  }
}
```

**Typography (Section 3.2):**

```typescript
// quartz.config.ts
theme: {
  typography: {
    header: "Merriweather",      // Classic & Professional
    body: "Source Serif Pro",    // Classic & Professional
    code: "IBM Plex Mono",
  }
}
```

**Typography Options:**

- **Modern & Clean**: `header: "Inter"`, `body: "Inter"`
- **Classic & Professional**: `header: "Merriweather"`, `body: "Source Serif Pro"`
- **Friendly & Approachable**: `header: "Nunito"`, `body: "Poppins"`
- **Bold & Expressive**: `header: "Outfit"`, `body: "Sora"`

### 1.3 Navigation Structure → `quartz.layout.ts` + `Navigation.tsx`

**Questionnaire Section 4.1** → Navigation links:

```typescript
// quartz/components/Navigation.tsx
<ul id="nav-menu" class="nav-links">
  <li><a href={getPageLink(langPrefix, "about")}>{navCopy.about}</a></li>
  <li><a href={getPageLink(langPrefix, "vision")}>{navCopy.vision}</a></li>
  // ... more links from questionnaire
</ul>
```

**Update i18n labels:**

```typescript
// quartz/i18n/locales/en-US.ts
navigation: {
  about: "About",
  vision: "Vision",
  nodesAndPartners: "Nodes & Partners",
  initiatives: "Initiatives",
  getInvolved: "Get Involved",
  contact: "Contact",
}
```

**Footer Links (Section 4.2):**

```typescript
// quartz.layout.ts
footer: Component.Footer({
  links: {
    "ReFi DAO": "https://refidao.com",
    "Twitter/X": "https://x.com/YourHandle",
    "GitHub": "https://github.com/YourOrg/YourRepo",
    "Telegram": "https://t.me/yourgroup",
  },
})
```

## Phase 2: Asset Processing

Organize and integrate visual assets from questionnaire section 2.

### 2.1 Logo Setup

**From Questionnaire Section 2:**

1. **Copy logo to static folder:**
   ```bash
   cp assets/Node\ Logo\ Olive\ Gold\ 2.jpg quartz/static/node-logo-olive-gold.jpg
   cp assets/Node\ Logo\ Ocean.png quartz/static/node-logo-ocean.png
   ```

2. **Update PageTitle component** to use relative paths:
   ```typescript
   // quartz/components/PageTitle.tsx
   const baseDir = pathToRoot(currentSlug)
   const logoPath = joinSegments(baseDir, "static/node-logo-ocean.png")
   ```

3. **Update Footer component** similarly for GitHub Pages compatibility

### 2.2 Hero Image

```bash
cp assets/Social\ Media\ Banner\ Olive\ Gold.jpg quartz/static/hero-banner-olive-gold.jpg
```

Reference in `content/index.md`:
```markdown
<img src="/static/hero-banner-olive-gold.jpg" alt="Your Site Name"/>
```

### 2.3 Favicon

Generate favicon from logo mark:
- Size: 32x32 or 64x64 pixels
- Format: PNG
- Save to: `quartz/static/icon.png` (Quartz will use this automatically)

### 2.4 Asset Checklist

Verify all assets from questionnaire section 2:
- [ ] Logo (header) - copied to `quartz/static/`
- [ ] Favicon - generated and placed
- [ ] Hero image - copied and referenced
- [ ] Team photos (if using team section)
- [ ] Partner logos (if using partners section)
- [ ] Event photos (if using events section)

## Phase 3: Content Development

Create pages and content from questionnaire answers.

### 3.1 Homepage (`content/index.md`)

**From Questionnaire Sections 5.1 and 6:**

**Hero Section (Section 6.1):**
```markdown
<div class="hero-section">
  <div class="hero-top">
    <div class="hero-title">
      <h1>Your title from questionnaire</h1>
    </div>
    <div class="hero-image">
      <img src="/static/hero-banner.jpg" alt="Your Site"/>
    </div>
  </div>
  <div class="hero-bottom">
    <p class="hero-text">
      Your description from questionnaire section 6.1
    </p>
    <a href="/get-involved" class="cta-button">Get involved</a>
  </div>
</div>
```

**What We Do Section (Section 6.2):**
```markdown
<div id="about" class="section-container">
  <div class="section-content-centered">
    <h2>What We Do</h2>
    <p>Brief overview</p>
  </div>
  <div class="feature-grid">
    <div class="feature-item">
      <dt>💸 Activity Name</dt>
      <dd>Description from questionnaire</dd>
    </div>
    <!-- Repeat for each activity -->
  </div>
</div>
```

**Featured Initiative (Section 5.1):**
```markdown
<div id="featured-project" class="callout-section">
## Initiative Name
*Tagline*
Description from questionnaire or docs.
<a href="/initiatives" class="cta-button">Learn More</a>
</div>
```

**Team Section (Section 6.3) - Optional:**
```markdown
<div class="section-container section-container-tinted">
  <div class="section-content-centered">
    <h2>Our Team</h2>
  </div>
  <div class="team-grid">
    <div class="team-member">
      <p class="team-name"><a href="https://x.com/username">Name</a></p>
      <p class="team-role">Role</p>
      <p class="team-bio">Bio from questionnaire</p>
    </div>
  </div>
</div>
```

### 3.2 Create Pages from Questionnaire Section 5.2

For each page listed in questionnaire section 5.2:

**About Page (`content/about/index.md`):**
- Extract from questionnaire section 6 (if available)
- Use questionnaire section 7.1 (Overall Vision) for content
- Include bioregional framing, values, how we work

**Vision Page (`content/vision/index.md`):**
- Extract from questionnaire section 7.1
- Mission statement
- Values
- Goals

**Nodes & Partners (`content/nodes-and-partners/index.md`):**
- List from questionnaire section 5.1 (if mentioned)
- Partner logos (when available)
- Matching pool contributors

**Initiatives (`content/initiatives/index.md`):**
- Extract from questionnaire section 7.2
- Past initiatives (e.g., GG23 round)
- Current initiatives
- Timeline or card layout

**Events (`content/events/index.md`):**
- Past events grid
- Future events placeholder
- Link to initiatives if relevant

**Resources (`content/resources/index.md`):**
- Curated library structure
- Categories: Guides, Toolkits, References, Media
- Links to external resources

**Get Involved (`content/get-involved/index.md`):**
- CTAs for different audiences (projects, donors, partners, nodes)
- Contact information
- Social links

**Contact (`content/contact/index.md`):**
- Primary contact email (from questionnaire 1.4)
- Social media links (from questionnaire 4.3)
- Round operators/team contacts

### 3.3 Content Templates

Use `docs/CONTENT-TEMPLATES.md` for structure, then fill with questionnaire answers:

1. Copy template structure
2. Replace placeholder text with questionnaire content
3. Update links and references
4. Add images from assets folder

## Phase 4: Multi-Language Setup

If questionnaire section 5.3 indicates multi-language support:

### 4.1 Configure Locales

**From Questionnaire Section 5.3:**

```javascript
// scripts/build-multilang.mjs
const LOCALES = [
  { code: "en-US", prefix: "en", isDefault: true },
  { code: "es-ES", prefix: "es", isDefault: false },
  { code: "it-IT", prefix: "it", isDefault: false },
]
```

### 4.2 Create Language Directories

```bash
mkdir -p content/en content/es content/it
```

### 4.3 Update Navigation Component

Add locale prefixes to `Navigation.tsx`:

```typescript
const LOCALE_PREFIXES: Record<string, string> = {
  "en-US": "en",
  "es-ES": "es",
  "it-IT": "it",
}
```

### 4.4 Create Placeholder Pages

For each language, create `content/{lang}/index.md`:

```markdown
---
title: "Your Site Name"
description: "Description in target language"
---

# Your Site Name

*Content in [Language] coming soon.*

[English](/en/) | [Español](/es/) | [Italiano](/it/)
```

### 4.5 Update Package.json

```json
{
  "scripts": {
    "build:multilang": "node scripts/build-multilang.mjs"
  }
}
```

## Phase 5: Deployment

### 5.1 GitHub Pages Configuration

**From Questionnaire Section 1.3:**

1. **Update baseUrl in `quartz.config.ts`:**
   ```typescript
   baseUrl: "username.github.io/repository-name"
   ```

2. **Update GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   - Ensure `npm ci` works (requires `package-lock.json` in repo)
   - Create `.nojekyll` file during build
   - Deploy from `public/` directory

3. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Select source: **GitHub Actions** (not "Deploy from a branch")

### 5.2 Domain Options

**Option A: GitHub Pages (Default)**
- URL: `username.github.io/repository-name`
- No additional setup needed

**Option B: Subdomain of ReFi DAO**
- Request subdomain from ReFi DAO
- Update `baseUrl` to `subdomain.refidao.com`
- Configure DNS/CNAME

**Option C: Custom Domain**
- Update `baseUrl` to `yourdomain.com`
- Create `quartz/static/CNAME` with domain name
- Configure DNS records

### 5.3 Static Asset Paths

**Important:** For GitHub Pages with subpaths, use relative paths:

```typescript
// Use pathToRoot() for static assets
const baseDir = pathToRoot(fileData.slug!)
const logoPath = joinSegments(baseDir, "static/node-logo.png")
```

This ensures logos and images work correctly on GitHub Pages.

## Phase 6: Testing & Launch

### 6.1 Local Testing

```bash
npm install
npm run quartz build
npx quartz build --serve
```

Visit `http://localhost:8080` and verify:
- [ ] All pages load correctly
- [ ] Navigation links work
- [ ] Images display properly
- [ ] Logo appears in header and footer
- [ ] Responsive design works on mobile
- [ ] All external links open correctly

### 6.2 Pre-Deployment Checklist

- [ ] All questionnaire TODOs addressed or documented
- [ ] Contact information verified
- [ ] Social media links correct
- [ ] Assets optimized and loading
- [ ] `package-lock.json` committed to repository
- [ ] GitHub Actions workflow configured
- [ ] BaseUrl matches deployment target

### 6.3 Deploy

```bash
git add .
git commit -m "Complete website implementation from questionnaire"
git push origin main
```

Monitor GitHub Actions for successful deployment.

## Questionnaire Answer Mapping Reference

### Configuration Mappings

| Questionnaire Section | Config File | Setting | Notes |
|---------------------|------------|---------|-------|
| 1.1 Site Name | `quartz.config.ts` | `pageTitle` | Main site title |
| 1.2 Tagline | `quartz.config.ts` | `pageTitleSuffix` | Browser tab suffix |
| 1.3 Domain | `quartz.config.ts` | `baseUrl` | No `https://` prefix |
| 1.4 Contact Email | `content/contact/index.md` | Contact page | May be placeholder |
| 3.1 Color Scheme | `quartz.config.ts` | `theme.colors` | Use preset or custom |
| 3.2 Typography | `quartz.config.ts` | `theme.typography` | Font selection |
| 4.1 Navigation | `quartz/i18n/locales/en-US.ts` | `navigation` | Link labels |
| 4.1 Navigation | `quartz/components/Navigation.tsx` | Navigation links | Page paths |
| 4.2 Footer Links | `quartz.layout.ts` | Footer component | Social/org links |
| 5.1 Homepage Sections | `content/index.md` | Page sections | Hero, features, etc. |
| 5.2 Additional Pages | `content/{page}/index.md` | New pages | Create as needed |
| 5.3 Multi-Language | `scripts/build-multilang.mjs` | LOCALES array | Language config |
| 6.1 Hero Content | `content/index.md` | Hero section | Title, description, CTA |
| 6.2 What We Do | `content/index.md` | Feature grid | Activities list |
| 6.3 Team Members | `content/index.md` or `about/index.md` | Team section | Optional |

### Content Mappings

| Questionnaire Section | Content File | Section | Template |
|---------------------|-------------|---------|----------|
| 6.1 Hero | `content/index.md` | Hero section | CONTENT-TEMPLATES.md |
| 6.2 Activities | `content/index.md` | What We Do | Feature grid template |
| 6.3 Team | `content/index.md` or `about/index.md` | Team section | Team grid template |
| 7.1 Vision | `content/vision/index.md` | Mission, values | Vision page template |
| 7.2 Goals | `content/vision/index.md` | Goals section | Vision page template |
| 7.3 References | Various | Inspirations | Use as reference only |

## Common Patterns

### Pattern 1: Standard Node Website

**Pages:** Homepage, About, Initiatives, Get Involved, Contact
**Sections:** Hero, What We Do, Featured Initiative, Get Involved
**Theme:** Ocean Blue or Mediterranean
**Languages:** Single language (English)

### Pattern 2: Comprehensive Regional Node

**Pages:** Homepage, About, Vision, Nodes & Partners, Initiatives, Events, Resources, Get Involved, Contact
**Sections:** All homepage sections including team
**Theme:** Custom or preset matching region
**Languages:** Multi-language (EN + regional languages)

### Pattern 3: Program/Grants Site

**Pages:** Homepage, Program, Partners & Projects, Tools, Resources
**Sections:** Program-focused, partner logos, tools showcase
**Theme:** Green Program preset
**Languages:** Single or multi-language

## Troubleshooting

### Logo Not Displaying

**Issue:** Logo shows broken image icon on GitHub Pages

**Solution:**
- Use relative paths with `pathToRoot()` instead of absolute `/static/` paths
- Update `PageTitle.tsx` and `Footer.tsx` to use `joinSegments(pathToRoot(slug), "static/logo.png")`
- Verify logo file exists in `quartz/static/` and is copied to `public/static/` during build

### Build Fails: Missing package-lock.json

**Issue:** GitHub Actions fails with "npm ci requires package-lock.json"

**Solution:**
- Remove `package-lock.json` from `.gitignore`
- Run `npm install` locally to generate `package-lock.json`
- Commit and push `package-lock.json`

### Pages Return 404

**Issue:** Pages not found after deployment

**Solution:**
- Verify `baseUrl` in `quartz.config.ts` matches GitHub Pages URL exactly
- Check that internal links use relative paths
- Ensure `.nojekyll` file is created during build
- Verify GitHub Pages source is set to "GitHub Actions"

### Navigation Links Broken

**Issue:** Navigation links don't work

**Solution:**
- Verify page files exist at expected paths (`content/{page}/index.md`)
- Check that `Navigation.tsx` uses correct page paths
- Ensure i18n labels match navigation links
- Test with `npx quartz build --serve` locally first

## Reference Implementation: ReFi Mediterranean

ReFi Mediterranean serves as a complete reference implementation of the questionnaire-based workflow.

### Repository

- **GitHub**: https://github.com/ReFiDAO/ReFi-Mediterranean
- **Live Site**: https://refidao.github.io/ReFi-Mediterranean
- **Questionnaire**: See `docs/QUESTIONNAIRE.md` in repository

### Key Implementation Decisions

1. **Theme**: Mediterranean Ocean preset with custom typography (Merriweather/Source Serif)
2. **Pages**: 9 pages (About, Vision, Nodes & Partners, Initiatives, Events, Resources, Get Involved, Contact)
3. **Multi-Language**: EN/ES/IT configured with placeholder pages
4. **Deployment**: GitHub Pages at `refidao.github.io/ReFi-Mediterranean`
5. **Assets**: Logo variants (Olive Gold, Ocean) for light/dark modes

### Implementation Timeline

- **Phase 1**: Configuration (typography, baseUrl, navigation)
- **Phase 2**: Assets (logos, hero banner)
- **Phase 3**: Content (all 9 pages from questionnaire)
- **Phase 4**: Multi-language setup
- **Phase 5**: GitHub Pages deployment
- **Phase 6**: Testing and fixes (logo paths, package-lock.json)

### Lessons Learned

1. **Static Asset Paths**: Use relative paths with `pathToRoot()` for GitHub Pages compatibility
2. **Package Lock**: Always commit `package-lock.json` for CI/CD
3. **Gradual Development**: Start with essentials, add content over time
4. **Questionnaire TODOs**: Document missing items clearly for future completion

## Next Steps

After completing the workflow:

1. **Review**: Test all pages and functionality
2. **Iterate**: Add missing content from questionnaire TODOs
3. **Translate**: Complete multi-language content if configured
4. **Enhance**: Add partner logos, team photos, event images
5. **Maintain**: Keep content updated, sync from template as needed

## Additional Resources

- [Content Templates](CONTENT-TEMPLATES.md) - Ready-to-use content structures
- [Presets](PRESETS.md) - Available theme presets
- [Elements Catalog](ELEMENTS-CATALOG.md) - Reusable UI components
- [Setup Guide](SETUP.md) - Initial setup instructions
- [Upstream Sync](UPSTREAM-SYNC.md) - Keeping template updated

---

*This workflow guide is part of the [Quartz ReFi Template](https://github.com/ReFiDAO/quartz-refi-template) documentation.*
