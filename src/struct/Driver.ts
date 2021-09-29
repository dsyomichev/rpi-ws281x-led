import driver, { ws2811 } from '../core/driver';
import Channel, { ChannelOptions } from './Channel';

/**
 * Configuration options for the the driver.
 */
export interface DriverConfiguration {
  dma?: number;
  frequency?: number;
  channels: ChannelOptions[];
}

/**
 * A driver to control led light strips.
 */
export default class Driver {
  /**
   * The DMA channel being used.
   */
  public readonly dma: number;

  /**
   * The frequency that has been set for PWM.
   */
  public readonly frequency: number;

  /**
   * Each channel corresponds to a strip and gpio output pin.
   */
  public readonly channels: Channel[] = [];

  private readonly driver: ws2811 = driver;

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
      this.channels.push(new Channel(this.driver, i, config.channels[i]));
    }

    this.driver.init();
  }

  /**
   * Shut down the driver. Use before exiting the program.
   */
  public finalize(): void {
    driver.fini();
  }

  /**
   * Render the current led buffers to their corresponding strips.
   */
  public render(): void {
    for (let i = 0; i < this.channels.length; i += 1) {
      this.driver.channels[i].leds = this.channels[i].leds;
    }

    driver.render();
  }
}
