import BaseChannel from './BaseChannel';

export default interface BaseDriver {
  get dmanum(): number;
  set dmanum(value: number);

  get freq(): number;
  set freq(value: number);

  get render_wait_time(): number;

  get rpi_hw(): {
    type?: number;
    hwver?: number;
    periph_base?: number;
    videocore_base?: number;
    desc?: string;
  };

  get channel_array(): [BaseChannel, BaseChannel];

  init(): void;
  fini(): void;
  render(): void;
  wait(): void;
  set_custom_gamma_factor(factor: number): void;
}
