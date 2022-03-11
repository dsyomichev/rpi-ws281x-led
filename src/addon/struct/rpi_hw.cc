#include "rpi_hw.h"

PropertyDescriptor type_desc(void *data) {
    return PropertyDescriptor::Accessor<type_get>("type", napi_enumerable, data);
}

PropertyDescriptor hwver_desc(void *data) {
    return PropertyDescriptor::Accessor<hwver_get>("hwver", napi_enumerable, data);
}

PropertyDescriptor periph_base_desc(void *data) {
    return PropertyDescriptor::Accessor<periph_base_get>("periph_base", napi_enumerable, data);
}

PropertyDescriptor videocore_base_desc(void *data) {
    return PropertyDescriptor::Accessor<videocore_base_get>("videocore_base", napi_enumerable, data);
}

PropertyDescriptor desc_desc(void *data) {
    return PropertyDescriptor::Accessor<desc_get>("desc", napi_enumerable, data);
}

Value type_get(const CallbackInfo &info) {
    if (controller->rpi_hw == NULL) {
        return info.Env().Undefined();
    }

    return Number::New(info.Env(), controller->rpi_hw->type);
}

Value hwver_get(const CallbackInfo &info) {
    if (controller->rpi_hw == NULL) {
        return info.Env().Undefined();
    }

    return Number::New(info.Env(), controller->rpi_hw->hwver);
}

Value periph_base_get(const CallbackInfo &info) {
    if (controller->rpi_hw == NULL) {
        return info.Env().Undefined();
    }

    return Number::New(info.Env(), controller->rpi_hw->periph_base);
}

Value videocore_base_get(const CallbackInfo &info) {
    if (controller->rpi_hw == NULL) {
        return info.Env().Undefined();
    }

    return Number::New(info.Env(), controller->rpi_hw->videocore_base);
}

Value desc_get(const CallbackInfo &info) {
    if (controller->rpi_hw == NULL) {
        return info.Env().Undefined();
    } else if (controller->rpi_hw->desc == NULL) {
        return info.Env().Undefined();
    }

    return String::New(info.Env(), controller->rpi_hw->desc);
}
