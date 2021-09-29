#include <napi.h>
#include "wrapper.h"

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    return Wrapper::Init(env, exports);
}

NODE_API_MODULE(wrapper, Init)
