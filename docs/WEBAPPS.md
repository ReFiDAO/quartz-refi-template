# Webapps & Vibecoding Guide

This guide explains how to build and embed interactive micro-apps into your Quartz ReFi site using the "vibecoding" workflow with Cursor AI.

## Overview

Micro-apps are small, standalone webapps (HTML/JS/CSS) that live within your `content/apps/` directory. Quartz treats them as static assets and serves them alongside your notes.

The **Vibecoding** workflow leverages Cursor AI to rapidly build these apps based on a functional specification (`SPEC.md`).

## Getting Started

1.  **Install the Webapps Package**:
    Run the setup script and select the "Webapps" package:
    ```bash
    npm run setup
    ```

2.  **Generate Cursor Rules**:
    Ensure the `vibecode.mdc` rule is installed in your `.cursorrules/` folder:
    ```bash
    npm run setup:cursor
    ```

3.  **Create a New App**:
    The setup script creates a `content/apps/starter-app/` folder. You can duplicate this for new apps:
    ```bash
    cp -r content/apps/starter-app content/apps/my-new-app
    ```

## The Vibecoding Workflow

### 1. Define the SPEC
Open `content/apps/my-new-app/SPEC.md`. Define what the app should do. Be specific about inputs, outputs, and core logic.

### 2. Invoke Cursor
In Cursor, open the `content/apps/my-new-app/` folder. The `vibecode.mdc` rule will automatically activate.

Ask Cursor to:
> "Based on the SPEC.md, generate the HTML, CSS, and JS for this app."

### 3. Preview Locally
Run the Quartz build to see your app in action:
```bash
npx quartz build --serve
```
The app will be available at `http://localhost:8080/apps/my-new-app/index.html`.

### 4. Refine
If something isn't right, tell Cursor:
> "The button alignment is off on mobile. Please fix the CSS."
> "Add a validation check to the input field."

## Linking to Your Apps

You can link to your micro-apps from any markdown note:

```markdown
Check out our [Interactive Impact Calculator](/apps/impact-calculator/index.html)!
```

## Featured App: ReFi Orbifier

The **ReFi Orbifier** is a real-world example of a micro-app bundled with this template. It allows users to transform their profile pictures with a glowing green ReFi orb.

### Key Features
- **Integration**: Uses the [remove.bg API](https://www.remove.bg/api) to remove backgrounds.
- **Canvas Processing**: Composites the user's photo onto a custom-generated green gradient orb.
- **Persistence**: Remembers the user's API key using `localStorage`.
- **Social Integration**: Quick share button for X (Twitter).

### Building a Similar App
If you want to build a similar tool, look at the source code in `packages/webapps/apps/refi-orbifier/`. It demonstrates:
- How to handle file uploads and drag-and-drop.
- How to interact with external APIs.
- How to use the Canvas API for image manipulation.
- How to align the UI with the ReFi design system.

### Customizing the Orbifier
You can customize the orbifier's colors or behavior by editing its files in `content/apps/refi-orbifier/`. For example, to change the orb color, look for the `gradient` logic in `script.js`.

---

## Best Practices

- **Keep it Simple**: Micro-apps are best for focused tasks (calculators, maps, simple visualizations).
- **Vanilla is King**: Prefer vanilla JS and CSS for performance and simplicity.
- **Respect the Design System**: Use the site's CSS variables to ensure the app feels like part of the website.
- **SPEC-First**: Always update your `SPEC.md` when adding new features. It's the "source of truth" for the AI.

