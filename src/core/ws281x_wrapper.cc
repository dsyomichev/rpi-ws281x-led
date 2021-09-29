#include <napi.h>

extern "C"
{
#include <ws281x/ws2811.h>
};

class WS281xWrapper : public Napi::ObjectWrap<WS281xWrapper>
{
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    WS281xWrapper(const Napi::CallbackInfo &info);
};

Napi::Object WS281xWrapper::Init(Napi::Env env, Napi::Object exports)
{
    Napi::Function func = DefineClass(env, "WS281xWrapper", {});

    Napi::FunctionReference *constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);

    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return func;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    return WS281xWrapper::Init(env, exports);
}

NODE_API_MODULE(ws281x_wrapper, Init)
