import BaseDriver from '../base/BaseDriver';
import BaseChannel from '../base/BaseChannel';
import HardwareInfo from '../base/HardwareInfo';
import MockChannel from './MockChannel';

export default class MockDriver implements BaseDriver {
  public dmanum: number = 0;

  public freq: number = 0;

  public readonly render_wait_time: number = 0;

  public readonly rpi_hw: HardwareInfo | undefined = undefined;

  public readonly channel_array: [BaseChannel, BaseChannel] = [new MockChannel(), new MockChannel()];

  public init(): void {
    const hw: HardwareInfo = {
      type: -1,
      hwver: -1,
      periph_base: -1,
      videocore_base: -1,
      desc: 'Invalid system.',
    };

    Object.defineProperty(this, 'rpi_hw', { value: hw });

    for (let i = 0; i < this.channel_array.length; i += 1) {
      this.channel_array[i].leds = new Uint32Array(this.channel_array[i].count);

      Object.defineProperty(this.channel_array[i], 'gamma', { value: new Uint32Array(256) });
    }
  }

  public fini(): void {}

  public render(): void {}

  public wait(): void {}

  public set_custom_gamma_factor(): void {}
}
