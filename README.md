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

