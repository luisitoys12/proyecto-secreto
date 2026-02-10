# Dependency Licenses

## Runtime / Build dependencies

1. **CMake**
   - Uso: sistema de build.
   - Licencia: BSD-3-Clause.
   - Estado: **Permitida**.

2. **Compilador C++ estándar (GCC/Clang/MSVC)**
   - Uso: compilación del plugin.
   - Licencia: toolchain del entorno (no redistribuida por este repositorio).
   - Estado: **No embebida**.

3. **SDK de OBS (opcional, externo)**
   - Uso: compilar contra headers reales cuando `USE_OBS_SDK=ON`.
   - Licencia: depende de la distribución instalada por el usuario.
   - Estado: **Opcional y externo**.

4. **IExpress (Windows, opcional para empaquetado .exe)**
   - Uso: generar instalador autoextraíble `.exe` para distribución.
   - Licencia: componente del sistema Windows.
   - Estado: **Opcional y externo**.

5. **GitHub Actions para Pages (CI/CD opcional)**
   - Uso: despliegue automático del sitio en `docs/`.
   - Acciones: `actions/checkout`, `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`.
   - Licencia: mantenidas por GitHub; validar en cada release corporativo.
   - Estado: **Externo de CI**.

6. **Stack web del sitio (HTML/CSS/JS nativo)**
   - Uso: portal y control center web.
   - Licencia: código original de este repositorio.
   - Estado: **MIT (heredada del repo)**.

7. **Servicios de videollamada (Jitsi/Zoom, opcionales por URL)**
   - Uso: integración por enlace web en panel multicall.
   - Licencia: servicios externos (no embebidos ni redistribuidos en este repo).
   - Estado: **Integración por URL**.

## Código de terceros incluido

- `third_party/obs_fallback/obs-module.h`:
  - Código original de este proyecto (no copiado de repositorios externos).
  - Licencia: MIT.

## Nota sobre StreamFX

- Se añadieron **presets visuales estilo StreamFX-like** implementados con código original (CSS/JS propio).
- **No se incorporó ni copió código** del repositorio externo referenciado.
- Esto preserva la política de licencias del proyecto (MIT/BSD/Apache-2.0 únicamente para dependencias permitidas).
