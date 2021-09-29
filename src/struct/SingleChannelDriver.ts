import { BaseChannel, StripType } from '../core/ws281x';
import BaseDriver from './Driver';

export default class SingleChannelDriver extends BaseDriver {
  public readonly gpio: number;

  public readonly invert: boolean;

  public readonly count: number;

  public readonly type: StripType;

  private readonly channel: BaseChannel;

  public get leds(): Uint32Array {
    return this.channel.leds;
  }

  public set leds(leds: Uint32Array) {
    this.channel.leds = leds;
  }

  public get brightness(): number {
    return this.channel.brightness;
  }

  public set brightness(brightness: number) {
    this.channel.brightness = brightness;
  }

  public constructor(
    dma: number,
    frequency: number,
    gpio: number,
    invert: boolean,
    count: number,
    type: StripType,
    brightness: number
  ) {
    super(dma, frequency);

    // eslint-disable-next-line prefer-destructuring
    this.channel = this.driver.channel_array[0];

    this.channel.gpionum = gpio;
    this.gpio = gpio;

    this.channel.invert = invert ? 1 : 0;
    this.invert = invert;

    this.channel.count = count;
    this.count = count;

    this.channel.strip_type = type;
    this.type = type;

    this.channel.brightness = brightness;

    Object.defineProperty(this, 'channel', { enumerable: false });
  }
}
