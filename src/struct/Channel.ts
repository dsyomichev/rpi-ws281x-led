import driver, { ws2811 } from '../core/driver';
import StripType from './StripType';

/**
 * Channel setup parameters.
 */
export interface ChannelConfiguration {
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
   * The number of leds on the strip.
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

  /**
   * The numerical representation of the brightness. Ranges from 0-255.
   */
  public brightness: number;

  /**
   * The channel number, either 0 or 1.
   */
  private id: number;

  /**
   * The driver wrapper.
   */
  private driver: ws2811 = driver;

  /**
   * Creates a new Channel using the provided configuration parameters.
   * @param id - The channel id on the driver that this object will wrap.
   * @param options - Configuration parameters for this channel.
   */
  public constructor(id: number, options: ChannelConfiguration) {
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
   * Get data provided by the driver.
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
   * Pushes this channel's led values to the strip.
   */
  public render(): void {
    this.driver.channels[this.id].brightness = this.brightness;
    this.driver.channels[this.id].leds = this.leds;
    this.driver.render();
  }
}
