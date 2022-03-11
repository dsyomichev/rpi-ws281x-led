#include "channel.h"

PropertyDescriptor gpionum_desc(void *data) {
    return PropertyDescriptor::Accessor<gpionum_get, gpionum_set>("gpionum", napi_enumerable, data);
}

PropertyDescriptor invert_desc(void *data) {
    return PropertyDescriptor::Accessor<invert_get, invert_set>("invert", napi_enumerable, data);
}

PropertyDescriptor count_desc(void *data) {
    return PropertyDescriptor::Accessor<count_get, count_set>("count", napi_enumerable, data);
}

PropertyDescriptor strip_type_desc(void *data) {
    return PropertyDescriptor::Accessor<strip_type_get, strip_type_set>("strip_type", napi_enumerable, data);
}

PropertyDescriptor leds_desc(void *data) {
    return PropertyDescriptor::Accessor<leds_get, leds_set>("leds", napi_enumerable, data);
}

PropertyDescriptor brightness_desc(void *data) {
    return PropertyDescriptor::Accessor<brightness_get, brightness_set>("brightness", napi_enumerable, data);
}

PropertyDescriptor wshift_desc(void *data) {
    return PropertyDescriptor::Accessor<wshift_get>("wshift", napi_enumerable, data);
}

PropertyDescriptor rshift_desc(void *data) {
    return PropertyDescriptor::Accessor<rshift_get>("rshift", napi_enumerable, data);
}

PropertyDescriptor gshift_desc(void *data) {
    return PropertyDescriptor::Accessor<gshift_get>("gshift", napi_enumerable, data);
}

PropertyDescriptor bshift_desc(void *data) {
    return PropertyDescriptor::Accessor<bshift_get>("bshift", napi_enumerable, data);
}

PropertyDescriptor gamma_desc(void *data) {
    return PropertyDescriptor::Accessor<gamma_get>("gamma", napi_enumerable, data);
}

Value gpionum_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].gpionum);
}

void gpionum_set(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    controller->channel[*i].gpionum = info[0].As<Number>().Int32Value();
}

Value invert_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].invert);
}

void invert_set(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    controller->channel[*i].invert = info[0].As<Number>().Int32Value();
}

Value count_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].count);
}

void count_set(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    controller->channel[*i].count = info[0].As<Number>().Int32Value();
}

Value strip_type_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].strip_type);
}

void strip_type_set(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    controller->channel[*i].strip_type = info[0].As<Number>().Int32Value();
}

Value leds_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    ws2811_channel_t *channel = &controller->channel[*i];

    if (!channel->leds) {
        return info.Env().Undefined();
    }

    TypedArrayOf<uint32_t> leds = TypedArrayOf<uint32_t>::New(info.Env(), channel->count);

    for (int l = 0; l < channel->count; l++) {
        leds.Set(l, channel->leds[l]);
    }

    return leds;
}

void leds_set(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    ws2811_channel_t *channel = &controller->channel[*i];

    if (!channel->leds) {
        return;
    }

    TypedArrayOf<uint32_t> leds = info[0].As<TypedArrayOf<uint32_t>>();

    for (int l = 0; l < channel->count; l++) {
        channel->leds[l] = leds.Get(l).As<Number>().Uint32Value();
    }
}

Value brightness_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].brightness);
}

void brightness_set(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    controller->channel[*i].brightness = info[0].As<Number>().Int32Value();
}

Value wshift_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].wshift);
}

Value rshift_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].rshift);
}

Value gshift_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].gshift);
}

Value bshift_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    return Number::New(info.Env(), controller->channel[*i].bshift);
}

Value gamma_get(const CallbackInfo &info) {
    int *i = (int *)info.Data();
    ws2811_channel_t *channel = &controller->channel[*i];

    if (!channel->gamma) {
        return info.Env().Undefined();
    }

    TypedArrayOf<uint32_t> gamma = TypedArrayOf<uint32_t>::New(info.Env(), 256);

    for (int k = 0; k < 256; k++) {
        gamma.Set(k, channel->gamma[k]);
    }

    return gamma;
}
