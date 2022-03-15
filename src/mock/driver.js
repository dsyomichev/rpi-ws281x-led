/* eslint-disable no-bitwise */

const hw = {
  type: 0,
  hwver: 0,
  periph_base: 0,
  videocore_base: 0,
  desc: 'Unsupported',
};

const channel = [
  {
    gpionum: 0,
    invert: 0,
    count: 0,
    strip_type: 0,
    leds: undefined,
    brightness: 0,
    wshift: 0,
    rshift: 0,
    gshift: 0,
    bshift: 0,
    gamma: undefined,
  },
  {
    gpionum: 0,
    invert: 0,
    count: 0,
    strip_type: 0,
    leds: undefined,
    brightness: 0,
    wshift: 0,
    rshift: 0,
    gshift: 0,
    bshift: 0,
    gamma: undefined,
  },
];

export default {
  render_wait_time: 0,
  rpi_hw: undefined,
  freq: 0,
  dmanum: 0,
  channel,

  init() {
    this.rpi_hw = hw;

    for (let i = 0; i < 2; i += 1) {
      const { count } = this.channel[i];
      this.channel[i].leds = new Uint32Array(count);

      this.channel[i].gamma = new Uint32Array(256);
      for (let k = 0; k < 256; k += 1) this.channel[i].gamma[k] = k;

      this.channel[i].wshift = (this.channel[i].strip_type >> 24) & 0xff;
      this.channel[i].rshift = (this.channel[i].strip_type >> 16) & 0xff;
      this.channel[i].gshift = (this.channel[i].strip_type >> 8) & 0xff;
      this.channel[i].bshift = (this.channel[i].strip_type >> 0) & 0xff;
    }
  },
  fini() {},
  render() {},
  wait() {},
  set_custom_gamma_factor(value) {
    for (let i = 0; i < this.channel.length; i += 1) {
      if (this.channel[i].gamma === undefined) return;

      for (let k = 0; k < 256; k += 1) {
        this.channel[i].gamma[k] = value > 0 ? Math.floor((k / 255.0) ** value * 255.0 + 0.5) : k;
      }
    }
  },
};
