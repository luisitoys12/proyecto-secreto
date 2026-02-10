#pragma once

#include <cstdarg>
#include <cstdio>

#ifdef __cplusplus
extern "C" {
#endif

enum obs_log_level {
    LOG_DEBUG = 100,
    LOG_INFO = 200,
    LOG_WARNING = 300,
    LOG_ERROR = 400
};

static inline void blog(int level, const char *format, ...)
{
    const char *prefix = "INFO";
    switch (level) {
    case LOG_DEBUG:
        prefix = "DEBUG";
        break;
    case LOG_INFO:
        prefix = "INFO";
        break;
    case LOG_WARNING:
        prefix = "WARNING";
        break;
    case LOG_ERROR:
        prefix = "ERROR";
        break;
    default:
        break;
    }

    std::fprintf(stderr, "[obs-fallback:%s] ", prefix);

    va_list args;
    va_start(args, format);
    std::vfprintf(stderr, format, args);
    va_end(args);

    std::fprintf(stderr, "\n");
}

#define OBS_MODULE_USE_DEFAULT_LOCALE(name, locale) \
    [[maybe_unused]] static const char *obs_fallback_locale = name ":" locale

#ifdef __cplusplus
}
#endif
