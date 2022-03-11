#ifndef RPI_HW_H
#define RPI_HW_H

#include "../rpi_ws281x_node.h"

/**
 * Creates an accessor descriptor to the 'type' property.
 **/
extern PropertyDescriptor type_desc(void *data);

/**
 * Creates an accessor descriptor to the 'hwver' property.
 **/
extern PropertyDescriptor hwver_desc(void *data);

/**
 * Creates an accessor descriptor to the 'periph_base' property.
 **/
extern PropertyDescriptor periph_base_desc(void *data);

/**
 * Creates an accessor descriptor to the 'videocore_base' property.
 **/
extern PropertyDescriptor videocore_base_desc(void *data);

/**
 * Creates an accessor descriptor to the 'desc' property.
 **/
extern PropertyDescriptor desc_desc(void *data);

/**
 * Get a value for the 'type' property.
 **/
Value type_get(const CallbackInfo &info);

/**
 * Get a value for the 'hwver' property.
 **/
Value hwver_get(const CallbackInfo &info);

/**
 * Get a value for the 'periph_base' property.
 **/
Value periph_base_get(const CallbackInfo &info);

/**
 * Get a value for the 'videocore_base' property.
 **/
Value videocore_base_get(const CallbackInfo &info);

/**
 * Get a value for the 'desc' property.
 **/
Value desc_get(const CallbackInfo &info);

#endif