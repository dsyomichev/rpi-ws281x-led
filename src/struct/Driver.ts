import { ws2811 } from 'rpi-ws281x-node';
import Channel, { ChannelConfiguration } from './Channel';
import driver from '../loader';

/**
 * Parameters to setup the driver.
 */
export interface DriverConfiguration {
  dma?: number;
  frequency?: number;
  channels: [ChannelConfiguration] | [ChannelConfiguration, ChannelConfiguration];
}

/**
 * A driver used to setup and control led light strips.
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
  public readonly channels: [Channel] | [Channel, Channel];

  /**
   * The controller used to control the lightstrip.
   */
  private readonly driver: ws2811 = driver;

  /**
   * Creates a new light strip driver.
   * @param config - The configuration for this driver.
   */
  public constructor(options: DriverConfiguration) {
    Object.defineProperty(this, 'driver', { enumerable: false });

    this.dma = options.dma || 10;
    this.driver.dmanum = this.dma;

    this.frequency = options.frequency || 800000;
    this.driver.freq = this.frequency;

    const channels: Channel[] = [];

    for (let i = 0; i < 2; i += 1) {
      const channel: ChannelConfiguration = options.channels[i];
      // eslint-disable-next-line no-continue
      if (options.channels[i] !== undefined && !channel.gpio && i === 1) continue;
      if (channel && channel.count > 0) channels[i] = new Channel(i, channel || { count: 0, gpio: 0 });
    }

    this.channels = channels as [Channel] | [Channel, Channel];

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
