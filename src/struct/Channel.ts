import { ws2811 } from 'rpi-ws281x-node';
import StripType from './StripType';
import driver from '../loader';

/**
 * Channel setup parameters.
 */
export interface ChannelConfiguration {
  gpio: number;
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
  gamma?: Uint8Array;
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
  public leds?: Uint32Array;

  /**
   * The numerical representation of the brightness.
   */
  public brightness: number;

  /**
   * The number used to distinguish different channels.
   */
  private index: number;

  /**
   * The controller used to control the lightstrip.
   */
  private driver: ws2811 = driver;

  /**
   * Creates a new Channel using the provided configuration parameters.
   *
   * @param id - The channel id on the driver that this object will wrap.
   * @param options - Configuration parameters for this channel.
   */
  public constructor(index: number, options: ChannelConfiguration) {
    this.index = index;

    this.gpio = options.gpio || 18;
    this.driver.channel[index].gpionum = this.gpio;

    this.invert = options.invert || false;
    this.driver.channel[index].invert = this.invert ? 1 : 0;

    this.count = this.gpio === 0 ? 0 : options.count;
    this.driver.channel[index].count = this.count;

    this.type = options.type || StripType.WS2812_STRIP;
    this.driver.channel[index].strip_type = this.type;

    this.brightness = options.brightness || 255;
    this.driver.channel[index].brightness = this.brightness;

    this.leds = new Uint32Array(this.count).fill(0x000000);

    Object.defineProperty(this, 'index', { enumerable: false });
    Object.defineProperty(this, 'driver', { enumerable: false });
  }

  /**
   * Get data provided by the driver.
   */
  public get data(): ChannelData {
    return {
      shifts: {
        w: this.driver.channel[this.index].wshift,
        r: this.driver.channel[this.index].rshift,
        g: this.driver.channel[this.index].gshift,
        b: this.driver.channel[this.index].bshift,
      },
      gamma: this.driver.channel[this.index].gamma || new Uint8Array(256),
    };
  }

  /**
   * Pushes this channel's led values to the strip.
   */
  public render(): void {
    this.driver.channel[this.index].brightness = this.brightness;
    this.driver.channel[this.index].leds = this.leds;
    this.driver.render();
  }

  /**
   * Shut down the driver.
   */
  public finalize(): void {
    this.driver.fini();
  }
}
