export enum StripType {
  SK6812_STRIP_RGBW = 0x18100800,
  SK6812_STRIP_RBGW = 0x18100008,
  SK6812_STRIP_GRBW = 0x18081000,
  SK6812_STRIP_GBRW = 0x18080010,
  SK6812_STRIP_BRGW = 0x18001008,
  SK6812_STRIP_BGRW = 0x18000810,
  SK6812_SHIFT_WMASK = 0xf0000000,
  WS2811_STRIP_RGB = 0x00100800,
  WS2811_STRIP_RBG = 0x00100008,
  WS2811_STRIP_GRB = 0x00081000,
  WS2811_STRIP_GBR = 0x00080010,
  WS2811_STRIP_BRG = 0x00001008,
  WS2811_STRIP_BGR = 0x00000810,
  WS2812_STRIP = WS2811_STRIP_GRB,
  SK6812_STRIP = WS2811_STRIP_GRB,
  SK6812W_STRIP = SK6812_STRIP_GRBW,
}

export default class SingleChannelDriver {
  readonly gpio: number;

  readonly invert: boolean;

  readonly count: number;

  readonly type: StripType;

  get leds(): Uint32Array;
  set leds(leds: Uint32Array);
  get brightness(): number;
  set brightness(brightness: number);
  constructor(
    dma: number,
    frequency: number,
    gpio: number,
    invert: boolean,
    count: number,
    type: StripType,
    brightness: number
  );
}
