import StripType from './StripType';

export default interface BaseChannel {
  gpionum: number;
  invert: 0 | 1;
  count: number;
  strip_type: StripType;
  leds: Uint32Array | undefined;
  brightness: number;
  readonly wshift: number;
  readonly rshift: number;
  readonly gshift: number;
  readonly bshift: number;
  readonly gamma: Uint32Array | undefined;
}
