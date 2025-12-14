#!/usr/bin/env node

/**
 * Package Setup Script
 * 
 * Interactive script to select and install packages for the Quartz ReFi template.
 * This script:
 * 1. Prompts user to select packages
 * 2. Copies package files to appropriate locations
 * 3. Updates configuration files
 * 4. Updates package.json scripts
 */

import { select, confirm, text, intro, outro, isCancel, cancel } from "@clack/prompts"
import { execSync } from "child_process"
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

const UPSTREAM_REPO = "https://github.com/ReFiDAO/quartz-refi-template.git"

const PRESETS = {
  refibcn_toolkit: {
    name: "ReFi BCN Toolkit (blue)",
    description: "Fixed header + strong borders + sand background",
  },
  refiprovence_toolkit: {
    name: "ReFi Provence Toolkit (blue)",
    description: "Same Toolkit structure (blue) — small local node default",
  },
  refimediterranean_ocean: {
    name: "ReFi Mediterranean (ocean)",
    description: "Toolkit structure + Mediterranean ocean palette",
  },
  regenerant_green_program: {
    name: "Regenerant (green program)",
    description: "Program-style IA + wider layout + carousel-ready Body",
  },
  refidao_dark_gradient: {
    name: "ReFi DAO (dark gradient)",
    description: "Dark-by-default + gradients + Profile menu",
  },
}

const PACKAGES = {
  core: {
    name: "Core",
    description: "Essential Quartz framework (always included)",
    required: true,
  },
  multilang: {
    name: "Multi-language Support",
    description: "Multi-language build script and LanguageSwitcher component",
    required: false,
  },
  analytics: {
    name: "Analytics",
    description: "Plausible Analytics integration",
    required: false,
  },
  comments: {
    name: "Comments",
    description: "Giscus comments system (GitHub Discussions)",
    required: false,
  },
  "og-images": {
    name: "OG Images",
    description: "Custom Open Graph image generation (slows builds)",
    required: false,
  },
  theme: {
    name: "Theme",
    description: "Customizable theme architecture (always included)",
    required: true,
  },
}

