import { ws2811, ws2811_channel } from '../core/driver';
import StripType from './StripType';

/**
 * Setup parameters for a channel.
 */
export interface ChannelOptions {
  gpio?: number;
  invert?: boolean;
  count: number;
  type?: StripType;
  brightness?: number;
}

/**
 * Additional data provided by the driver.
 */
export interface ChannelData {
  shifts: {
    w: number;
    r: number;
    g: number;
    b: number;
  };
  gamma: Uint32Array;
}

/**
 * A channel object used to setup and control a light strip.
 */
export default class Channel {
  /**
   * The GPIO pin to use.
   */
  public readonly gpio: number;

  /**
   * Invert the output signal.
   */
  public readonly invert: boolean;

  /**
   * The amount of leds on the strip.
   */
  public readonly count: number;

  /**
   * Numerical constant representing the type of strip being used.
   */
  public readonly type: StripType;

  private self: ws2811_channel;

  private driver: ws2811;

  /**
   * Creates a new Channel using the provided configuration parameters.
   * @param driver - The core driver creating this channel.
   * @param self - The channel on the driver that this object will wrap.
   * @param options - Configuration parameters for this channel.
   */
  public constructor(driver: ws2811, self: ws2811_channel, options: ChannelOptions) {
    this.self = self;
    this.driver = driver;

    this.gpio = options.gpio || (this.driver.channels[0].gpionum === 18 ? 13 : 18);
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

  /**
   * Get the Uint32 representation of the light strip.
   */
  public get leds(): Uint32Array {
    if (!this.self.leds) throw new Error('Initialize the driver first.');
    return this.self.leds;
  }

  /**
   * Set the values of each led on the strip.
   */
  public set leds(leds: Uint32Array) {
    if (!this.self.leds) throw new Error('Initialize the driver first.');
    else this.self.leds = leds;
  }

  /**
   * Get the overall brightness of the strip.
   */
  public get brightness(): number {
    return this.self.brightness;
  }

  /**
   * Set the strip to the provided brightness.
   */
  public set brightness(brightness: number) {
    this.self.brightness = brightness;
  }

  /**
   * Get other various data on the channel.
   */
  public get data(): ChannelData {
    return {
      shifts: {
        w: this.self.wshift,
        r: this.self.rshift,
        g: this.self.gshift,
        b: this.self.bshift,
      },
      gamma: this.self.gamma || new Uint32Array(256),
    };
  }

  /**
   * Drivers render method for convenience. This will call render for all channels.
   */
  public render(): void {
    this.driver.render();
  }
}
