import BaseChannel from '../base/BaseChannel';
import BaseDriver from '../base/BaseDriver';
import StripType from '../base/StripType';

export interface ChannelOptions {
  gpio?: number;
  invert?: boolean;
  count: number;
  type?: StripType;
  brightness?: number;
}

export interface ChannelData {
  shifts: {
    w: number;
    r: number;
    g: number;
    b: number;
  };
  gamma: Uint32Array | undefined;
}

export default class Channel {
  public readonly gpio: number;

  public readonly invert: boolean;

  public readonly count: number;

  public readonly type: StripType;

  private self: BaseChannel;

  private driver: BaseDriver;

  public constructor(driver: BaseDriver, self: BaseChannel, options: ChannelOptions) {
    this.self = self;
    this.driver = driver;

    this.gpio = options.gpio || (this.driver.channel_array[0].gpionum === 18 ? 15 : 18);
    this.self.gpionum = this.gpio;

    this.invert = options.invert || false;
    this.self.invert = this.invert ? 1 : 0;

    this.count = options.count;
    this.self.count = this.count;

    this.type = options.type || StripType.WS2812_STRIP;
    this.self.strip_type = this.type;

    Object.defineProperty(this, 'self', { enumerable: false });
    Object.defineProperty(this, 'driver', { enumerable: false });
  }

  public get leds(): Uint32Array | undefined {
    return this.self.leds;
  }

  public set leds(leds: Uint32Array | undefined) {
    if (!leds) this.self.leds = new Uint32Array(this.count).fill(0x000000);
    else this.self.leds = leds;
  }

  public get brightness(): number {
    return this.self.brightness;
  }

  public set brightness(brightness: number) {
    this.self.brightness = brightness;
  }

  public get data(): ChannelData {
    return {
      shifts: {
        w: this.self.wshift,
        r: this.self.rshift,
        g: this.self.gshift,
        b: this.self.bshift,
      },
      gamma: this.self.gamma,
    };
  }
}
