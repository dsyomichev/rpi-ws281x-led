import { ws2811 } from '../core/driver';
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

  /**
   * Array representation of the strip containing int values for each color.
   */
  public leds: Uint32Array;

  public brightness: number;

  private id: number;

  private driver: ws2811;

  /**
   * Creates a new Channel using the provided configuration parameters.
   * @param driver - The core driver creating this channel.
   * @param self - The channel on the driver that this object will wrap.
   * @param options - Configuration parameters for this channel.
   */
  public constructor(driver: ws2811, id: number, options: ChannelOptions) {
    this.driver = driver;
    this.id = id;

    this.gpio = options.gpio || (this.driver.channels[id].gpionum === 18 ? 13 : 18);
    this.driver.channels[id].gpionum = this.gpio;

    this.invert = options.invert || false;
    this.driver.channels[id].invert = this.invert ? 1 : 0;

    this.count = options.count;
    this.driver.channels[id].count = this.count;

    this.type = options.type || StripType.WS2812_STRIP;
    this.driver.channels[id].strip_type = this.type;

    this.brightness = options.brightness || 255;
    this.driver.channels[id].brightness = this.brightness;

    this.leds = new Uint32Array(this.count);

    Object.defineProperty(this, 'id', { enumerable: false });
    Object.defineProperty(this, 'driver', { enumerable: false });
  }

  /**
   * Get other various data on the channel.
   */
  public get data(): ChannelData {
    return {
      shifts: {
        w: this.driver.channels[this.id].wshift,
        r: this.driver.channels[this.id].rshift,
        g: this.driver.channels[this.id].gshift,
        b: this.driver.channels[this.id].bshift,
      },
      gamma: this.driver.channels[this.id].gamma || new Uint32Array(256),
    };
  }

  /**
   * Drivers render method for convenience. This will call render for all channels.
   */
  public render(): void {
    this.driver.channels[this.id].brightness = this.brightness;
    this.driver.channels[this.id].leds = this.leds;
    this.driver.render();
  }
}
