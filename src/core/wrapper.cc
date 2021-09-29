#include "wrapper.h"

Napi::Object Wrapper::Init(Napi::Env env, Napi::Object exports)
{
    Napi::Function func = DefineClass(env, "Wrapper", {});

    Napi::FunctionReference *constructor = new Napi::FunctionReference();

    *constructor = Napi::Persistent(func);
    exports.Set("Wrapper", func);

    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return exports;
}

Wrapper::Wrapper(const Napi::CallbackInfo &info) : Napi::ObjectWrap<Wrapper>(info)
{
}
