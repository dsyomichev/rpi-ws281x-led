#ifndef ADDON_H
#define ADDON_H

#include <napi.h>
using namespace Napi;

extern "C" {
#include <jgarff/rpi_ws281x/pwm.h>
#include <jgarff/rpi_ws281x/ws2811.h>
};

#include "struct/channel.h"
#include "struct/driver.h"
#include "struct/rpi_hw.h"

extern ws2811_t *controller;
extern Object *exports_rpi_hw;
extern Object *exports_driver;
extern Array *exports_channel;

/**
 * Initialize the object for the rpi_hw property.
 **/
void init_rpi_hw(Env env);

/**
 * Initialize the array for the channel property.
 **/
void init_channel(Env env);

/**
 * Initialize the object for the driver.
 **/
void init_driver(Env env);

/**
 * Initialize the entire exported object.
 **/
Object init_addon(Env env, Object exports);

#endif