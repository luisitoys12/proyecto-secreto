# OBS Broadcast Suite Plugin

Plugin multifuncional para OBS orientado a broadcast deportivo. Este repositorio entrega:

- Base de plugin nativo OBS (FASE 1)
- Suite web funcional para operación por URL (OBS Browser Source)
- Despliegue automatizado en GitHub Pages

## Estado funcional actual

### Plugin nativo

- Módulo base `obs-broadcast-suite`
- `obs_module_load()` y `obs_module_unload()` con logs
- Compilación fallback sin SDK OBS

### Suite web oficial

- `docs/index.html` (landing)
- `docs/control-center.html` (control maestro)
- `docs/obs-browser-overlay.html` (overlay para Browser Source)
- `docs/virtual-studio.html` (editor online beta / virtual studio)

#### Capacidades implementadas

- Overlays dinámicos (marcador, título, timer, color)
- Presets visuales tipo StreamFX-like (`clean`, `cinematic`, `neon`) implementados con CSS/JS original
- Multicámara por URLs web
- Integración de videollamadas Jitsi Meet / Zoom Web mediante URL
- Media manager por URL/embeds oficiales

> Cumplimiento legal: no se implementa descarga de contenido de YouTube/TikTok/terceros. Se soportan enlaces/embeds oficiales.

## Arquitectura

```text
.
├── CMakeLists.txt
├── src/plugin_main.cpp
├── third_party/obs_fallback/obs-module.h
├── .github/workflows/pages.yml
└── docs/
    ├── index.html
    ├── control-center.html
    ├── obs-browser-overlay.html
    ├── virtual-studio.html
    └── assets/
        ├── site.css
        ├── control-center.css
        └── control-center.js
```

## Build del plugin

```bash
cmake -S . -B build
cmake --build build
```

Con SDK OBS real:

```bash
cmake -S . -B build -DUSE_OBS_SDK=ON -DOBS_SDK_PATH=/ruta/al/obs-studio
cmake --build build
```

## Vista previa local (web)

```bash
python -m http.server 8000
```

Rutas:

- Landing: `http://127.0.0.1:8000/docs/`
- Control Center: `http://127.0.0.1:8000/docs/control-center.html`
- Overlay OBS: `http://127.0.0.1:8000/docs/obs-browser-overlay.html`
- Studio Beta: `http://127.0.0.1:8000/docs/virtual-studio.html`

## Integración OBS Browser Source

1. En OBS, agregar fuente **Browser**.
2. Pegar URL de `obs-browser-overlay.html`.
3. En paralelo abrir `control-center.html` para operar overlays/calls/media.

## GitHub Pages

Workflow: `.github/workflows/pages.yml`

- Construye artefacto de sitio
- Reemplaza `__OBS_STUDIO_CREATOR_URL__`
- Despliega en `github-pages`

Variable opcional de repo:

- `OBS_STUDIO_CREATOR_URL` en Settings → Secrets and variables → Actions → Variables

### Error `Get Pages site failed (Not Found)`

Este repo usa auto-enable en workflow:

- `actions/configure-pages@v5` + `enablement: true`

Si persiste, revisar permisos de Actions/Pages a nivel organización/repositorio.

## Distribución Windows

Ver `docs/windows-exe-build.md`.

## Licencias

Solo MIT/BSD/Apache-2.0 permitidas.
No se incluye GPL/AGPL/LGPL en el código del repo.

Ver `DEPENDENCY_LICENSES.md`.
