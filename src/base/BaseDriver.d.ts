import BaseChannel from './BaseChannel';
import HardwareInfo from './HardwareInfo';

export default interface BaseDriver {
  dmanum: number;
  freq: number;
  readonly render_wait_time: number;
  readonly rpi_hw: HardwareInfo | undefined;
  readonly channel_array: [BaseChannel, BaseChannel];
  init(): void;
  fini(): void;
  render(): void;
  wait(): void;
  set_custom_gamma_factor(value: number): void;
}
