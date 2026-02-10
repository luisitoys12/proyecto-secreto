cmake_minimum_required(VERSION 3.21)

project(obs_broadcast_suite_plugin VERSION 0.1.0 LANGUAGES CXX)

option(USE_OBS_SDK "Build against a real OBS Studio SDK" OFF)

add_library(obs-broadcast-suite MODULE
    src/plugin_main.cpp
)

target_compile_features(obs-broadcast-suite PRIVATE cxx_std_17)

target_compile_options(obs-broadcast-suite PRIVATE
    $<$<CXX_COMPILER_ID:GNU,Clang>:-Wall -Wextra -Wpedantic -Werror>
    $<$<CXX_COMPILER_ID:MSVC>:/W4 /WX>
)

if(USE_OBS_SDK)
    if(NOT DEFINED OBS_SDK_PATH)
        message(FATAL_ERROR "USE_OBS_SDK=ON requiere -DOBS_SDK_PATH=<ruta al SDK de OBS>")
    endif()

    target_include_directories(obs-broadcast-suite PRIVATE
        "${OBS_SDK_PATH}/libobs"
    )
else()
    target_include_directories(obs-broadcast-suite PRIVATE
        "${CMAKE_CURRENT_SOURCE_DIR}/third_party/obs_fallback"
    )
    target_compile_definitions(obs-broadcast-suite PRIVATE OBS_FALLBACK_MODE=1)
endif()

set_target_properties(obs-broadcast-suite PROPERTIES
    PREFIX ""
    OUTPUT_NAME "obs-broadcast-suite"
)
