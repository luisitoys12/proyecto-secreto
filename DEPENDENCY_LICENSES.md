# Dependency Licenses

## Runtime / Build dependencies usadas en FASE 1

1. **CMake**
   - Uso: sistema de build.
   - Licencia: BSD-3-Clause.
   - Estado: **Permitida** (BSD).

2. **Compilador C++ estándar (GCC/Clang/MSVC)**
   - Uso: compilación del plugin.
   - Licencia: toolchain del entorno, no redistribuida por este repositorio.
   - Estado: **No embebida**, se usa solo en build.

3. **SDK de OBS (opcional, no embebido en este repositorio)**
   - Uso: compilar contra headers reales cuando `USE_OBS_SDK=ON`.
   - Licencia: depende de la distribución del SDK instalada por el usuario.
   - Estado: **Opcional y externo**; no se incluye código de terceros en este repositorio.

## Código de terceros incluido

- `third_party/obs_fallback/obs-module.h`:
  - Código original de este proyecto (no copiado de repositorios externos).
  - Licencia: MIT (hereda licencia del repositorio).


4. **IExpress (Windows, opcional para empaquetado .exe)**
   - Uso: generar instalador autoextraíble `.exe` del plugin para distribución.
   - Licencia: componente integrado del sistema operativo Windows (no redistribuido por este repositorio).
   - Estado: **Opcional y externo**; no se embebe código de terceros en el repositorio.


5. **GitHub Actions para despliegue de Pages (opcionales de CI/CD)**
   - Uso: despliegue automático del sitio estático ubicado en `docs/`.
   - Acciones referenciadas: `actions/checkout`, `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`.
   - Licencia: mantenidas por GitHub; verificar licencia actual en cada repositorio oficial antes de un release corporativo.
   - Estado: **Herramientas externas de CI**, no embebidas en binarios del plugin.

6. **Stack web del sitio (HTML/CSS nativo)**
   - Uso: portal web estático del proyecto (GitHub Pages).
   - Licencia: código original de este repositorio (MIT).
   - Estado: **Permitida** y sin dependencias de terceros para frontend.
