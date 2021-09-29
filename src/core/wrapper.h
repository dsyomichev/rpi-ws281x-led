#include <napi.h>

class Wrapper : public Napi::ObjectWrap<Wrapper>
{
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    Wrapper(const Napi::CallbackInfo &info);
};