async function main() {
  intro("Quartz ReFi Template - Package Setup")

  const presetId =
    (process.env.QUARTZ_PRESET && PRESETS[process.env.QUARTZ_PRESET] ? process.env.QUARTZ_PRESET : null) ||
    (await select({
      message: "Choose a site preset:",
      options: Object.entries(PRESETS).map(([value, preset]) => ({
        value,
        label: `${preset.name} - ${preset.description}`,
      })),
    }))

  if (isCancel(presetId)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  // Collect site information
  const siteName =
    process.env.QUARTZ_SITE_NAME ||
    (await text({
      message: "What is your site name?",
      placeholder: "My ReFi Node",
      initialValue: "My ReFi Node",
    }))

  if (isCancel(siteName)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const baseUrl =
    process.env.QUARTZ_BASE_URL ||
    (await text({
      message: "What is your site's base URL? (without https://)",
      placeholder: "example.com",
      initialValue: "example.com",
    }))

  if (isCancel(baseUrl)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const defaultLocale =
    process.env.QUARTZ_LOCALE ||
    (await text({
      message: "Default locale?",
      placeholder: "en-US",
      initialValue: "en-US",
    }))

  if (isCancel(defaultLocale)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const githubOrg =
    process.env.QUARTZ_GITHUB_ORG ||
    (await text({
      message: "GitHub organization/username?",
      placeholder: "your-org",
      initialValue: "",
    }))

  if (isCancel(githubOrg)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const githubRepo =
    process.env.QUARTZ_GITHUB_REPO ||
    (await text({
      message: "GitHub repository name?",
      placeholder: "your-repo",
      initialValue: "",
    }))

  if (isCancel(githubRepo)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  // Select optional packages
  const selectedPackages = await select({
    message: "Select packages to install:",
    options: Object.entries(PACKAGES)
      .filter(([key]) => !PACKAGES[key].required)
      .map(([key, pkg]) => ({
        value: key,
        label: `${pkg.name} - ${pkg.description}`,
      })),
    multiple: true,
  })

  if (isCancel(selectedPackages)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const packagesToInstall = ["core", "theme", ...(Array.isArray(selectedPackages) ? selectedPackages : [selectedPackages])]

  console.log("\n📦 Installing packages...")

  // Shared element library (styles + optional behaviors)
  installElementsPackage()

  // Preset overrides (optional components/scripts)
  installPresetOverrides(presetId)

  // Install core package (always)
  installCorePackage(siteName, baseUrl, defaultLocale, githubOrg, githubRepo, presetId)

  // Install optional packages
  for (const pkg of packagesToInstall) {
    if (pkg === "core" || pkg === "theme") continue

    console.log(`\n📦 Installing ${pkg}...`)
    installPackage(pkg, siteName, baseUrl, defaultLocale, githubOrg, githubRepo)
  }

  // Install theme package
  installThemePackage(presetId)

  // Install preset starter content if present
  installPresetContent(presetId, siteName)

  // Update package.json scripts
  updatePackageJsonScripts(packagesToInstall)

  // Optional: configure upstream remote (manual workflow, but beginner-friendly)
  const shouldAddUpstream = await confirm({
    message: "Set up upstream sync remote (recommended)?",
    initialValue: true,
  })

  if (isCancel(shouldAddUpstream)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  if (shouldAddUpstream) {
    tryAddUpstreamRemote()
  }

  outro("✨ Setup complete! Run 'npm install' to install dependencies.")

  // Save configuration for future reference
  const config = {
    siteName,
    baseUrl,
    defaultLocale,
    githubOrg,
    githubRepo,
    preset: presetId,
    packages: packagesToInstall,
  }
  writeFileSync(join(rootDir, "setup-config.json"), JSON.stringify(config, null, 2))
}

function tryAddUpstreamRemote() {
  try {
    execSync("git rev-parse --is-inside-work-tree", { cwd: rootDir, stdio: "ignore" })
  } catch {
    console.log("\nℹ️  Git repository not detected. Skipping upstream remote setup.")
    return
  }

  let remotes = ""
  try {
    remotes = execSync("git remote -v", { cwd: rootDir, encoding: "utf-8" })
  } catch {
    console.log("\nℹ️  Could not read git remotes. Skipping upstream remote setup.")
    return
  }

  if (remotes.includes("upstream")) {
    console.log("\n✅ Upstream remote already configured.")
    return
  }

  try {
    console.log("\n📡 Adding upstream remote...")
    execSync(`git remote add upstream ${UPSTREAM_REPO}`, { cwd: rootDir, stdio: "inherit" })
    console.log("✅ Upstream remote configured.")
  } catch (error) {
    console.log("\n⚠️  Could not add upstream remote automatically.")
    console.log(`You can add it manually with:\n  git remote add upstream ${UPSTREAM_REPO}`)
    console.log(`Reason: ${error?.message ?? "unknown"}`)
  }
}

function installElementsPackage() {
  const elementsStylesDir = join(rootDir, "quartz", "styles", "elements")
  if (!existsSync(elementsStylesDir)) mkdirSync(elementsStylesDir, { recursive: true })

  const elementsPkgDir = join(rootDir, "packages", "elements")
  const sectionsSrc = join(elementsPkgDir, "styles", "sections.scss")
  const toolkitSrc = join(elementsPkgDir, "styles", "toolkit-layout.scss")

  if (existsSync(sectionsSrc)) {
    cpSync(sectionsSrc, join(elementsStylesDir, "sections.scss"))
  }
  if (existsSync(toolkitSrc)) {
    cpSync(toolkitSrc, join(elementsStylesDir, "toolkit-layout.scss"))
  }

  // Optional behaviors (copied but only used if components import them)
  const scriptsSrcDir = join(elementsPkgDir, "scripts")
  const componentsScriptsDir = join(rootDir, "quartz", "components", "scripts")
  if (!existsSync(componentsScriptsDir)) mkdirSync(componentsScriptsDir, { recursive: true })

  const carouselSrc = join(scriptsSrcDir, "carousel.inline.ts")
  if (existsSync(carouselSrc)) {
    cpSync(carouselSrc, join(componentsScriptsDir, "carousel.inline.ts"))
  }
}

function installPresetOverrides(presetId) {
  const presetComponentsDir = join(rootDir, "packages", "presets", presetId, "components")
  const destComponentsDir = join(rootDir, "quartz", "components")
  if (!existsSync(presetComponentsDir)) return
  if (!existsSync(destComponentsDir)) mkdirSync(destComponentsDir, { recursive: true })
  cpSync(presetComponentsDir, destComponentsDir, { recursive: true, force: true })
}

function installPresetContent(presetId, siteName) {
  const presetContentTemplate = join(rootDir, "packages", "presets", presetId, "content", "index.md.template")
  if (!existsSync(presetContentTemplate)) return

  const contentDir = join(rootDir, "content")
  if (!existsSync(contentDir)) mkdirSync(contentDir, { recursive: true })

  const indexPath = join(contentDir, "index.md")
  if (existsSync(indexPath)) return

  const template = readFileSync(presetContentTemplate, "utf-8")
  const rendered = template.replace(/\{\{SITE_NAME\}\}/g, siteName)
  writeFileSync(indexPath, rendered)
}

function installCorePackage(siteName, baseUrl, locale, githubOrg, githubRepo, presetId) {
  const presetCoreDir = join(rootDir, "packages", "presets", presetId, "core")
  const defaultCoreDir = join(rootDir, "packages", "core")

  const configTemplatePath = existsSync(join(presetCoreDir, "quartz.config.ts.template"))
    ? join(presetCoreDir, "quartz.config.ts.template")
    : join(defaultCoreDir, "quartz.config.ts.template")
  const layoutTemplatePath = existsSync(join(presetCoreDir, "quartz.layout.ts.template"))
    ? join(presetCoreDir, "quartz.layout.ts.template")
    : join(defaultCoreDir, "quartz.layout.ts.template")

  const configTemplate = readFileSync(configTemplatePath, "utf-8")
  const layoutTemplate = readFileSync(layoutTemplatePath, "utf-8")

  // Replace placeholders
  let config = configTemplate
    .replace(/\{\{SITE_NAME\}\}/g, siteName)
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)
    .replace(/\{\{LOCALE\}\}/g, locale)

  let layout = layoutTemplate
    .replace(/\{\{SITE_NAME\}\}/g, siteName)
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)
    .replace(/\{\{GITHUB_ORG\}\}/g, githubOrg)
    .replace(/\{\{GITHUB_REPO\}\}/g, githubRepo)
    .replace(/\{\{LOCALE\}\}/g, locale)

  // Write files
  writeFileSync(join(rootDir, "quartz.config.ts"), config)
  writeFileSync(join(rootDir, "quartz.layout.ts"), layout)

  console.log("✅ Core package installed")
}

function installPackage(pkgName, siteName, baseUrl, locale, githubOrg, githubRepo) {
  const pkgDir = join(rootDir, "packages", pkgName)

  if (!existsSync(pkgDir)) {
    console.log(`⚠️  Package ${pkgName} not found, skipping...`)
    return
  }

  switch (pkgName) {
    case "multilang":
      installMultilangPackage(pkgDir)
      break
    case "analytics":
      installAnalyticsPackage(pkgDir)
      break
    case "comments":
      installCommentsPackage(pkgDir, githubOrg, githubRepo, locale)
      break
    case "og-images":
      installOgImagesPackage()
      break
  }
}

function installMultilangPackage(pkgDir) {
  // Copy build script
  const scriptPath = join(pkgDir, "scripts", "build-multilang.mjs")
  if (existsSync(scriptPath)) {
    const scriptsDir = join(rootDir, "scripts")
    if (!existsSync(scriptsDir)) mkdirSync(scriptsDir, { recursive: true })
    cpSync(scriptPath, join(scriptsDir, "build-multilang.mjs"))
  }

  // Copy LanguageSwitcher component
  const componentPath = join(pkgDir, "components", "LanguageSwitcher.tsx")
  if (existsSync(componentPath)) {
    const componentsDir = join(rootDir, "quartz", "components")
    if (!existsSync(componentsDir)) mkdirSync(componentsDir, { recursive: true })
    cpSync(componentPath, join(componentsDir, "LanguageSwitcher.tsx"))
  }

  // Update quartz.config.ts to add locale support
  updateConfigForMultilang()

  // Update quartz.layout.ts to add LanguageSwitcher
  updateLayoutForMultilang()

  console.log("✅ Multi-language package installed")
}

function installAnalyticsPackage(pkgDir) {
  // Update quartz.config.ts to add analytics
  const configPath = join(rootDir, "quartz.config.ts")
  let config = readFileSync(configPath, "utf-8")

  const analyticsConfig = `    analytics: {
      provider: "plausible",
    },`

  config = config.replace(
    /\/\/ ANALYTICS_CONFIG_PLACEHOLDER.*/,
    analyticsConfig
  )

  writeFileSync(configPath, config)
  console.log("✅ Analytics package installed")
}

function installCommentsPackage(pkgDir, githubOrg, githubRepo, locale) {
  // Copy Comments component
  const componentPath = join(pkgDir, "components", "Comments.tsx")
  if (existsSync(componentPath)) {
    const componentsDir = join(rootDir, "quartz", "components")
    if (!existsSync(componentsDir)) mkdirSync(componentsDir, { recursive: true })
    cpSync(componentPath, join(componentsDir, "Comments.tsx"))
  }

  // Copy Giscus styles
  const giscusDir = join(pkgDir, "static", "giscus")
  if (existsSync(giscusDir)) {
    const staticDir = join(rootDir, "quartz", "static", "giscus")
    if (!existsSync(staticDir)) mkdirSync(staticDir, { recursive: true })
    cpSync(giscusDir, staticDir, { recursive: true })
  }

  // Update quartz.layout.ts to add Comments
  updateLayoutForComments(githubOrg, githubRepo, locale)

  console.log("✅ Comments package installed")
  console.log("⚠️  Don't forget to configure Giscus in quartz.layout.ts with your repo details!")
}

function installOgImagesPackage() {
  // Update quartz.config.ts to add CustomOgImages plugin
  const configPath = join(rootDir, "quartz.config.ts")
  let config = readFileSync(configPath, "utf-8")

  const ogImagesPlugin = `      Plugin.CustomOgImages(),`

  config = config.replace(
    /\/\/ OG_IMAGES_PLACEHOLDER.*/,
    ogImagesPlugin
  )

  writeFileSync(configPath, config)
  console.log("✅ OG Images package installed")
  console.log("⚠️  Note: OG image generation can slow down builds significantly")
}

function installThemePackage(presetId) {
  const presetThemeTemplate = join(rootDir, "packages", "presets", presetId, "theme", "custom.scss.template")
  const themeTemplate = existsSync(presetThemeTemplate)
    ? presetThemeTemplate
    : join(rootDir, "packages", "theme", "styles", "custom.scss.template")
  if (existsSync(themeTemplate)) {
    const stylesDir = join(rootDir, "quartz", "styles")
    if (!existsSync(stylesDir)) mkdirSync(stylesDir, { recursive: true })
    
    // Check if custom.scss already exists
    const customScssPath = join(stylesDir, "custom.scss")
    if (!existsSync(customScssPath)) {
      const template = readFileSync(themeTemplate, "utf-8")
      writeFileSync(customScssPath, template)
    }
  }

  console.log("✅ Theme package installed")
}

function updateConfigForMultilang() {
  const configPath = join(rootDir, "quartz.config.ts")
  let config = readFileSync(configPath, "utf-8")

  // Already handled by template, but ensure locale is set correctly
  // No changes needed as locale is already configured
}

function updateLayoutForMultilang() {
  const layoutPath = join(rootDir, "quartz.layout.ts")
  let layout = readFileSync(layoutPath, "utf-8")

  // Add LanguageSwitcher to header
  const languageSwitcher = `    Component.LanguageSwitcher(),`

  layout = layout.replace(
    /\/\/ LANGUAGE_SWITCHER_PLACEHOLDER.*/,
    languageSwitcher
  )

  writeFileSync(layoutPath, layout)
}

function updateLayoutForComments(githubOrg, githubRepo, locale) {
  const layoutPath = join(rootDir, "quartz.layout.ts")
  let layout = readFileSync(layoutPath, "utf-8")

  // Add Comments component
  const commentsComponent = `    Component.Comments({
      provider: "giscus",
      options: {
        repo: "${githubOrg}/${githubRepo}",
        repoId: "YOUR_REPO_ID", // Get from giscus.app
        category: "Announcements",
        categoryId: "YOUR_CATEGORY_ID", // Get from giscus.app
        mapping: "url",
        strict: true,
        reactionsEnabled: true,
        inputPosition: "bottom",
        lang: "${locale.split('-')[0]}",
      },
    }),`

  layout = layout.replace(
    /\/\/ COMMENTS_PLACEHOLDER.*/,
    commentsComponent
  )

  writeFileSync(layoutPath, layout)
}

function updatePackageJsonScripts(packages) {
  const packageJsonPath = join(rootDir, "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

  // Add multilang build script if multilang package is installed
  if (packages.includes("multilang")) {
    packageJson.scripts["build:multilang"] = "node scripts/build-multilang.mjs"
  }

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

main().catch((error) => {
  console.error("❌ Setup failed:", error)
  process.exit(1)
})

