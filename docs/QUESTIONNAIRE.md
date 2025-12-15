# Node Website Customization Questionnaire

This questionnaire will help us set up and customize your ReFi local node website. Please complete each section as thoroughly as possible. Don't worry if you're unsure about some technical details — we'll work through them together.

> **Tip**: Look at existing node websites for inspiration:
> - [ReFi Barcelona](https://refibcn.cat)
> - [ReFi DAO](https://refidao.com)
> - [Regenerant Catalunya](https://regenerant.refibcn.cat)

---

### Getting Started

#### The Process

1. **Fork the repository** — Create your website repo from the template
2. **Add assets & materials** — Upload images, docs, and reference materials to your repo
3. **Answer this questionnaire** — Guide how the website should look and be structured
4. *(Optional)* **Quick call** — Walk through questions together
5. **Website customization** — We'll build based on your inputs
6. **Publish website** 🎉

#### Key Folders in Your Repository

| Folder | Purpose | File Types |
|--------|---------|------------|
| `assets/` | Visual assets (logos, images, photos) | PNG, JPG, SVG |
| `content/` | Actual content published on the website | Markdown (.md) |
| `docs/` | Internal documentation & reference materials | Any format |

> **Start by adding files to these folders** — the more materials you provide (docs, info, images), the better we can customize your website.

---

### How to Use This Questionnaire

**You don't need to complete everything at once!** This questionnaire supports gradual development:

1. **Start with the essentials** (Sections 1-3): Basic info, assets, and branding get you a working site
2. **Add content over time** (Sections 4-6): Fill in navigation, pages, and content drafts as you go
3. **Refine and expand**: Come back to add more content or polish

Each section can be completed independently, allowing you to launch with a minimal site and grow it organically.

---

## 1. Basic Site Information

### 1.1 Site Name
What is the name of your node/organization?

*Example: "ReFi Barcelona", "ReFi Provence", "ReFi Mediterranean"*
```
Your answer: _______________
```

### 1.2 Tagline (Optional)
A short phrase that appears after your site name in browser tabs and search results.

*Example: "A network society to regenerate the earth"*
*Example: "Regenerative Finance for the Mediterranean"*
```
Your answer: _______________
```

### 1.3 Domain
What domain will your website use?

> **Tip**: We recommend starting with **GitHub Pages** (free, instant setup) and adding a custom domain later when you're ready. This lets you launch quickly and upgrade when needed.

| Option | Example | Effort | Cost |
|--------|---------|--------|------|
| **A) GitHub Pages** (recommended start) | `refidao.github.io/refi-provence` | None | Free, no domain setup required |
| **B) Subdomain of ReFi DAO** | `provence.refidao.com` | Low | Free, managed by ReFi DAO |
| **C) Custom domain** | `refiprovence.org` | Medium | ~$10-15/year |

```
Your choice for launch:
[ ] A) GitHub Pages — Start here, upgrade later
[ ] B) Subdomain of ReFi DAO
[ ] C) Custom domain (I already have one): _______________

```

### 1.4 Contact Information
Primary contact email for the website.

*Example: contact@refiprovence.org, hello@refibcn.cat*
```
Your answer: _______________
```

### 1.5 GitHub Repository
Where is your website repository hosted?

> **Note**: You should fill this questionnaire **after forking the template**. If you haven't forked yet, do that first: [Fork the template](https://github.com/ReFiDAO/quartz-refi-template) → **Fork** → Create repository.

```
Organization: _______________ (e.g., "ReFiDAO", "refibcn")
Repository name: _______________ (e.g., "refi-provence-website")
Repository URL: https://github.com/_______________/_______________
```

---

## 2. Assets Checklist

Please gather the following assets and upload them to the `assets/` folder in your repository. These will be used throughout the website customization.

### Required Assets

| Asset | Status | Filename |
|-------|--------|----------|
| Logo (header) | [ ] Ready  [ ] In progress  [ ] Need help | |
| Favicon | [ ] Ready  [ ] In progress  [ ] Need help | |
| Hero image | [ ] Ready  [ ] In progress  [ ] Need help | |

### Recommended Assets

| Asset | Status | Notes |
|-------|--------|-------|
| Team photos | [ ] Ready  [ ] In progress  [ ] N/A | One per team member |
| Partner logos | [ ] Ready  [ ] In progress  [ ] N/A | PNG with transparent bg |
| Event photos | [ ] Ready  [ ] In progress  [ ] N/A | For past events section |
| Project images | [ ] Ready  [ ] In progress  [ ] N/A | For project showcases |

### Image Guidelines

- **Hero images**: Minimum 1200px wide, landscape orientation
- **Team photos**: Square format (1:1), minimum 400x400px
- **Logos**: PNG with transparent background, or SVG
- **Event photos**: Minimum 800px wide

