#include "rpi_ws281x_node.h"

static ws2811_t static_controller;

ws2811_t *controller = &static_controller;
Object *exports_driver;
Object *exports_rpi_hw;
Array *exports_channel;

int id[RPI_PWM_CHANNELS];

void init_rpi_hw(Env env) {
    static Object static_rpi_hw = Object::New(env);
    exports_rpi_hw = &static_rpi_hw;

    exports_rpi_hw->DefineProperties(
        {type_desc(NULL), hwver_desc(NULL), periph_base_desc(NULL), videocore_base_desc(NULL), desc_desc(NULL)});
}

void init_channel(Env env) {
    static Array static_channel = Array::New(env, RPI_PWM_CHANNELS);
    exports_channel = &static_channel;

    for (int i = 0; i < RPI_PWM_CHANNELS; i++) {
        Object channel = Object::New(env);

        channel.DefineProperties({gpionum_desc(&id[i]), invert_desc(&id[i]), count_desc(&id[i]),
                                  strip_type_desc(&id[i]), leds_desc(&id[i]), brightness_desc(&id[i]),
                                  wshift_desc(&id[i]), rshift_desc(&id[i]), gshift_desc(&id[i]), bshift_desc(&id[i]),
                                  gamma_desc(&id[i])});

        exports_channel->Set(i, channel);
    }
}

void init_driver(Env env) {
    static Object static_driver = Object::New(env);
    exports_driver = &static_driver;

    exports_driver->DefineProperties({render_wait_time_desc(NULL), rpi_hw_desc(), freq_desc(NULL), dmanum_desc(NULL),
                                      channel_desc(), init_desc(NULL), fini_desc(NULL), render_desc(NULL),
                                      wait_desc(NULL), set_custom_gamma_factor_desc(NULL)});
};

Object init_addon(Napi::Env env, Napi::Object exports) {
    for (int i = 0; i < RPI_PWM_CHANNELS; i++) id[i] = i;

    init_rpi_hw(env);
    init_channel(env);
    init_driver(env);

    return *exports_driver;
}

NODE_API_MODULE(rpi_ws281x_node, init_addon);