import BaseDriver from '../struct/base/BaseDriver';
import BaseChannel from '../struct/base/BaseChannel';

export class MockDriver implements BaseDriver {
  public dmanum: number = 0;

  public freq: number = 80000;

  public readonly render_wait_time: number = 0;

  public readonly rpi_hw: {
    type?: number;
    hwver?: number;
    periph_base?: number;
    videocore_base?: number;
    desc?: string;
  } = {};

  public readonly channel_array: [BaseChannel, BaseChannel];

  public constructor() {
    const channel: BaseChannel = {
      gpionum: 0,
      invert: 0,
      count: 0,
      strip_type: 0,
      leds: new Uint32Array(0),
      brightness: 0,
      wshift: 0,
      rshift: 0,
      gshift: 0,
      bshift: 0,
      gamma: new Uint32Array(256),
    };
    this.channel_array = [channel, channel];
  }

  public init() {}

  public fini() {}

  public render() {}

  public wait() {}

  public set_custom_gamma_factor() {}
}

const mock: MockDriver = new MockDriver();
export default mock;
