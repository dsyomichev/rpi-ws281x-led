#ifndef WS_DRIVER_H
#define WS_DRIVER_H

#include <napi.h>

class WS281xDriver : public Napi::ObjectWrap<WS281xDriver>
{
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    WS281xDriver(const Napi::CallbackInfo &info);
};

#endif