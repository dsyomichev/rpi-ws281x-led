import driver, { rpi_ws281x_node } from '../core/rpi_ws281x_node';
import Channel, { ChannelConfiguration } from './Channel';

/**
 * Parameters to setup the driver.
 */
export interface DriverConfiguration {
  dma?: number;
  frequency?: number;
  channels: [ChannelConfiguration] | [ChannelConfiguration, ChannelConfiguration];
}

/**
 * A driver used to setup and  control led light strips.
 */
export default class Driver {
  /**
   * The DMA channel being used.
   */
  public readonly dma: number;

  /**
   * The frequency for PWM.
   */
  public readonly frequency: number;

  /**
   * Array of each channel object.
   */
  public readonly channels: Channel[] = [];

  /**
   * The driver wrapper.
   */
  private readonly driver: rpi_ws281x_node = driver;

  /**
   * Creates a new light strip driver.
   * @param config - The configuration for this driver.
   */
  public constructor(config: DriverConfiguration) {
    Object.defineProperty(this, 'driver', { enumerable: false });

    this.dma = config.dma || 10;
    this.driver.dmanum = this.dma;

    this.frequency = config.frequency || 800000;
    this.driver.freq = this.frequency;

    if (config.channels.length < 1 || config.channels.length > 2) {
      throw new Error('Invalid number of channels to create.');
    }

    for (let i = 0; i < config.channels.length; i += 1) {
      this.channels.push(new Channel(i, config.channels[i]));
    }

    this.driver.init();
  }

  /**
   * Shut down the driver. Use before exiting the program.
   */
  // eslint-disable-next-line class-methods-use-this
  public finalize(): void {
    driver.fini();
  }

  /**
   * Render the current led buffers to their corresponding strips.
   */
  public render(): void {
    for (let i = 0; i < this.channels.length; i += 1) {
      this.driver.channel[i].leds = this.channels[i].leds;
      this.driver.channel[i].brightness = this.channels[i].brightness;
    }

    driver.render();
  }
}
