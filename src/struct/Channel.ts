import driver, { rpi_ws281x_node } from '../core/rpi_ws281x_node';
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
 * Additional color data provided by the controller.
 */
export interface ChannelColorData {
  shifts: {
    w: number;
    r: number;
    g: number;
    b: number;
  };
  gamma: Uint32Array;
}

/**
 * An object used to control a single channel on the controller.
 */
export default class Channel {
  /**
   * The GPIO pin being used by this channel.
   */
  public readonly gpio: number;

  /**
   * Should the driver invert the output signal.
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
   * Array representation of the strip containing number values for each color.
   */
  public leds: Uint32Array;

  /**
   * The numerical representation of the brightness.
   */
  public brightness: number;

  /**
   * The channel number used to distinguish different channels.
   */
  private id: number;

  /**
   * The controller used to control the lightstrip.
   */
  private driver: rpi_ws281x_node = driver;

  /**
   * Creates a new Channel using the provided configuration parameters.
   *
   * @param id - The channel id on the driver that this object will wrap.
   * @param options - Configuration parameters for this channel.
   */
  public constructor(id: number, options: ChannelConfiguration) {
    this.id = id;

    this.gpio = options.gpio || (this.driver.channel[id === 0 ? 1 : 0].gpionum === 18 ? 12 : 18);
    this.driver.channel[id].gpionum = this.gpio;

    this.invert = options.invert || false;
    this.driver.channel[id].invert = this.invert ? 1 : 0;

    this.count = options.count;
    this.driver.channel[id].count = this.count;

    this.type = options.type || StripType.WS2812_STRIP;
    this.driver.channel[id].strip_type = this.type;

    this.brightness = options.brightness || 255;
    this.driver.channel[id].brightness = this.brightness;

    this.leds = new Uint32Array(this.count).fill(0x000000);

    Object.defineProperty(this, 'id', { enumerable: false });
    Object.defineProperty(this, 'driver', { enumerable: false });
  }

  /**
   * Get data provided by the driver.
   */
  public get data(): ChannelColorData {
    return {
      shifts: {
        w: this.driver.channel[this.id].wshift,
        r: this.driver.channel[this.id].rshift,
        g: this.driver.channel[this.id].gshift,
        b: this.driver.channel[this.id].bshift,
      },
      gamma: this.driver.channel[this.id].gamma || new Uint32Array(256),
    };
  }

  /**
   * Pushes this channel's led values to the strip.
   */
  public render(): void {
    this.driver.channel[this.id].brightness = this.brightness;
    this.driver.channel[this.id].leds = this.leds;
    this.driver.render();
  }
}
