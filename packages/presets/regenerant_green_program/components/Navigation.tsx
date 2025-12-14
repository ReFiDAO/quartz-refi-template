import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n, ValidLocale } from "../i18n"
import { FullSlug } from "../util/path"
import style from "./styles/navigation.scss"

function getCurrentLanguage(slug: FullSlug): ValidLocale {
  const segments = slug.split("/").filter((s: string) => s.length > 0)
  const firstSegment = segments[0]

  if (firstSegment === "ca") return "ca-ES"
  if (firstSegment === "es") return "es-ES"
  if (firstSegment === "en") return "en-US"

  return "en-US"
}

export default (() => {
  const Navigation: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    const currentSlug = (fileData.slug || "index") as FullSlug
    const currentLang = getCurrentLanguage(currentSlug)
    const translation = i18n(currentLang)
    const navLabels = translation.components.navigation || {
      program: "Program",
      partnersProjects: "Partners & Projects",
      tools: "Tools",
      resources: "Resources",
    }

    // For English use root; for other locales use language prefix
    const basePath = currentLang === "en-US" ? "" : currentLang === "ca-ES" ? "/ca" : "/es"

    return (
      <nav class={`navigation ${displayClass ?? ""}`} aria-label="Primary navigation">
        <div class="nav-shell">
          <ul id="nav-menu" class="nav-links">
            <li>
              <a href={basePath ? `${basePath}/program` : "/program"} data-nav-link="program">
                {navLabels.program}
              </a>
            </li>
            <li>
              <a
                href={basePath ? `${basePath}/program/partners-projects` : "/program/partners-projects"}
                data-nav-link="partners-projects"
              >
                {navLabels.partnersProjects}
              </a>
            </li>
            <li>
              <a href={basePath ? `${basePath}/program/tools` : "/program/tools"} data-nav-link="tools">
                {navLabels.tools}
              </a>
            </li>
            <li>
              <a href={basePath ? `${basePath}/resources` : "/resources"} data-nav-link="resources">
                {navLabels.resources}
              </a>
            </li>
          </ul>
          <button
            class="nav-toggle action-button"
            type="button"
            aria-controls="nav-menu"
            aria-expanded="false"
            aria-label="Toggle navigation menu"
            data-nav-toggle
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>
    )
  }

  Navigation.css = style
  // Use the default navigation script included in template Navigation.scss; this component is
  // compatible because it keeps the same ids/classes/data attributes.
  return Navigation
}) satisfies QuartzComponentConstructor

