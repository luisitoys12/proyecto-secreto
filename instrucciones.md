# instrucciones.md

## Cambios realizados en esta versión

- Se amplió `docs/control-center.html` con nuevas funciones de versión oficial:
  - integración de videollamadas Jitsi Meet / Zoom por URL,
  - presets visuales estilo StreamFX-like para overlay (`clean`, `cinematic`, `neon`),
  - control de opacidad de overlay,
  - enlace directo a Studio Virtual Beta.
- Se creó `docs/virtual-studio.html` como editor online beta multimedia para diseño rápido de lower thirds y preview en vivo.
- Se refactorizó `docs/assets/control-center.js` con:
  - almacenamiento tipado por módulos (`overlay`, `cameras`, `calls`, `media`),
  - saneamiento básico (`escapeHtml`) y validación de URL (`safeUrl`),
  - sincronización overlay en tiempo real entre pestañas para uso con OBS Browser Source.
- Se actualizó `docs/index.html` para incluir accesos a Studio Beta y bloque de integración Jitsi/Zoom.
- Se actualizó `README.md` y `DEPENDENCY_LICENSES.md` con alcance funcional y cumplimiento legal/licencias.

## Requisitos o dependencias nuevas

- No se añadieron dependencias npm/pip ni librerías externas al repositorio.
- Requisitos para uso completo:
  - Navegador moderno con `localStorage` (y opcional `BroadcastChannel`).
  - Acceso web a salas Jitsi/Zoom por URL.
  - Python 3 para preview local (`python -m http.server`).

## Guía paso a paso para probar la funcionalidad

1. Compilar plugin sin regresiones:
   ```bash
   cmake -S . -B build
   cmake --build build
   ```

2. Levantar servidor web local:
   ```bash
   python -m http.server 8000
   ```

3. Abrir rutas:
   - `http://127.0.0.1:8000/docs/`
   - `http://127.0.0.1:8000/docs/control-center.html`
   - `http://127.0.0.1:8000/docs/obs-browser-overlay.html`
   - `http://127.0.0.1:8000/docs/virtual-studio.html`

4. Probar overlay OBS:
   - En Control Center completar datos y pulsar **Publicar overlay**.
   - Verificar que `obs-browser-overlay.html` refleja marcador, timer, color y preset visual.

5. Probar integración Jitsi/Zoom:
   - Agregar proveedor + URL de sala en bloque `Integración videollamadas`.
   - Verificar render de iframe + enlace externo.

6. Probar multicámara/media:
   - Agregar/quitar cámaras por URL.
   - Agregar media YouTube (embed) y enlaces genéricos/TikTok.

7. Integración OBS real:
   - Crear Browser Source en OBS con URL de `obs-browser-overlay.html`.
   - Operar desde `control-center.html`.
