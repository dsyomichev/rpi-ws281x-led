#include "ws281x.h"

lib_ws281x::ws2811_t driver;

/**
 * Driver Members
 **/

Napi::Value ws281x::get_render_wait_time(const Napi::CallbackInfo &info) {
  return Napi::Number::New(info.Env(), driver.render_wait_time);
}

Napi::Value ws281x::get_rpi_hw(const Napi::CallbackInfo &info) {
  Napi::Object rpi_hw = Napi::Object::New(info.Env());

  if (driver.rpi_hw) {
    rpi_hw.Set("type", driver.rpi_hw->type);
    rpi_hw.Set("hwver", driver.rpi_hw->hwver);
    rpi_hw.Set("periph_base", driver.rpi_hw->periph_base);
    rpi_hw.Set("videocore_base", driver.rpi_hw->videocore_base);
    rpi_hw.Set("desc", driver.rpi_hw->desc);
  }

  return rpi_hw;
}

Napi::Value ws281x::get_freq(const Napi::CallbackInfo &info) {
  return Napi::Number::New(info.Env(), driver.freq);
}

void ws281x::set_freq(const Napi::CallbackInfo &info,
                      const Napi::Value &value) {

  if (!value.IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  driver.freq = value.As<Napi::Number>().Uint32Value();
}

Napi::Value ws281x::get_dmanum(const Napi::CallbackInfo &info) {
  return Napi::Number::New(info.Env(), driver.dmanum);
}

void ws281x::set_dmanum(const Napi::CallbackInfo &info,
                        const Napi::Value &value) {
  if (!value.IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  driver.dmanum = value.As<Napi::Number>().Int32Value();
}

Napi::Value ws281x::get_channel_array(const Napi::CallbackInfo &info) {
  Napi::Array channels = Napi::Array::New(info.Env(), RPI_PWM_CHANNELS);

  for (int i = 0; i < RPI_PWM_CHANNELS; i++) {
    Napi::Object channel = Napi::Object::New(info.Env());

    Napi::PropertyDescriptor gpionum =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_gpionum,
                                           set_channel_gpionum>(
            "gpionum", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor invert =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_invert,
                                           set_channel_invert>(
            "invert", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor count =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_count,
                                           set_channel_count>(
            "count", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor strip_type =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_strip_type,
                                           set_channel_strip_type>(
            "strip_type", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor leds =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_leds,
                                           ws281x::set_channel_leds>(
            "leds", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor brightness =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_brightness,
                                           ws281x::set_channel_brightness>(
            "brightness", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor wshift =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_wshift>(
            "wshift", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor rshift =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_rshift>(
            "rshift", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor gshift =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_gshift>(
            "gshift", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor bshift =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_bshift>(
            "bshift", napi_enumerable, (int *)i);
    Napi::PropertyDescriptor gamma =
        Napi::PropertyDescriptor::Accessor<ws281x::get_channel_gamma>(
            "gamma", napi_enumerable, (int *)i);

    channel.DefineProperties({gpionum, invert, count, strip_type, leds,
                              brightness, wshift, rshift, gshift, bshift,
                              gamma});

    channels.Set(i, channel);
  }

  return channels;
}

void ws281x::init(const Napi::CallbackInfo &info) {
  lib_ws281x::ws2811_return_t result;

  result = lib_ws281x::ws2811_init(&driver);
  if (result != lib_ws281x::WS2811_SUCCESS) {
    Napi::Error::New(info.Env(), lib_ws281x::ws2811_get_return_t_str(result))
        .ThrowAsJavaScriptException();
    return;
  }
}

void ws281x::fini(const Napi::CallbackInfo &info) {
  lib_ws281x::ws2811_fini(&driver);
}

void ws281x::render(const Napi::CallbackInfo &info) {
  lib_ws281x::ws2811_return_t result;

  result = lib_ws281x::ws2811_render(&driver);
  if (result != lib_ws281x::WS2811_SUCCESS) {
    Napi::Error::New(info.Env(), lib_ws281x::ws2811_get_return_t_str(result))
        .ThrowAsJavaScriptException();
    return;
  }
}

void ws281x::wait(const Napi::CallbackInfo &info) {
  lib_ws281x::ws2811_return_t result;

  result = lib_ws281x::ws2811_wait(&driver);
  if (result != lib_ws281x::WS2811_SUCCESS) {
    Napi::Error::New(info.Env(), lib_ws281x::ws2811_get_return_t_str(result))
        .ThrowAsJavaScriptException();
    return;
  }
}

void ws281x::set_custom_gamma_factor(const Napi::CallbackInfo &info) {
  if (!info[0].IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  double factor = info[0].As<Napi::Number>().DoubleValue();

  lib_ws281x::ws2811_set_custom_gamma_factor(&driver, factor);
}

/**
 * Channel Members
 **/

Napi::Value ws281x::get_channel_gpionum(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].gpionum);
}

void ws281x::set_channel_gpionum(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();

  if (!info[0].IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  driver.channel[i].gpionum = info[0].As<Napi::Number>().Int32Value();
}

Napi::Value ws281x::get_channel_invert(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].invert);
}

void ws281x::set_channel_invert(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();

  if (!info[0].IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  driver.channel[i].invert = info[0].As<Napi::Number>().Int32Value();
}

Napi::Value ws281x::get_channel_count(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].count);
}

void ws281x::set_channel_count(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();

  if (!info[0].IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  driver.channel[i].count = info[0].As<Napi::Number>().Int32Value();
}

Napi::Value ws281x::get_channel_strip_type(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].strip_type);
}

void ws281x::set_channel_strip_type(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();

  if (!info[0].IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  driver.channel[i].strip_type = info[0].As<Napi::Number>().Int32Value();
}

Napi::Value ws281x::get_channel_leds(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  lib_ws281x::ws2811_channel_t *channel = &driver.channel[i];

  Napi::TypedArrayOf<uint32_t> leds =
      Napi::TypedArrayOf<uint32_t>::New(info.Env(), channel->count);

  for (int l = 0; l < channel->count; l++) {
    leds.Set(l, channel->leds[l]);
  }

  return leds;
}

void ws281x::set_channel_leds(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  lib_ws281x::ws2811_channel_t *channel = &driver.channel[i];

  if (!channel->leds) {
    return;
  }

  if (!info[0].IsTypedArray()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  Napi::TypedArrayOf<uint32_t> leds =
      info[0].As<Napi::TypedArrayOf<uint32_t>>();

  for (int l = 0; l < channel->count; l++) {
    channel->leds[l] = leds.Get(l).As<Napi::Number>().Uint32Value();
  }
}

Napi::Value ws281x::get_channel_brightness(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].brightness);
}

void ws281x::set_channel_brightness(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();

  if (!info[0].IsNumber()) {
    Napi::Error::New(info.Env(), "Invalid argument type.")
        .ThrowAsJavaScriptException();
    return;
  }

  driver.channel[i].brightness = info[0].As<Napi::Number>().Uint32Value();
}

Napi::Value ws281x::get_channel_wshift(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].wshift);
}

Napi::Value ws281x::get_channel_rshift(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].rshift);
}

Napi::Value ws281x::get_channel_gshift(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].gshift);
}

Napi::Value ws281x::get_channel_bshift(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  return Napi::Number::New(info.Env(), driver.channel[i].bshift);
}

Napi::Value ws281x::get_channel_gamma(const Napi::CallbackInfo &info) {
  int i = (int)info.Data();
  lib_ws281x::ws2811_channel_t *channel = &driver.channel[i];

  Napi::TypedArrayOf<uint32_t> table =
      Napi::TypedArrayOf<uint32_t>::New(info.Env(), 256);

  if (channel->gamma) {
    for (int k = 0; k < 256; k++) {
      table.Set(k, channel->gamma[k]);
    }
  }

  return table;
}

/**
 * NAPI Module Initialization
 **/

Napi::Object ws281x::Init(Napi::Env env) {

  Napi::Function func = DefineClass(
      env, "ws281x",
      {StaticAccessor<&ws281x::get_render_wait_time>("render_wait_time",
                                                     napi_default),
       StaticAccessor<&ws281x::get_rpi_hw>("rpi_hw", napi_default),
       StaticAccessor<&ws281x::get_freq, &ws281x::set_freq>("freq",
                                                            napi_default),
       StaticAccessor<&ws281x::get_dmanum, &ws281x::set_dmanum>("dmanum",
                                                                napi_default),
       StaticAccessor<&ws281x::get_channel_array>("channel_array",
                                                  napi_default),
       StaticMethod<&ws281x::init>("init", napi_default),
       StaticMethod<&ws281x::fini>("fini", napi_default),
       StaticMethod<&ws281x::render>("render", napi_default),
       StaticMethod<&ws281x::wait>("wait", napi_default),
       StaticMethod<&ws281x::set_custom_gamma_factor>("set_custom_gamma_factor",
                                                      napi_default)});

  Napi::FunctionReference *constructor = new Napi::FunctionReference();
  *constructor = Napi::Persistent(func);
  env.SetInstanceData<Napi::FunctionReference>(constructor);

  return func;
}

ws281x::ws281x(const Napi::CallbackInfo &info)
    : Napi::ObjectWrap<ws281x>(info) {}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports = ws281x::Init(env);

  return exports;
}

NODE_API_MODULE(ws281x, Init);