#include <obs-module.h>

OBS_MODULE_USE_DEFAULT_LOCALE("obs-broadcast-suite", "en-US");

extern "C" {

bool obs_module_load(void)
{
    blog(LOG_INFO, "[phase-1] Plugin cargado correctamente: motor base inicializado");
    return true;
}

void obs_module_unload(void)
{
    blog(LOG_INFO, "[phase-1] Plugin descargado correctamente");
}

} // extern "C"
