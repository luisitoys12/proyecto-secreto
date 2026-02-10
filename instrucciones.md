# instrucciones.md

## Cambios realizados en esta versión

- Se reforzó el workflow de GitHub Pages en `.github/workflows/pages.yml` para construir un artefacto `_site/` y reemplazar dinámicamente el placeholder `__OBS_STUDIO_CREATOR_URL__`.
- Se añadió soporte de variable de repositorio `OBS_STUDIO_CREATOR_URL` para controlar la URL real de entrada a OBS Studio Creator sin editar código.
- Se actualizó `docs/index.html`:
  - nuevo ítem de navegación **OBS Creator**,
  - nueva sección con botón **Entrar a OBS Studio Creator**,
  - nota de placeholders ampliada para incluir URL Creator.
- Se actualizó `README.md` con guía de configuración de la URL del Creator en GitHub Actions Variables.
- Se regeneró este archivo conforme a la documentación obligatoria.

## Requisitos o dependencias nuevas

- No se añadieron dependencias de runtime al plugin ni al frontend.
- Requisito de configuración para producción:
  - variable `OBS_STUDIO_CREATOR_URL` en GitHub repository variables.
- Stack sigue siendo estático (HTML/CSS) + GitHub Actions para deploy.

## Guía paso a paso para probar la funcionalidad

1. Validar compilación del plugin (sin regresiones):
   ```bash
   cmake -S . -B build
   cmake --build build
   ```

2. Validar que el placeholder exista en fuente web:
   ```bash
   rg "__OBS_STUDIO_CREATOR_URL__" docs/index.html
   ```

3. Simular localmente la sustitución que hace el workflow:
   ```bash
   mkdir -p /tmp/site-test
   cp -R docs/* /tmp/site-test/
   export OBS_STUDIO_CREATOR_URL="https://creator.tu-dominio.com"
   sed -i "s|__OBS_STUDIO_CREATOR_URL__|${OBS_STUDIO_CREATOR_URL}|g" /tmp/site-test/index.html
   rg "creator.tu-dominio.com" /tmp/site-test/index.html
   ```

4. Preview local del sitio original:
   ```bash
   python -m http.server 8000
   ```
   - Abrir `http://127.0.0.1:8000/docs/`

5. Activar deploy real:
   - Configurar `OBS_STUDIO_CREATOR_URL` en GitHub.
   - Hacer push y revisar ejecución de `.github/workflows/pages.yml`.
