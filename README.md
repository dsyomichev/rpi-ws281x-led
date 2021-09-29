# rpi-ws281x-led

A NodeJS Addon wrapper for the [rpi_ws281x](https://github.com/jgarff/rpi_ws281x) library. Contains type declarations using Typescript.

#### **This hasn't been tested with physical lightstrips!**

## Installing

You can add this package to your own project using

```
npm install rpi-ws281x-led
```

and then importing it with

```typescript
import SingleChannelDriver, { StripType } from 'rpi-ws281x-led';
```

## Notes

- This library is meant to be used on the Raspberry PI. If the package is installed on an unsupported OS, an interface without bindings will be provided.

- Root privledges are required for the driver to work, start the nodejs process as `sudo`.

- A multi channel driver is not implemented as of this current version.

## Strip Type

The StripType enum is defined as follows. Use these values or the enum to setup the strip.

```typescript
enum StripType {
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
```

## API

### `constructor(dma, frequency, gpio, invert, count, type, brightness): SingleChannelDriver`

Creates a new SingleChannelDriver with the provided configuration.

**Parameters:**

- `dma` - The DMA channel to use for the leds.
- `frequency` - The frequency of the PWM channel.
- `gpio` - The GPIO pin the driver should use.
- `invert` - Whether to invert the output signal.
- `count` - The number of leds to initialize the driver with.
- `type` - The type of the strip.
- `brightness` - The brighness of the strip.

**Example:**

```typescript
import SingleChannelDriver, { StripType } from 'rpi-ws281x-led';

const driver = new SingleChannelDriver(10, 800000, 18, false, 100, StripType.WS2812_STRIP, 255);
```

### `get brighness(): number`

Returns the current brighness of the strip.

**Parameters:** None

**Example:**

```typescript
console.log(driver.brighness);
```

### `set brighness(brighness: number)`

Set the overall brighness of the strip.

**Parameters:**

- `brighness` - A number between 0 and 255 to represent the overall brightness of the strip.

**Example:**

```typescript
driver.brighness = 64;

driver.render();
```

### `get leds(): number`

Returns the current array of leds on strip.

**Parameters:** None

**Example:**

```typescript
console.log(driver.leds);
```

### `set leds(leds: Uint32Array)`

Update the led values for the entire strip.

**Parameters:**

- `leds` - An array matching the size of the channels count to update with on the next render.

**Example:**

```typescript
driver.leds = new Uint32Array(100).fill(0x00ff00);

driver.render();
```

### `initialize(): void`

Initialize the driver, creating the leds array.

**Parameters:** None

**Example:**

```typescript
const driver = new SingleChannelDriver(10, 800000, 18, false, 100, StripType.WS2812_STRIP, 255);

driver.initialize();
```

### `finalize(): void`

Shut the driver down.

**Parameters:** None

**Example:**

```typescript
driver.finalize();
```

### `render(): void`

Push the currently set brightness and leds to the actual strip.

**Parameters:** None

**Example:**

```typescript
driver.leds[10] = 0xff00ff;

driver.render();
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
