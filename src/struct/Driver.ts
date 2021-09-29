import BaseDriver from '../base/BaseDriver';
import driver from '../core/ws281x';
import Channel, { ChannelOptions } from './Channel';

export interface DriverConfiguration {
  dma?: number;
  frequency?: number;
  channels: ChannelOptions[];
}

export default class Driver {
  public readonly dma: number;

  public readonly frequency: number;

  public readonly channels: Channel[] = [];

  private readonly driver: BaseDriver = driver;

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
      this.channels.push(new Channel(this.driver, this.driver.channel_array[i], config.channels[i]));
    }

    this.driver.init();
  }

  public finalize(): void {
    driver.fini();
  }

  public render(): void {
    driver.render();
  }
}
