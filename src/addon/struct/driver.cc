#include "driver.h"

PropertyDescriptor render_wait_time_desc(void *data) {
    return PropertyDescriptor::Accessor<render_wait_time_get>("render_wait_time", napi_enumerable, data);
}

PropertyDescriptor rpi_hw_desc() {
    return PropertyDescriptor::Value("rpi_hw", *exports_rpi_hw, napi_enumerable);
}

PropertyDescriptor freq_desc(void *data) {
    return PropertyDescriptor::Accessor<freq_get, freq_set>("freq", napi_enumerable, data);
}

PropertyDescriptor dmanum_desc(void *data) {
    return PropertyDescriptor::Accessor<dmanum_get, dmanum_set>("dmanum", napi_enumerable, data);
}

PropertyDescriptor channel_desc() {
    return PropertyDescriptor::Value("channel", *exports_channel, napi_enumerable);
}

PropertyDescriptor init_desc(void *data) {
    return PropertyDescriptor::Function("init", init_func, napi_enumerable, data);
}

PropertyDescriptor fini_desc(void *data) {
    return PropertyDescriptor::Function("fini", fini_func, napi_enumerable, data);
}

PropertyDescriptor render_desc(void *data) {
    return PropertyDescriptor::Function("render", render_func, napi_enumerable, data);
}

PropertyDescriptor wait_desc(void *data) {
    return PropertyDescriptor::Function("wait", wait_func, napi_enumerable, data);
}

PropertyDescriptor set_custom_gamma_factor_desc(void *data) {
    return PropertyDescriptor::Function("set_custom_gamma_factor", set_custom_gamma_factor_func, napi_enumerable, data);
}

Value render_wait_time_get(const CallbackInfo &info) {
    return Number::New(info.Env(), controller->render_wait_time);
}

Value freq_get(const CallbackInfo &info) {
    return Number::New(info.Env(), controller->freq);
}

void freq_set(const CallbackInfo &info) {
    controller->freq = info[0].As<Number>().Int32Value();
}

Value dmanum_get(const CallbackInfo &info) {
    return Number::New(info.Env(), controller->dmanum);
}

void dmanum_set(const CallbackInfo &info) {
    controller->dmanum = info[0].As<Number>().Int32Value();
}

void init_func(const CallbackInfo &info) {
    ws2811_return_t result = ws2811_init(controller);

    if (result != WS2811_SUCCESS) {
        Error::New(info.Env(), ws2811_get_return_t_str(result)).ThrowAsJavaScriptException();
    }
}

void fini_func(const CallbackInfo &info) {
    ws2811_fini(controller);
}

void render_func(const CallbackInfo &info) {
    ws2811_return_t result = ws2811_render(controller);

    if (result != WS2811_SUCCESS) {
        Error::New(info.Env(), ws2811_get_return_t_str(result)).ThrowAsJavaScriptException();
    }
}

void wait_func(const CallbackInfo &info) {
    ws2811_return_t result = ws2811_wait(controller);

    if (result != WS2811_SUCCESS) {
        Error::New(info.Env(), ws2811_get_return_t_str(result)).ThrowAsJavaScriptException();
    }
}

void set_custom_gamma_factor_func(const CallbackInfo &info) {
    ws2811_set_custom_gamma_factor(controller, info[0].As<Number>().DoubleValue());
}
