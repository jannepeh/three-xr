# Three.js Car Scene

A simple 3D car scene built with Three.js featuring basic geometries, different materials, and interactive camera controls.

## Features

### Geometries

- **PlaneGeometry** - Ground plane
- **BoxGeometry** - Car body and cabin
- **CylinderGeometry** - Wheels

### Materials

- **MeshPhongMaterial** - Shiny car body with high shininess
- **MeshLambertMaterial** - Matte cabin/roof
- **MeshStandardMaterial** - Wheels with metalness and roughness, and ground

### Lighting

- **Ambient Light** - Provides general scene illumination
- **Directional Light** - Acts as the sun with shadow casting
- **Point Light** - Orange accent light positioned above the scene

### Controls

- **Orbit Controls** - Interactive camera control
  - Left click + drag to rotate
  - Right click + drag to pan
  - Scroll to zoom

### Additional Features

- Axis helper for coordinate reference
- Shadow mapping enabled
- Responsive window resizing

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Technologies

- Three.js
- Vite
