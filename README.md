# OBS Broadcast Suite Plugin

Plugin multifuncional para OBS orientado a broadcast deportivo. Este repositorio implementa la **FASE 1**: plugin mínimo que compila y registra logs.

## Estado actual (FASE 1)

- Plugin base como módulo cargable (`obs-broadcast-suite`).
- Punto de entrada `obs_module_load()` y `obs_module_unload()`.
- Trazas de diagnóstico para validar ciclo de vida del módulo.
- Modo `fallback` para compilar sin SDK de OBS en entornos CI/locales sin OBS instalado.

## Arquitectura inicial

```text
.
├── CMakeLists.txt
├── src/
│   └── plugin_main.cpp
└── third_party/
    └── obs_fallback/
        └── obs-module.h
```

## Compilación

### Opción A: compilación local sin SDK OBS (fallback)

```bash
cmake -S . -B build
cmake --build build
```

### Opción B: compilación contra SDK OBS real

```bash
cmake -S . -B build -DUSE_OBS_SDK=ON -DOBS_SDK_PATH=/ruta/al/obs-studio
cmake --build build
```

## Validación básica en FASE 1

Al cargar el plugin, debe emitirse un log similar a:

- `[phase-1] Plugin cargado correctamente: motor base inicializado`

Al descargarlo:

- `[phase-1] Plugin descargado correctamente`


## Distribución en Windows (.exe descargable)

Para empaquetar una versión instalable en Windows (`.exe`) sin dependencias GPL/LGPL, se documentó un flujo basado en compilación con Visual Studio + empaquetado con **IExpress** (herramienta nativa de Windows).

Guía completa: `docs/windows-exe-build.md`.

## Política de licencias de dependencias

Se admiten exclusivamente dependencias con licencia MIT/BSD/Apache-2.0.
No se incorporan dependencias GPL/AGPL/LGPL en el código del repositorio.

Ver detalle en `DEPENDENCY_LICENSES.md`.


## GitHub Site del proyecto

Se añadió un sitio estático en `docs/` orientado a:

- donaciones para sostenibilidad del desarrollo,
- instalación recomendada del plugin,
- descarga del programa y recursos de broadcast.

Archivos principales:

- `docs/index.html`
- `docs/assets/site.css`
- `.github/workflows/pages.yml`

> Importante: actualizar enlaces de ejemplo (`ORG_O_USUARIO`) antes de publicar.



### Configuración de URL de OBS Studio Creator (GitHub Pages)

El despliegue del sitio reemplaza automáticamente el placeholder `__OBS_STUDIO_CREATOR_URL__` en `docs/index.html` mediante el workflow de Pages.

Configura la variable del repositorio:

- `OBS_STUDIO_CREATOR_URL` en **Settings → Secrets and variables → Actions → Variables**

Si no se configura, se utiliza un fallback de ejemplo en el workflow.

### Solución al error "Get Pages site failed (Not Found)"

Si el workflow falla en `actions/configure-pages` con error `Not Found`, normalmente significa que GitHub Pages no estaba habilitado para el repositorio.

Este proyecto ya incluye auto-habilitación en el workflow con:

- `actions/configure-pages@v5` + `enablement: true`

Verifica además:

1. Permisos de Actions habilitados para el repositorio/organización.
2. Que la rama de push coincida con el trigger del workflow (`main`, `master` o `work`).
3. En **Settings → Pages**, que la fuente sea **GitHub Actions**.

