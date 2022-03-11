#ifndef CHANNEL_H
#define CHANNEL_H

#include "../rpi_ws281x_node.h"

/**
 * Creates an accessor descriptor to the 'gpionum' property.
 **/
extern PropertyDescriptor gpionum_desc(void *data);

/**
 * Creates an accessor descriptor to the 'invert' property.
 **/
extern PropertyDescriptor invert_desc(void *data);

/**
 * Creates an accessor descriptor to the 'count' property.
 **/
extern PropertyDescriptor count_desc(void *data);

/**
 * Creates an accessor descriptor to the 'strip_type' property.
 **/
extern PropertyDescriptor strip_type_desc(void *data);

/**
 * Creates an accessor descriptor to the 'leds' property.
 **/
extern PropertyDescriptor leds_desc(void *data);

/**
 * Creates an accessor descriptor to the 'brightness' property.
 **/
extern PropertyDescriptor brightness_desc(void *data);

/**
 * Creates an accessor descriptor to the 'wshift' property.
 **/
extern PropertyDescriptor wshift_desc(void *data);

/**
 * Creates an accessor descriptor to the 'rshift' property.
 **/
extern PropertyDescriptor rshift_desc(void *data);

/**
 * Creates an accessor descriptor to the 'gshift' property.
 **/
extern PropertyDescriptor gshift_desc(void *data);

/**
 * Creates an accessor descriptor to the 'bshift' property.
 **/
extern PropertyDescriptor bshift_desc(void *data);

/**
 * Creates an accessor descriptor to the 'gamma' property.
 **/
extern PropertyDescriptor gamma_desc(void *data);

/**
 * Get a value for the 'gpionum' property.
 **/
Value gpionum_get(const CallbackInfo &info);

/**
 * Set a value for the 'gpionum' property.
 **/
void gpionum_set(const CallbackInfo &info);

/**
 * Get a value for the 'invert' property.
 **/
Value invert_get(const CallbackInfo &info);

/**
 * Set a value for the 'invert' property.
 **/
void invert_set(const CallbackInfo &info);

/**
 * Get a value for the 'count' property.
 **/
Value count_get(const CallbackInfo &info);

/**
 * Set a value for the 'count' property.
 **/
void count_set(const CallbackInfo &info);

/**
 * Get a value for the 'strip_type' property.
 **/
Value strip_type_get(const CallbackInfo &info);

/**
 * Set a value for the 'strip_type' property.
 **/
void strip_type_set(const CallbackInfo &info);

/**
 * Get a value for the 'leds' property.
 **/
Value leds_get(const CallbackInfo &info);

/**
 * Set a value for the 'leds' property.
 **/
void leds_set(const CallbackInfo &info);

/**
 * Get a value for the 'brightness' property.
 **/
Value brightness_get(const CallbackInfo &info);

/**
 * Set a value for the 'brightness' property.
 **/
void brightness_set(const CallbackInfo &info);

/**
 * Get a value for the 'wshift' property.
 **/
Value wshift_get(const CallbackInfo &info);

/**
 * Get a value for the 'rshift' property.
 **/
Value rshift_get(const CallbackInfo &info);

/**
 * Get a value for the 'gshift' property.
 **/
Value gshift_get(const CallbackInfo &info);

/**
 * Get a value for the 'bshift' property.
 **/
Value bshift_get(const CallbackInfo &info);

/**
 * Get a value for the 'gamma' property.
 **/
Value gamma_get(const CallbackInfo &info);

#endif