---

## 3. Branding & Visual Identity

### 3.1 Color Scheme

Choose a color scheme that reflects your node's identity. You can either:
- **A)** Select from existing ReFi node color schemes (see examples below)
- **B)** Provide your own brand colors

#### Option A: Select from Existing Schemes

| Scheme | Primary | Description | Best For |
|--------|---------|-------------|----------|
| **Ocean Blue** (ReFi BCN) | Navy (#092045) | Professional, trustworthy, calm | General ReFi nodes |
| **Forest Green** (Regenerant) | Forest (#214033) | Natural, ecological, grounded | Bioregional/environmental focus |
| **Mediterranean** | Teal (#1E7A9F) | Coastal, warm, inviting | Mediterranean/coastal regions |
| **Earth Tones** | Warm brown (#8B4513) | Earthy, organic, rooted | Rural/agricultural focus |
| **Sunset** | Coral (#E67E50) | Energetic, warm, welcoming | Community/social focus |

```
Your choice: [ ] Ocean Blue  [ ] Forest Green  [ ] Mediterranean  [ ] Earth Tones  [ ] Sunset  [ ] Custom (see Option B)
```

#### Option B: Custom Colors

If you have existing brand colors, provide them here:

```
Primary color (main brand color): #_______________
Secondary color (links, accents): #_______________
Background color (light mode): #_______________ (or "default warm sand")
```

> **Need help picking colors?** Try [Coolors](https://coolors.co/) or [Adobe Color](https://color.adobe.com/)

### 3.2 Typography Style

What feeling should your typography convey?

| Style | Fonts | Best For |
|-------|-------|----------|
| **Modern & Clean** | Inter, Space Grotesk | Tech-forward nodes |
| **Classic & Professional** | Merriweather, Source Serif | Established organizations |
| **Friendly & Approachable** | Nunito, Poppins | Community-focused nodes |
| **Bold & Expressive** | Outfit, Sora | Creative/activist nodes |

```
Your preference: [ ] Modern  [ ] Classic  [ ] Friendly  [ ] Bold  [ ] No preference (use default)
```

### 3.3 Logo & Favicon

Please provide:

| Asset | Format | Size | Required? |
|-------|--------|------|-----------|
| Logo (header) | PNG or SVG | Min 200px wide | Yes |
| Favicon | PNG | 32x32 or 64x64 | Yes |
| Logo (dark mode) | PNG or SVG | Same as header logo | Optional |

```
Do you have a logo ready? [ ] Yes  [ ] No, need help creating one
File location/link: _______________
```

---

## 4. Navigation Structure

### 4.1 Main Navigation Links

What pages should appear in your main navigation menu? List them in order.

| # | Display Name | Link Type | Destination |
|---|--------------|-----------|-------------|
| 1 | | [ ] Internal page  [ ] External link | |
| 2 | | [ ] Internal page  [ ] External link | |
| 3 | | [ ] Internal page  [ ] External link | |
| 4 | | [ ] Internal page  [ ] External link | |
| 5 | | [ ] Internal page  [ ] External link | |

**Examples from existing nodes:**

*ReFi Barcelona:*
- Regenerant Catalunya → https://regenerant.refibcn.cat/
- Ecosystem Map → https://mapa.refibcn.cat
- Blog → /blog
- Contact → mailto:hola@refibcn.cat

*ReFi DAO:*
- Community → /community
- Resources → /resources-hub
- Media → /media
- About → /about

### 4.2 Footer Links

What links should appear in the footer?

*Example: "GitHub", "Twitter/X", "Discord", "ReFi DAO"*
```
Your links: _______________
```

### 4.3 Social Media Links

| Platform | URL |
|----------|-----|
| Twitter/X | |
| Discord | |
| Telegram | |
| LinkedIn | |
| GitHub | |
| Other | |

---

## 5. Content Structure

### 5.1 Homepage Sections

Which sections would you like on your homepage? Check all that apply:

| Section | Description | Include? |
|---------|-------------|----------|
| **Hero** | Large banner with title, tagline, and CTA | [ ] Yes |
| **What We Do** | Grid of activities/services | [ ] Yes |
| **Featured Project** | Highlight a key initiative | [ ] Yes |
| **Past Events** | Showcase previous activities | [ ] Yes |
| **Team/About Us** | Introduce your core team | [ ] Yes |
| **Partners** | Display partner/sponsor logos | [ ] Yes |
| **Get Involved** | Call to action for participation | [ ] Yes |
| **What is ReFi?** | Educational section about ReFi | [ ] Yes |

### 5.2 Additional Pages

What other pages do you need beyond the homepage?

| Page | Purpose | Priority |
|------|---------|----------|
| About | | [ ] High  [ ] Medium  [ ] Low |
| Team | | [ ] High  [ ] Medium  [ ] Low |
| Projects | | [ ] High  [ ] Medium  [ ] Low |
| Events | | [ ] High  [ ] Medium  [ ] Low |
| Resources | | [ ] High  [ ] Medium  [ ] Low |
| Blog | | [ ] High  [ ] Medium  [ ] Low |
| Contact | | [ ] High  [ ] Medium  [ ] Low |
| Other: _______ | | [ ] High  [ ] Medium  [ ] Low |

### 5.3 Multi-Language Support

Does your website need multiple languages?

```
[ ] No, single language only
[ ] Yes, multiple languages

If yes, which languages?: _______________

Default language: _______________
```

---

## 6. Content Drafts

### 6.1 Hero Section

**Main Title** (one impactful sentence):

*Example: "Seeding pathways toward just and resilient economies"*
```
Your title: _______________
```

**Description** (2-3 sentences about your node):

*Example: "We connect Catalonia's regenerative movements with global innovations in finance, technology, and governance to accelerate the transition toward a life-centered economy."*
```

Your description:
_______________
_______________
_______________
```

**Call-to-Action Button**:
```
Button text: _______________ (e.g., "Learn More", "Get Involved", "Join Us")
Button link: _______________ (e.g., "#about", "/contact")
```

### 6.2 What We Do

List 3-6 key activities your node focuses on:

| Activity | Icon | Short Description |
|----------|------|-------------------|
| 1. | | |
| 2. | | |
| 3. | | |
| 4. | | |
| 5. | | |
| 6. | | |

> **Icon suggestions**: Use emoji or describe what icon you'd like (e.g., "money/funding", "people/community", "plant/nature")

### 6.3 Team Members

| Name | Role | Bio (2-3 sentences) | Photo? | LinkedIn/Twitter |
|------|------|---------------------|--------|------------------|
| | | | [ ] Yes | |
| | | | [ ] Yes | |
| | | | [ ] Yes | |
| | | | [ ] Yes | |

---

## 7. Vision & Requirements

Use this section to share any additional context that will help guide the website development.

### 7.1 Overall Vision

What do you want visitors to feel or understand when they land on your website?

```




```

### 7.2 Key Goals

What are the main goals for this website? (e.g., attract partners, onboard community members, showcase projects, raise awareness)

```




```

### 7.3 Inspirations & References

Are there any websites, designs, or aesthetics you'd like us to draw inspiration from?

```




```

### 7.4 Specific Requirements or Requests

Any particular features, sections, or functionality you need that weren't covered above?

```




```

### 7.5 Things to Avoid

Anything you specifically don't want on the website?

```




```

### 7.6 Timeline & Priorities

When do you need the website ready? Any key dates or events driving the timeline?

```




```

---

## Next Steps

After completing this questionnaire:

1. **Upload assets** — Add your images to the `assets/` folder
2. **Add documentation** — Put any reference materials in the `docs/` folder
3. **Follow the Workflow Guide** — Use [Questionnaire-Based Development Workflow](QUESTIONNAIRE-WORKFLOW.md) to build your site systematically
4. **Reference Examples** — See [Examples](EXAMPLES.md) for reference implementations like ReFi Mediterranean
5. **Schedule a call** (optional) — Walk through any questions together
6. **Review and iterate** — Build incrementally, starting with essentials (sections 1-3)
7. **Launch!** — Deploy your website

### Implementation Guide

The [Questionnaire-Based Development Workflow](QUESTIONNAIRE-WORKFLOW.md) provides:

- **Phase-by-phase implementation** - Step-by-step guide from questionnaire to deployed site
- **Configuration mapping** - How questionnaire answers map to configuration files
- **Content development** - How to create pages from questionnaire sections
- **Asset processing** - How to organize and integrate visual assets
- **Deployment** - GitHub Pages setup and configuration
- **Troubleshooting** - Common issues and solutions

### Reference Implementation

See [ReFi Mediterranean](https://github.com/ReFiDAO/ReFi-Mediterranean) as a complete example:

- **Repository**: https://github.com/ReFiDAO/ReFi-Mediterranean
- **Live Site**: https://refidao.github.io/ReFi-Mediterranean
- **Questionnaire**: See `docs/QUESTIONNAIRE.md` in the repository
- **Implementation**: Follows the full questionnaire-based workflow

---

## Questions?

If you have questions while filling this out, reach out to:
- Email: [your-contact@email.com]
- Discord: [discord-link]

---

*This questionnaire is part of the [Quartz ReFi Template](https://github.com/ReFiDAO/quartz-refi-template) project.*
