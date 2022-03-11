/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */

module.exports = {
  render_wait_time: 0,
  rpi_hw: {
    type: undefined,
    hwver: undefined,
    periph_base: undefined,
    videocore_base: undefined,
    desc: undefined,
  },
  freq: 0,
  dmanum: 0,
  channel: [
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
  ],

  init() {
    this.rpi_hw = {
      type: -1,
      hwver: -1,
      periph_base: -1,
      videocore_base: -1,
      desc: 'unsupported os',
    };

    this.channel.map((channel) => {
      channel.leds = new Uint32Array(channel.count).fill(0x000000);
      channel.gamma = new Uint32Array(256);
      for (let i = 0; i < 256; i += 1) channel.gamma[i] = i;

      channel.wshift = (this.strip_type >> 24) & 0xff;
      channel.rshift = (this.strip_type >> 16) & 0xff;
      channel.gshift = (this.strip_type >> 8) & 0xff;
      channel.bshift = (this.strip_type >> 0) & 0xff;

      return channel;
    });
  },
  fini: () => {},
  render: () => {},
  wait: () => {},
  set_custom_gamma_factor(value) {
    this.channel.map((channel) => {
      if (channel.gamma === undefined) return channel;

      for (let i = 0; i < 256; i += 1) channel.gamma[i] = value > 0 ? (i / 255.0) ** value * 255.0 + 0.5 : i;

      return channel;
    });
  },
};
