# rpi-ws281x-led

A NodeJS Addon wrapper for the [rpi_ws281x](https://github.com/jgarff/rpi_ws281x) library. Contains type declarations.

## Installing

You can add this package to your own project using

```
npm install rpi-ws281x-led
```

and then importing it with

```typescript
import Driver from 'rpi-ws281x-led';
```

## Notes

- This library is meant to be used on the Raspberry PI. If the package is installed on an unsupported OS, an interface without bindings will be provided.

- Root privledges are required for the driver to work, start the nodejs process as `sudo`.

## Driver Class

### `Driver -> constructor(config: DriverConfiguration): Driver`

Creates a new Driver with the provided configuration.

**Configuration:**

```typescript
interface DriverConfiguration {
  dma?: number; // Default: 10
  frequency?: number; // Default: 800000
  channels: ChannelOptions[];
}

interface ChannelOptions {
  gpio?: number; // Default: 18 or 13
  invert?: boolean; // Default: false
  count: number;
  type?: StripType; // Default: StripType.WS2812_STRIP
  brightness?: number; // Default: 255
}
```

**Driver Configuration**

- `dma` - The DMA channel to use for the leds.
- `frequency` - The frequency of the PWM channel.

**Channel Configuration**

- `gpio` - The GPIO pin the driver should use.
- `invert` - Whether to invert the output signal.
- `count` - The number of leds to initialize the driver with.
- `type` - The type of the strip.
- `brightness` - The brighness of the strip.

A channel will be created for every object with a count in the configuration. The GPIO pin defaults to 18 and then 13 if it is taken.

**Example:**

```typescript
import Driver from 'rpi-ws281x-led';

const driver = new Driver({
  channels: [{ count: 100 }],
});
```

### `Driver -> finalize(): void`

Shut the driver down.

**Parameters:** None

**Example:**

```typescript
driver.finalize();
```

### `Driver -> render(): void`

Push the currently set brightness and leds to the actual strip.

**Parameters:** None

**Example:**

```typescript
driver.leds[10] = 0xff00ff;

driver.render();
```

## Channel Class

### `Channel -> get brighness(): number`

Returns the current brighness of the strip.

**Parameters:** None

**Example:**

```typescript
console.log(channel.brighness);
```

### `Channel -> set brighness(brighness: number)`

Set the overall brighness of the strip.

**Parameters:**

- `brighness` - A number between 0 and 255 to represent the overall brightness of the strip.

**Example:**

```typescript
channel.brighness = 64;

channel.render();
```

### `Channel -> get leds(): number`

Returns the current array of leds on strip.

**Parameters:** None

**Example:**

```typescript
console.log(channel.leds);
```

### `Channel -> set leds(leds: Uint32Array)`

Update the led values for the entire strip.

**Parameters:**

- `leds` - An array matching the size of the channels count to update with on the next render.

**Example:**

```typescript
channel.leds = new Uint32Array(100).fill(0x00ff00);

channel.render();
```

## StripType

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

## Setup Example

Setup a dual channel driver with two different types of strips.

```typescript
import Driver from 'rpi-ws281x-led';

// Create the driver. It automatically initializes the underlying components.
const driver = new Driver({
  freq: 800000,
  channels: [
    {
      gpio: 18,
      count: 100,
      type: StripType.WS2812_STRIP,
      brightness: 64,
    },
    {
      gpio: 13,
      count: 200,
      type: StripType.WS2811_STRIP_RGB,
      brightness: 255,
    },
  ],
});

const channel1 = driver.channels[0];

channel1.leds[50] = 0xffff00;

channel1.render(); // OR driver.render();
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
