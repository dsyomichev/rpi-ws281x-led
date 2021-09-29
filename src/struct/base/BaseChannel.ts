import StripType from './StripType';

export default interface BaseChannel {
  get gpionum(): number;
  set gpionum(value: number);

  get invert(): 0 | 1;
  set invert(value: 0 | 1);

  get count(): number;
  set count(value: number);

  get strip_type(): StripType;
  set strip_type(value: StripType);

  get leds(): Uint32Array;
  set leds(value: Uint32Array);

  get brightness(): number;
  set brightness(value: number);

  get wshift(): number;
  get rshift(): number;
  get gshift(): number;
  get bshift(): number;
  get gamma(): Uint32Array;
}
