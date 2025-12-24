# Elements Catalog (Reusable Sections + UI)

This catalog documents the reusable **content section classes** shipped by the template so operators can build rich homepages without custom CSS.

All elements use the canonical accent tokens:
- `--accent-dark`
- `--accent-medium`
- `--accent-light`
- `--accent-highlight`

## Buttons

### CTA button

```html
<a href="/somewhere" class="cta-button">Call to action</a>
```

## Sections

### Basic section container

```html
<div class="section-container">
  <div class="section-content-centered">
    <h2 class="section-title">Section title</h2>
    <p class="section-subtitle">Section subtitle text.</p>
  </div>
</div>
```

### Tinted section

```html
<div class="section-container section-container-tinted">
  <div class="section-content-centered">
    <h2 class="section-title">Tinted section</h2>
    <p class="section-subtitle">Uses `--accent-highlight`.</p>
  </div>
</div>
```

## Grids

### Two-column grid

```html
<div class="two-col-grid">
  <div class="grid-item">Card A</div>
  <div class="grid-item">Card B</div>
</div>
```

### Three-column grid

```html
<div class="three-col-grid">
  <div class="grid-item">Card A</div>
  <div class="grid-item">Card B</div>
  <div class="grid-item">Card C</div>
</div>
```

## Hero

```html
<div class="hero-section">
  <div class="hero-content">
    <h1>Your title</h1>
    <p class="hero-text">Short description.</p>
    <div class="hero-cta">
      <a href="#about" class="cta-button">About</a>
      <a href="#contact" class="cta-button">Contact</a>
    </div>
  </div>
</div>
```

## Carousel behavior (optional)

If your content includes this structure, the `regenerant_green_program` preset will load the generic carousel script (via `Body.tsx` override):

```html
<div class="projects-carousel">
  <div class="carousel-track">
    <div class="carousel-slide">…</div>
    <div class="carousel-slide">…</div>
    <div class="carousel-slide">…</div>
  </div>
</div>
<div class="carousel-indicators">
  <button data-carousel-index="0"></button>
  <button data-carousel-index="1"></button>
  <button data-carousel-index="2"></button>
</div>
```













