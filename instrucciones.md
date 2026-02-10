# instrucciones.md

## Cambios realizados en esta versión

- Se corrigió el workflow de GitHub Pages para resolver el error `Get Pages site failed (Not Found)` durante `actions/configure-pages`.
- En `.github/workflows/pages.yml` se activó auto-habilitación de Pages:
  - `actions/configure-pages@v5`
  - `with: enablement: true`
- Se mantiene el build del sitio en `_site/` y el reemplazo dinámico de `__OBS_STUDIO_CREATOR_URL__`.
- Se actualizó `README.md` con una sección específica de troubleshooting para el error de configuración de Pages.
- Se regeneró este archivo conforme a la documentación obligatoria.

## Requisitos o dependencias nuevas

- No se añadieron nuevas dependencias de runtime.
- Requisitos operativos para deploy:
  - GitHub Actions habilitado en repo/organización.
  - GitHub Pages con fuente desde Actions.
  - Permisos `pages:write` e `id-token:write` en el workflow.

## Guía paso a paso para probar la funcionalidad

1. Verificar sintaxis/estructura del workflow modificado:
   ```bash
   sed -n '1,220p' .github/workflows/pages.yml
   ```

2. Verificar compilación del plugin sin regresión:
   ```bash
   cmake -S . -B build
   cmake --build build
   ```

3. Validar build local del sitio con sustitución de URL Creator:
   ```bash
   mkdir -p /tmp/site-test
   cp -R docs/* /tmp/site-test/
   export OBS_STUDIO_CREATOR_URL="https://creator.tu-dominio.com"
   sed -i "s|__OBS_STUDIO_CREATOR_URL__|${OBS_STUDIO_CREATOR_URL}|g" /tmp/site-test/index.html
   rg "creator.tu-dominio.com" /tmp/site-test/index.html
   ```

4. Push a rama habilitada (`main`, `master` o `work`) y revisar job:
   - `Configure Pages (auto-enable)`
   - `Upload artifact`
   - `Deploy to GitHub Pages`

5. Si falla por permisos de organización, habilitar Actions/Pages a nivel org y reintentar.
