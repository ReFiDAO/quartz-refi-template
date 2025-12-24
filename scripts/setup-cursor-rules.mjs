#!/usr/bin/env node

/**
 * Cursor Rules Setup Script
 * 
 * Generates site-specific cursor rules based on user input.
 * This script creates .cursorrules/ directory with customized rules.
 */

import { text, intro, outro, isCancel, cancel } from "@clack/prompts"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

async function main() {
  intro("Cursor Rules Setup")

  // Load existing config if available
  let config = {}
  const configPath = join(rootDir, "setup-config.json")
  if (existsSync(configPath)) {
    config = JSON.parse(readFileSync(configPath, "utf-8"))
  }

  const siteName = await text({
    message: "What is your site name?",
    placeholder: "My ReFi Node",
    initialValue: config.siteName || "",
  })

  if (isCancel(siteName)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const missionDescription = await text({
    message: "Brief mission description?",
    placeholder: "A local ReFi node connecting...",
    initialValue: "",
  })

  if (isCancel(missionDescription)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const missionStatement = await text({
    message: "Full mission statement?",
    placeholder: "We bridge...",
    initialValue: "",
  })

  if (isCancel(missionStatement)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const coreActivities = await text({
    message: "Core activities (comma-separated)?",
    placeholder: "Events, Workshops, Community Building",
    initialValue: "",
  })

  if (isCancel(coreActivities)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const teamMembers = await text({
    message: "Team members (format: Name: Role)?",
    placeholder: "John Doe: Founder, Jane Smith: Operations",
    initialValue: "",
  })

  if (isCancel(teamMembers)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const baseUrl = config.baseUrl || await text({
    message: "Base URL (without https://)?",
    placeholder: "example.com",
    initialValue: "",
  })

  if (isCancel(baseUrl)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const githubOrg = config.githubOrg || await text({
    message: "GitHub organization/username?",
    placeholder: "your-org",
    initialValue: "",
  })

  if (isCancel(githubOrg)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const githubRepo = config.githubRepo || await text({
    message: "GitHub repository name?",
    placeholder: "your-repo",
    initialValue: "",
  })

  if (isCancel(githubRepo)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const contactEmail = await text({
    message: "Contact email?",
    placeholder: "hello@example.com",
    initialValue: "",
  })

  if (isCancel(contactEmail)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  // Create .cursorrules directory
  const cursorRulesDir = join(rootDir, ".cursorrules")
  if (!existsSync(cursorRulesDir)) {
    mkdirSync(cursorRulesDir, { recursive: true })
  }

  // Template directory
  const templateDir = join(rootDir, "packages/cursor-rules-template")

  // Generate project-context.mdc
  const projectContextTemplate = readFileSync(
    join(templateDir, "project-context.mdc.template"),
    "utf-8"
  )

  const projectContext = projectContextTemplate
    .replace(/\{\{SITE_NAME\}\}/g, siteName)
    .replace(/\{\{MISSION_DESCRIPTION\}\}/g, missionDescription)
    .replace(/\{\{MISSION_STATEMENT\}\}/g, missionStatement)
    .replace(/\{\{CORE_ACTIVITIES\}\}/g, formatList(coreActivities))
    .replace(/\{\{TEAM_MEMBERS\}\}/g, formatTeamMembers(teamMembers))
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)
    .replace(/\{\{GITHUB_ORG\}\}/g, githubOrg)
    .replace(/\{\{GITHUB_REPO\}\}/g, githubRepo)
    .replace(/\{\{CONTACT_EMAIL\}\}/g, contactEmail)

  writeFileSync(join(cursorRulesDir, "project-context.mdc"), projectContext)

  // Generate site-structure.mdc
  const siteStructureTemplate = readFileSync(
    join(templateDir, "site-structure.mdc.template"),
    "utf-8"
  )

  const siteStructure = siteStructureTemplate
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)

  writeFileSync(join(cursorRulesDir, "site-structure.mdc"), siteStructure)

  // Generate module-index.mdc
  const moduleIndexTemplate = readFileSync(
    join(templateDir, "module-index.mdc.template"),
    "utf-8"
  )
  writeFileSync(join(cursorRulesDir, "module-index.mdc"), moduleIndexTemplate)

  // Generate feature-library.mdc
  const featureLibraryTemplate = readFileSync(
    join(templateDir, "feature-library.mdc.template"),
    "utf-8"
  )
  writeFileSync(join(cursorRulesDir, "feature-library.mdc"), featureLibraryTemplate)

  // Generate operator-guidebook.mdc
  const operatorGuidebookTemplate = readFileSync(
    join(templateDir, "operator-guidebook.mdc.template"),
    "utf-8"
  )
  writeFileSync(join(cursorRulesDir, "operator-guidebook.mdc"), operatorGuidebookTemplate)

  // Generate site-customization.mdc
  const siteCustomizationTemplate = readFileSync(
    join(templateDir, "site-customization.mdc.template"),
    "utf-8"
  )

  const siteCustomization = siteCustomizationTemplate
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)
    .replace(/\{\{BRAND_COLORS\}\}/g, "See quartz/styles/custom.scss for color variables")
    .replace(/\{\{DESIGN_PATTERNS\}\}/g, "Box components, responsive grids")
    .replace(/\{\{CUSTOM_COMPONENTS\}\}/g, "None (using template components)")
    .replace(/\{\{CONTENT_ORGANIZATION\}\}/g, "Content organized in content/ directory")
    .replace(/\{\{DEPLOYMENT_PLATFORM\}\}/g, "GitHub Pages")
    .replace(/\{\{CUSTOM_DOMAIN_NOTES\}\}/g, "Configured via CNAME file")
    .replace(/\{\{CUSTOMIZATION_NOTES\}\}/g, "Customize colors in custom.scss")
    .replace(/\{\{THEME_CUSTOMIZATIONS\}\}/g, "Colors customized via CSS variables")
    .replace(/\{\{COMPONENT_OVERRIDES\}\}/g, "None")

  writeFileSync(join(cursorRulesDir, "site-customization.mdc"), siteCustomization)

  // Generate upstream-sync.mdc
  const upstreamSyncTemplate = readFileSync(
    join(templateDir, "upstream-sync.mdc.template"),
    "utf-8"
  )

  const upstreamSync = upstreamSyncTemplate
    .replace(/\{\{LAST_SYNC_DATE\}\}/g, new Date().toISOString().split("T")[0])
    .replace(/\{\{LAST_SYNC_VERSION\}\}/g, "v1.0.0")
    .replace(/\{\{SYNC_NOTES\}\}/g, "Initial setup")

  writeFileSync(join(cursorRulesDir, "upstream-sync.mdc"), upstreamSync)

  // Generate vibecode.mdc if webapps package is installed
  if (config.packages && config.packages.includes("webapps")) {
    const vibecodeTemplatePath = join(templateDir, "vibecode.mdc.template")
    if (existsSync(vibecodeTemplatePath)) {
      const vibecodeTemplate = readFileSync(vibecodeTemplatePath, "utf-8")
      const vibecode = vibecodeTemplate
        .replace(/\{\{SITE_NAME\}\}/g, siteName)
        .replace(/\{\{BASE_URL\}\}/g, baseUrl)
        .replace(/\{\{APP_NAME\}\}/g, "your-app-name") // Placeholder for user
      
      writeFileSync(join(cursorRulesDir, "vibecode.mdc"), vibecode)
      console.log("✅ Vibecode Cursor rule generated")
    }
  }

  // Copy README template
  let readmeTemplate = `# Cursor Rules - ${siteName}

**Repository:** ${siteName} Website  
**Purpose:** Public website and digital presence  
**Created:** ${new Date().toISOString().split("T")[0]}  
**Rules:** 6 specialized context modules (MDC)

---

## Available Modules

### 1. **module-index.mdc** (Always Applied)
The central index mapping all rules and key documentation.

### 2. **project-context.mdc** (Always Applied)
**Provides:** ${siteName} organization mission, team, and activities.

### 3. **site-structure.mdc** (Always Applied)
**Provides:** Repository organization and deployment workflow.

### 4. **feature-library.mdc**
**Fetch with:** "library", "elements", "grids", "components"
**Provides:** UI elements and modular package details.

### 5. **operator-guidebook.mdc**
**Fetch with:** "operator", "guidebook", "pathway", "manual"
**Provides:** Strategic pathways (Strategist/Builder/AI) and collaboration guidance.

### 6. **site-customization.mdc**
**Fetch with:** "customize", "design", "theme", "styling"
**Provides:** Design system and styling patterns.

### 7. **upstream-sync.mdc**
**Fetch with:** "upstream", "sync", "contribute"
**Provides:** Template update instructions.

---

## Quick Reference

**Working on content:**
- Reference: \`project-context.mdc\` + \`operator-guidebook.mdc\`
- Edit: \`content/\` directory.

**Working on design/styling:**
- Reference: \`site-customization.mdc\` + \`feature-library.mdc\`
- Edit: \`quartz/styles/custom.scss\`

**Syncing from upstream:**
- Reference: \`upstream-sync.mdc\`

---
**These rules only apply when working in this repository.**
For questions, contact: ${contactEmail}
`

  writeFileSync(join(cursorRulesDir, "README.md"), readmeTemplate)

  outro("✨ Cursor rules generated successfully!")
}

function formatList(items) {
  if (!items) return "- None specified"
  return items
    .split(",")
    .map((item) => `- ${item.trim()}`)
    .join("\n")
}

function formatTeamMembers(members) {
  if (!members) return "- None specified"
  return members
    .split(",")
    .map((member) => {
      const [name, role] = member.split(":").map((s) => s.trim())
      return `- **${name}**: ${role || "Team Member"}`
    })
    .join("\n")
}

main().catch((error) => {
  console.error("❌ Setup failed:", error)
  process.exit(1)
})

