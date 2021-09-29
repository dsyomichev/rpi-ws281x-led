/**
 * Represents the core of the driver. This structure is as close to 1:1 with the C driver.
 */
export interface ws2811 {
  readonly render_wait_time: number;
  readonly rpi_hw: rpi_hw | undefined;
  freq: number;
  dmanum: number;
  readonly channels: [ws2811_channel, ws2811_channel];
  init(): void;
  fini(): void;
  render(): void;
  wait(): void;
  set_custom_gamma_factor(value: number): void;
}

/**
 * Represents a channel within the driver. Each channel is setup and modified through these values.
 */
export interface ws2811_channel {
  gpionum: number;
  invert: 0 | 1;
  count: number;
  strip_type: number;
  leds: Uint32Array | undefined;
  brightness: number;
  readonly wshift: number;
  readonly rshift: number;
  readonly gshift: number;
  readonly bshift: number;
  readonly gamma: Uint32Array | undefined;
}

/**
 * Represents the Raspberry Pi hardware information stored in the driver.
 */
export interface rpi_hw {
  readonly type: number;
  readonly hwver: number;
  readonly periph_base: number;
  readonly videocore_base: number;
  readonly desc: string;
}

/**
 * The driver object that is exposed through the addon.
 */
declare const driver: ws2811;
export default driver;
