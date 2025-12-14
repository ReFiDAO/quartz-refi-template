# Quartz ReFi Template

A modular template repository for creating Quartz-based websites for ReFi local nodes. Fork this template to quickly set up your local node website with optional features like multi-language support, analytics, comments, and more.

## Features

- **Modular Package System**: Choose only the features you need
- **Easy Customization**: Theme colors, fonts, and layout easily customizable
- **Upstream Sync**: Stay updated with template improvements
- **Best Practices**: Built-in best practices for Quartz configuration
- **Cursor Rules**: Pre-configured cursor rules for easier development

## Quick Start

### 1. Fork the Template (Recommended)

Go to the template repo on GitHub and click **Fork** to create your own copy.

Why fork (instead of “Use this template”)? Forks keep a visible upstream relationship so your repo can reliably receive template updates.

#### Optional but Recommended: enable upstream sync (copy/paste)

After you clone your repo locally, run:

```bash
# Add upstream (template source)
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git

# Verify
git remote -v
```

To pull template updates later:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Run Setup Script

```bash
npm install
npm run setup
```

The setup script will:
- Prompt for site information (name, URL, etc.)
- Let you select optional packages
- Configure files automatically

### 3. Set Up Cursor Rules (Optional)

```bash
npm run setup:cursor
```

This generates site-specific cursor rules for easier development.

### 4. Install Dependencies

```bash
npm install
```

### 5. Build and Preview

```bash
npx quartz build --serve
```

Visit `http://localhost:8080` to see your site.

### 6. Deploy

Push to `main` branch and GitHub Actions will deploy automatically.

## Available Packages

### Core (Always Included)
Essential Quartz framework and base configuration.

### Theme (Always Included)
Customizable theme architecture with CSS variables.

### Optional Packages

- **Multilang**: Multi-language support with LanguageSwitcher component
- **Analytics**: Plausible Analytics integration
- **Comments**: Giscus comments system (GitHub Discussions)
- **OG Images**: Custom Open Graph image generation

See [docs/PACKAGES.md](docs/PACKAGES.md) for detailed package documentation.

## Documentation

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [Package Documentation](docs/PACKAGES.md) - Complete package catalog
- [Upstream Sync Guide](docs/UPSTREAM-SYNC.md) - How to sync from template
- [Contributing Guide](docs/CONTRIBUTING.md) - How to contribute back

## Customization

### Theme Colors

Edit CSS variables in `quartz/styles/custom.scss`:

```scss
:root {
  --primary-dark: #092045;
  --primary-medium: #1A3A6B;
  --primary-light: #2E5491;
}
```

### Content

Edit markdown files in `content/` directory.

### Configuration

Edit `quartz.config.ts` and `quartz.layout.ts` for site-specific settings.

## Upstream Sync

To sync improvements from the template:

```bash
npm run sync:upstream
# or manually
git fetch upstream
git merge upstream/main
```

See [docs/UPSTREAM-SYNC.md](docs/UPSTREAM-SYNC.md) for detailed instructions.

## Contributing

Found a bug or have an improvement? Contribute back to the template!

1. Fork the template repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## Requirements

- Node.js v22+
- npm v10.9.2+

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Template Repository**: https://github.com/ReFiDAO/quartz-refi-template
- **Issues**: https://github.com/ReFiDAO/quartz-refi-template/issues
- **Discussions**: https://github.com/ReFiDAO/quartz-refi-template/discussions

## Related Projects

- [Quartz](https://quartz.jzhao.xyz/) - The static site generator
- [ReFi DAO](https://refidao.com) - Global ReFi network

---

Built with 💚 by the ReFi community

