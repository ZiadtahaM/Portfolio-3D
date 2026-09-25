# Portfolio-3D

An interactive 3D WebGL developer portfolio and design show built with Three.js, React Three Fiber, TypeScript, and an Express API server.

## Overview

Portfolio-3D combines WebGL rendering with a responsive modern UI. The 3D scene features dynamic particle physics, animated mathematical torus rings, mouse parallax tracking, and custom GLSL shaders, backed by a Node.js Express service with structured Pino logging.

## Monorepo Architecture

Organized as a pnpm workspace with separated client, backend, and prototyping artifacts:

```
Portfolio-3D/
├── artifacts/
│   ├── portfolio/                 # WebGL Frontend Application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ParticleBackground.tsx  # React Three Fiber 2500-particle canvas
│   │   │   │   ├── Hero.tsx                # Hero section with interactive 3D camera
│   │   │   │   ├── Projects.tsx            # Project showcase grid with interactive cards
│   │   │   │   ├── Techniques.tsx          # Engineering skills and stack matrix
│   │   │   │   ├── Experience.tsx          # Career timeline with milestones
│   │   │   │   ├── Contact.tsx             # Contact form with validation
│   │   │   │   └── Cursor.tsx              # Custom interactive cursor tracker
│   │   │   ├── hooks/
│   │   │   │   └── useWebGL.ts             # WebGL capability detection and fallback
│   │   │   ├── App.tsx                     # Main application layout and routes
│   │   │   └── index.css                   # Custom utility classes and theme tokens
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   ├── api-server/                # Express Backend Service
│   │   ├── src/
│   │   │   ├── routes/                     # API routes (contact submission, status)
│   │   │   ├── middlewares/                # Error handling and validation
│   │   │   ├── lib/logger.ts               # Structured Pino logger
│   │   │   ├── app.ts                      # Express app configuration
│   │   │   └── index.ts                    # Server bootstrap
│   │   ├── build.mjs
│   │   └── package.json
│   └── mockup-sandbox/            # Prototyping sandbox for 3D interactions
├── server.cjs                     # Production static server entrypoint
├── pnpm-workspace.yaml            # Monorepo workspace configuration
└── package.json
```

## Technology Stack

| Layer | Technologies |
|-------|--------------|
| 3D Graphics | Three.js, `@react-three/fiber`, `@react-three/drei` |
| UI Framework | React 18, TypeScript, Tailwind CSS, Framer Motion |
| Icons & Components | Lucide React, Radix UI primitives |
| Build Tool | Vite, esbuild |
| Backend | Node.js, Express, Pino HTTP logger, CORS |
| Package Manager | pnpm workspace |

## WebGL Features

- **Particle Physics Canvas**: 2,500 float-positioned particles rendered via `THREE.Points` and `bufferGeometry` with color interpolation.
- **Mathematical Geometries**: Double-torus ring animation rotating synchronously against the elapsed frame clock.
- **Graceful Degradation**: Fallback mechanism via `useWebGL` hook for devices without hardware acceleration.
- **Responsive Layout**: Full responsive viewport scaling across mobile, tablet, and desktop viewports.

## Local Development

```bash
# Install all dependencies across workspace
pnpm install

# Start the WebGL portfolio frontend
pnpm --filter portfolio dev

# Start the backend API service
pnpm --filter api-server dev

# Type check across the workspace
pnpm check
```
