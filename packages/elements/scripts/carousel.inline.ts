export default () => {
  // Generic auto-scrolling carousel behavior.
  //
  // Expected markup:
  // - container: .projects-carousel (overflow hidden)
  // - track: .carousel-track (display:flex; will be translated)
  //
  // Optional:
  // - .carousel-indicators with buttons; each button should have data-carousel-index="0..n-1"
  //
  // This script intentionally does NOT generate slides/data.

  const container = document.querySelector(".projects-carousel") as HTMLElement | null
  const track = document.querySelector(".carousel-track") as HTMLElement | null

  if (!container || !track) return

  const speed = 0.5 // px per frame
  let isPaused = false
  let x = 0
  let rafId: number | null = null

  const ensureDuplicated = () => {
    // Duplicate once to allow smooth wraparound
    if (track.dataset.carouselDuplicated === "true") return
    const children = Array.from(track.children)
    if (children.length === 0) return
    children.forEach((child) => {
      track.appendChild(child.cloneNode(true))
    })
    track.dataset.carouselDuplicated = "true"
  }

  const update = () => {
    const singleWidth = track.scrollWidth / 2
    if (singleWidth <= 0) return

    if (!isPaused) {
      x += speed
      if (x >= singleWidth) x = x - singleWidth
      track.style.transform = `translateX(-${x}px)`
    }
  }

  const tick = () => {
    update()
    rafId = requestAnimationFrame(tick)
  }

  const start = () => {
    ensureDuplicated()
    if (rafId === null) rafId = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  container.addEventListener("mouseenter", () => {
    isPaused = true
  })
  container.addEventListener("mouseleave", () => {
    isPaused = false
  })

  // Indicator support (optional)
  const indicators = document.querySelector(".carousel-indicators")
  if (indicators) {
    indicators.addEventListener("click", (event) => {
      const target = event.target as HTMLElement | null
      const btn = target?.closest("[data-carousel-index]") as HTMLElement | null
      if (!btn) return
      const idx = Number(btn.getAttribute("data-carousel-index"))
      if (!Number.isFinite(idx)) return

      // Jump roughly to the slide index (requires uniform slide widths)
      const first = track.children[0] as HTMLElement | undefined
      const slideWidth = first?.getBoundingClientRect().width ?? 0
      if (slideWidth <= 0) return

      isPaused = true
      x = idx * slideWidth
      track.style.transform = `translateX(-${x}px)`
      window.setTimeout(() => {
        isPaused = false
      }, 2000)
    })
  }

  // Start now (Quartz also triggers `nav` events; DOMContentLoaded is enough here)
  start()

  // Clean up on SPA navigation by restarting once per navigation
  document.addEventListener("nav", () => {
    stop()
    x = 0
    isPaused = false
    start()
  })
}













