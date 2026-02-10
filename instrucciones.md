# instrucciones.md

## Cambios realizados en esta versión

- Se creó una GitHub Site del proyecto en `docs/` con landing orientada a broadcast:
  - sección de donaciones,
  - instalación recomendada del plugin,
  - llamada a descarga del programa,
  - CTA para repositorio y alianzas.
- Se añadió estilo profesional responsive en `docs/assets/site.css`.
- Se añadió workflow de despliegue automático en GitHub Pages: `.github/workflows/pages.yml`.
- Se actualizó `README.md` con la sección "GitHub Site del proyecto" y los archivos clave.
- Se actualizó `DEPENDENCY_LICENSES.md` con trazabilidad para herramientas de despliegue Pages y stack web estático.
- Se regeneró este archivo conforme al estándar obligatorio.

## Requisitos o dependencias nuevas

- No se añadieron dependencias de runtime para el plugin.
- Para despliegue del sitio:
  - GitHub Actions habilitado en el repositorio.
  - GitHub Pages habilitado con fuente desde Actions.
- Para vista previa local del sitio:
  - Python 3 (servidor estático con `python -m http.server`).

## Guía paso a paso para probar la funcionalidad

1. Verificar compilación del plugin (sin regresión):
   ```bash
   cmake -S . -B build
   cmake --build build
   ```

2. Levantar preview local del sitio:
   ```bash
   python -m http.server 8000
   ```

3. Abrir en navegador:
   - `http://127.0.0.1:8000/docs/`

4. Validar contenido de la landing:
   - Botón de descarga apuntando a `.../releases`.
   - Sección de instalación recomendada.
   - Sección de donaciones.

5. Despliegue en GitHub Pages:
   - Hacer push a rama configurada.
   - Verificar ejecución de `.github/workflows/pages.yml`.
   - Confirmar URL publicada en el job `deploy`.

6. Antes de publicar oficialmente:
   - Reemplazar placeholders `ORG_O_USUARIO`.
   - Reemplazar correo de alianzas por correo oficial.
