#include "ws281x_driver.h"

Napi::Object WS281xDriver::Init(Napi::Env env, Napi::Object exports)
{
    Napi::Function func = DefineClass(env, "WSDriver", {});

    Napi::FunctionReference *constructor = new Napi::FunctionReference();

    *constructor = Napi::Persistent(func);
    exports.Set("WS281xDriver", func);

    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return exports;
}

WS281xDriver::WS281xDriver(const Napi::CallbackInfo &info) : Napi::ObjectWrap<WS281xDriver>(info)
{
    Napi::Env env = info.Env();
}