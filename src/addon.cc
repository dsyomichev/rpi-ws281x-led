#include <napi.h>
#include "ws281x_driver.h"

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    return WS281xDriver::Init(env, exports);
}

NODE_API_MODULE(driver, Init)