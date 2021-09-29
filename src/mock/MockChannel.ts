import BaseChannel from '../base/BaseChannel';
import StripType from '../base/StripType';

export default class MockChannel implements BaseChannel {
  public gpionum: number = 0;

  public invert: 0 | 1 = 0;

  public count: number = 0;

  public strip_type: StripType = 0;

  public leds: Uint32Array | undefined = undefined;

  public brightness: number = 0;

  public readonly wshift: number = 0;

  public readonly rshift: number = 0;

  public readonly gshift: number = 0;

  public readonly bshift: number = 0;

  public readonly gamma: Uint32Array | undefined = undefined;
}
