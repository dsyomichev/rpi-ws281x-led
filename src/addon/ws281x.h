#include <napi.h>

extern "C"
{
    namespace lib_ws281x
    {
#include <ws281x/ws2811.h>
#include <ws281x/pwm.h>
    }
};

class ws281x : public Napi::ObjectWrap<ws281x>
{
private:
    /**
     * Driver Members
     **/

    static Napi::Value get_render_wait_time(const Napi::CallbackInfo &info);

    static Napi::Value get_rpi_hw(const Napi::CallbackInfo &info);

    static Napi::Value get_freq(const Napi::CallbackInfo &info);
    static void set_freq(const Napi::CallbackInfo &info, const Napi::Value &value);

    static Napi::Value get_dmanum(const Napi::CallbackInfo &info);
    static void set_dmanum(const Napi::CallbackInfo &info, const Napi::Value &value);

    static Napi::Value get_channel_array(const Napi::CallbackInfo &info);

    static void init(const Napi::CallbackInfo &info);

    static void fini(const Napi::CallbackInfo &info);

    static void render(const Napi::CallbackInfo &info);

    static void wait(const Napi::CallbackInfo &info);

    static void set_custom_gamma_factor(const Napi::CallbackInfo &info);

    /**
     * Channel Members
     **/

    static Napi::Value get_channel_gpionum(const Napi::CallbackInfo &info);
    static void set_channel_gpionum(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_invert(const Napi::CallbackInfo &info);
    static void set_channel_invert(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_count(const Napi::CallbackInfo &info);
    static void set_channel_count(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_strip_type(const Napi::CallbackInfo &info);
    static void set_channel_strip_type(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_leds(const Napi::CallbackInfo &info);
    static void set_channel_leds(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_brightness(const Napi::CallbackInfo &info);
    static void set_channel_brightness(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_wshift(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_rshift(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_gshift(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_bshift(const Napi::CallbackInfo &info);

    static Napi::Value get_channel_gamma(const Napi::CallbackInfo &info);

public:
    /**
     * NAPI Module Initialization
     **/

    static Napi::Object Init(Napi::Env env);
    ws281x(const Napi::CallbackInfo &info);
};