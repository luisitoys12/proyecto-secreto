# instrucciones.md

## Cambios realizados en esta versión

- Se creó una suite web funcional para operación broadcast desde navegador:
  - `docs/control-center.html` (control principal),
  - `docs/obs-browser-overlay.html` (overlay para Browser Source de OBS),
  - `docs/assets/control-center.css` (estilos),
  - `docs/assets/control-center.js` (lógica de estado y render).
- Se amplió `docs/index.html` para enlazar el nuevo Control Center y el overlay web.
- Se actualizó `README.md` con arquitectura y guía completa de uso web + plugin.
- Se mantiene el workflow de Pages y el flujo de URL dinámica para Creator.
- Se agregó enfoque de cumplimiento: integración por URL/embeds oficiales, sin descarga de plataformas de terceros.

## Requisitos o dependencias nuevas

- No se agregaron dependencias externas de npm/pip.
- Requisitos mínimos:
  - Navegador moderno con soporte `localStorage`.
  - `BroadcastChannel` opcional (si no existe, funciona vía `localStorage`/recarga).
  - Python 3 para preview local (`python -m http.server`).

## Guía paso a paso para probar la funcionalidad

1. Compilar plugin (validar que no hubo regresiones):
   ```bash
   cmake -S . -B build
   cmake --build build
   ```

2. Levantar servidor local para web:
   ```bash
   python -m http.server 8000
   ```

3. Abrir rutas:
   - Landing: `http://127.0.0.1:8000/docs/`
   - Control Center: `http://127.0.0.1:8000/docs/control-center.html`
   - Overlay OBS Browser Source: `http://127.0.0.1:8000/docs/obs-browser-overlay.html`

4. Prueba de overlay:
   - En Control Center, completar campos y pulsar **Publicar overlay**.
   - Abrir overlay y verificar actualización de título, marcador, timer y color.

5. Prueba multicámara:
   - Agregar nombre + URL de cámara.
   - Verificar render en grid y funcionalidad de quitar/limpiar.

6. Prueba media URL manager:
   - Agregar URL de YouTube con plataforma `youtube` y verificar embed.
   - Agregar TikTok o URL genérica y verificar enlace.

7. Integración OBS:
   - En OBS Studio, agregar fuente **Browser**.
   - Usar URL de `obs-browser-overlay.html`.
