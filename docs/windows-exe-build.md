# Compilación y empaquetado del plugin en `.exe` para Windows

Esta guía documenta cómo generar un artefacto instalable para descarga en Windows partiendo de la FASE 1.

## Objetivo

- Compilar el plugin OBS en Windows (`obs-broadcast-suite.dll`).
- Empaquetarlo en un instalador `.exe` descargable para usuarios finales.
- Mantener cumplimiento de licencias: sin GPL/AGPL/LGPL.

---

## 1) Requisitos

- Windows 10/11.
- Visual Studio 2022 con workload **Desktop development with C++**.
- CMake >= 3.21.
- Python 3 (opcional, para pruebas locales por script).
- OBS Studio instalado en el equipo de pruebas.
- SDK/headers de OBS disponibles para compilar con `-DUSE_OBS_SDK=ON`.

> Nota: `IExpress` viene incluido en Windows; no agrega dependencia externa.

---

## 2) Compilar el plugin (x64, Release)

Desde **x64 Native Tools Command Prompt for VS 2022**:

```bat
cd C:\ruta\a\proyecto
cmake -S . -B build-win64 -G "Visual Studio 17 2022" -A x64 -DUSE_OBS_SDK=ON -DOBS_SDK_PATH=C:\ruta\a\obs-studio
cmake --build build-win64 --config Release
```

Artefacto esperado:

- `build-win64\Release\obs-broadcast-suite.dll`

---

## 3) Estructura de paquete para distribución

Crear estructura de release:

```text
release/
├── plugin/
│   └── obs-broadcast-suite.dll
├── scripts/
│   ├── install_plugin.bat
│   └── uninstall_plugin.bat
└── README-Windows.txt
```

### `install_plugin.bat` (ejemplo)

```bat
@echo off
setlocal

set "OBS_PLUGIN_DIR=%ProgramFiles%\obs-studio\obs-plugins\64bit"
if not exist "%OBS_PLUGIN_DIR%" (
  echo [ERROR] No se encontro ruta de plugins de OBS: %OBS_PLUGIN_DIR%
  exit /b 1
)

copy /Y "%~dp0..\plugin\obs-broadcast-suite.dll" "%OBS_PLUGIN_DIR%\obs-broadcast-suite.dll"
if errorlevel 1 (
  echo [ERROR] Fallo copia del plugin.
  exit /b 1
)

echo [OK] Plugin instalado en %OBS_PLUGIN_DIR%
exit /b 0
```

### `uninstall_plugin.bat` (ejemplo)

```bat
@echo off
setlocal

set "OBS_PLUGIN_DIR=%ProgramFiles%\obs-studio\obs-plugins\64bit"
del /F /Q "%OBS_PLUGIN_DIR%\obs-broadcast-suite.dll"
if exist "%OBS_PLUGIN_DIR%\obs-broadcast-suite.dll" (
  echo [ERROR] No se pudo eliminar el plugin.
  exit /b 1
)

echo [OK] Plugin desinstalado.
exit /b 0
```

---

## 4) Generar instalador `.exe` con IExpress (nativo de Windows)

### Opción GUI

1. Ejecutar `iexpress.exe`.
2. Seleccionar **Create new Self Extraction Directive file**.
3. Elegir **Extract files and run an installation command**.
4. Agregar archivos:
   - `release\plugin\obs-broadcast-suite.dll`
   - `release\scripts\install_plugin.bat`
   - `release\README-Windows.txt`
5. En *Install Program*, usar:
   - `install_plugin.bat`
6. Definir output, por ejemplo:
   - `dist\obs-broadcast-suite-installer-v0.1.0-win64.exe`

### Opción automatizada (recomendada CI)

- Guardar plantilla `.sed` versionada (por ejemplo `packaging/windows/installer.sed`).
- Invocar:

```bat
iexpress /N packaging\windows\installer.sed
```

---

## 5) Validación mínima antes de publicar

1. Instalar OBS en una VM limpia Windows x64.
2. Ejecutar instalador `.exe` como Administrador.
3. Abrir OBS y confirmar que el plugin carga sin error.
4. Revisar logs de OBS para mensajes de FASE 1:
   - `[phase-1] Plugin cargado correctamente: motor base inicializado`
   - `[phase-1] Plugin descargado correctamente`

---

## 6) Publicación en GitHub Releases

1. Crear tag semántico: `v0.1.0`.
2. Adjuntar artefactos:
   - `obs-broadcast-suite-installer-v0.1.0-win64.exe`
   - `SHA256SUMS.txt`
3. Describir notas de release (cambios y compatibilidad OBS).

---

## 7) Licencias y cumplimiento

- Esta guía evita toolchains/licencias GPL/AGPL/LGPL para el empaquetado.
- `IExpress` es componente del sistema operativo Windows.
- Dependencias del proyecto documentadas en `DEPENDENCY_LICENSES.md`.
