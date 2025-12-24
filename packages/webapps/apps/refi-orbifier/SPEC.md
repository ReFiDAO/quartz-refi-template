# App Specification: ReFi Orbifier

## Goal
A micro-app that allows users to "orbify" their profile picture. It removes the background from a user's photo and replaces it with a glowing green ReFi orb.

## User Persona
ReFi community members, local node coordinators, and ecosystem participants who want to show their alignment on social media.

## Core Functionality
- [x] API Key Management: Store remove.bg API key in localStorage.
- [x] Image Upload: Support drag-and-drop and file browsing (PNG, JPG, WEBP).
- [x] Background Removal: Integration with remove.bg API.
- [x] Orbification: Process the background-less image on a canvas with a radial green gradient.
- [x] Export: Download the result as a PNG.
- [x] Social Sharing: Quick link to share on X (Twitter).

## Inputs & Outputs
- **Inputs**: 
    - remove.bg API Key (string)
    - Source Photo (image file)
- **Outputs**: 
    - Orbified PFP (PNG image)

## Design Context
- **Theme**: ReFi Green (#22c55e) and Quartz Blue (#2e5491).
- **Feel**: Modern, clean, and community-driven.
- **Responsiveness**: Mobile-first design, fits within a standard phone screen.

## Technical Details
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript.
- **Canvas API**: Used for compositing the orb background and the user's photo.
- **LocalStorage**: Used to persist the API key locally in the user's browser.

## Acceptance Tests
- [ ] App loads and displays instructions.
- [ ] API key is saved and loaded from localStorage.
- [ ] Image upload triggers the loading overlay.
- [ ] Final image is a square PNG with a green circular background.
- [ ] Download button successfully saves the image.


