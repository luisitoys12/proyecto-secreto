# OBS Broadcast Suite Plugin

Plugin multifuncional para OBS orientado a broadcast deportivo. Este repositorio implementa la **FASE 1** del plugin nativo y una **suite web funcional inicial** para operación por URL (OBS Browser Source).

## Estado actual

- Plugin base como módulo cargable (`obs-broadcast-suite`).
- Punto de entrada `obs_module_load()` y `obs_module_unload()`.
- Trazas de diagnóstico para validar ciclo de vida del módulo.
- Modo `fallback` para compilar sin SDK de OBS.
- Sitio web en `docs/` con:
  - landing del proyecto,
  - control center web para overlays/multicámara/media URL,
  - overlay dedicado para insertar como Browser Source en OBS.

## Arquitectura inicial

```text
.
├── CMakeLists.txt
├── src/
│   └── plugin_main.cpp
├── third_party/
│   └── obs_fallback/
│       └── obs-module.h
└── docs/
    ├── index.html
    ├── control-center.html
    ├── obs-browser-overlay.html
    └── assets/
        ├── site.css
        └── control-center.css / control-center.js
```

## Compilación plugin

### Opción A: local sin SDK OBS (fallback)

```bash
cmake -S . -B build
cmake --build build
```

### Opción B: contra SDK OBS real

```bash
cmake -S . -B build -DUSE_OBS_SDK=ON -DOBS_SDK_PATH=/ruta/al/obs-studio
cmake --build build
```

## Suite web oficial (funcional desde URL)

### Vista local

```bash
python -m http.server 8000
```

Abrir:

- Landing: `http://127.0.0.1:8000/docs/`
- Control Center: `http://127.0.0.1:8000/docs/control-center.html`
- Overlay Browser Source: `http://127.0.0.1:8000/docs/obs-browser-overlay.html`

### Funcionalidades disponibles

- **Overlays dinámicos:** marcador, título, subtítulo, timer y color de acento.
- **Multicámara web:** grid de URLs con iframes para monitoreo operativo.
- **Media URL Manager:** gestión de enlaces y embeds oficiales (YouTube embed, TikTok/link, URL directa).
- **Compatibilidad OBS Browser Source:** URL overlay lista para pegar en OBS.

> Cumplimiento: esta versión **no implementa descarga** de contenido de YouTube/TikTok/terceros. Solo integración por URL/embeds oficiales para respetar TOS, derechos y licencias.

## GitHub Pages

Workflow: `.github/workflows/pages.yml`

- despliega `docs/` como sitio,
- reemplaza `__OBS_STUDIO_CREATOR_URL__` durante build,
- publica en entorno `github-pages`.

### Configuración de URL de OBS Studio Creator

Variable requerida en repositorio:

- `OBS_STUDIO_CREATOR_URL` en **Settings → Secrets and variables → Actions → Variables**

Si no se configura, se usa fallback de ejemplo.

### Solución al error "Get Pages site failed (Not Found)"

Si falla `actions/configure-pages` por `Not Found`, normalmente Pages no está habilitado aún.
Este repo usa auto-enable:

- `actions/configure-pages@v5` + `enablement: true`

Verificar además permisos de Actions/Pages y rama de trigger (`main`, `master`, `work`).

## Distribución en Windows (.exe descargable)

Guía completa: `docs/windows-exe-build.md`.

## Política de licencias de dependencias

Se admiten exclusivamente dependencias con licencia MIT/BSD/Apache-2.0.
No se incorporan dependencias GPL/AGPL/LGPL en el código del repositorio.

Ver detalle en `DEPENDENCY_LICENSES.md`.
