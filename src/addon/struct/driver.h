#ifndef DRIVER_H
#define DRIVER_H

#include "../rpi_ws281x_node.h"

/**
 * Creates an accessor descriptor to the 'render_wait_time' property.
 **/
extern PropertyDescriptor render_wait_time_desc(void *data);

/**
 * Creates an accessor descriptor to the 'rpi_hw' property.
 **/
extern PropertyDescriptor rpi_hw_desc();

/**
 * Creates an accessor descriptor to the 'freq_desc' property.
 **/
extern PropertyDescriptor freq_desc(void *data);

/**
 * Creates an accessor descriptor to the 'dmanum' property.
 **/
extern PropertyDescriptor dmanum_desc(void *data);

/**
 * Creates an accessor descriptor to the 'channel' property.
 **/
extern PropertyDescriptor channel_desc();

/**
 * Creates an function descriptor to the 'init' function.
 **/
extern PropertyDescriptor init_desc(void *data);

/**
 * Creates an function descriptor to the 'fini' function.
 **/
extern PropertyDescriptor fini_desc(void *data);

/**
 * Creates an function descriptor to the 'render' function.
 **/
extern PropertyDescriptor render_desc(void *data);

/**
 * Creates an function descriptor to the 'wait' function.
 **/
extern PropertyDescriptor wait_desc(void *data);

/**
 * Creates an function descriptor to the 'set_custom_gamma_factor' function.
 **/
extern PropertyDescriptor set_custom_gamma_factor_desc(void *data);

/**
 * Get a value for the 'render_wait_time' property.
 **/
Value render_wait_time_get(const CallbackInfo &info);

/**
 * Get a value for the 'freq' property.
 **/
Value freq_get(const CallbackInfo &info);

/**
 * Set a value for the 'freq' property.
 **/
void freq_set(const CallbackInfo &info);

/**
 * Get a value for the 'dmanum' property.
 **/
Value dmanum_get(const CallbackInfo &info);

/**
 * Set a value for the 'dmanum' property.
 **/
void dmanum_set(const CallbackInfo &info);

/**
 * Initialize the driver. Wrapper for the 'init' function.
 **/
void init_func(const CallbackInfo &info);

/**
 * Finalize the driver. Wrapper for the 'fini' function.
 **/
void fini_func(const CallbackInfo &info);

/**
 * Render the strip. Wrapper for the 'render' function.
 **/
void render_func(const CallbackInfo &info);

/**
 * Wait for the DMA completion. Wrapper for the 'wait' function.
 **/
void wait_func(const CallbackInfo &info);

/**
 * Set a custom gamma factor. Wrapper for the 'set_custom_gamma_factor' function.
 **/
void set_custom_gamma_factor_func(const CallbackInfo &info);

#endif