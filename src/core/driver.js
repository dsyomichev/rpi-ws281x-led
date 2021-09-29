import detect from 'detect-rpi';

/**
 * Mock driver objects to use when the driver has not actually been compiled.
 */
const mock_ws2811_channel = {
  gpio: 0,
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
};

const mock_ws2811 = {
  dmanum: 0,
  freq: 0,
  render_wait_time: 0,
  rpi_hw: undefined,
  channels: [mock_ws2811_channel, mock_ws2811_channel],

  fini() {},
  render() {},
  wait() {},
  set_custom_gamma_factor() {},
  init() {
    const hw = { desc: 'Invalid system.' };
    Object.defineProperty(this, 'rpi_hw', { value: hw });

    for (let i = 0; i < this.channels.length; i += 1) {
      this.channels[i].leds = new Uint32Array(this.channels[i].count);
      Object.defineProperty(this.channels[i], 'gamma', { value: new Uint32Array(256) });
    }
  },
};

if (detect() && process.getuid && process.getuid() === 0) {
  module.exports = require('bindings')('rpi_ws281x_node');
} else {
  module.exports = mock_ws2811;
}
