# Rafael Madayag Portfolio — Vue 3 + Vite

This is the Vue version of the existing Formula 1-inspired portfolio. It keeps the current HTML structure, CSS design, and animation layer while mounting the page through a Vue single-file component (`src/App.vue`).

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- VS Code with the **Vue - Official** extension (formerly Volar)

## Run locally
1. Extract this project folder.
2. Open the folder in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for deployment
Run `npm run build`. The production website is generated in `dist/`.

## Personalize it
- Replace `public/photo.jpg` with your own square portrait named exactly `photo.jpg`.
- Edit the text in `src/App.vue` to update your name, projects, skills, career history, email, GitHub, LinkedIn, and resume link.
- Change colors, spacing, and responsive rules in `src/style.css`.
- The existing interactive effects live in `public/script.js`; it is loaded after Vue mounts so the DOM effects can find the rendered elements.

## Important
The displayed projects, work history, skills, and metrics are still sample content. Replace them with accurate personal information before publishing.
