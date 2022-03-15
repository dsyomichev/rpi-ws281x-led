# rpi-ws281x-led

An extremely easy to use ws281x strip controller for NodeJS. Implements the [rpi-ws281x-node](https://github.com/dsyomichev/rpi-ws281x-node) wrapper and the [rpi_ws281x](https://github.com/jgarff/rpi_ws281x) library.

## Installing

You can add this package to your own project using npm.

```
$ npm install rpi-ws281x-led
```

Then load it into your own project. This project includes type declarations for Typescript.

```typescript
import Driver from 'rpi-ws281x-led';

/* OR */

const Driver = require('rpi-ws281x-led').default;
```

## Notes

- This project is intended to be compiled on a Raspberry Pi device. On unsupported platforms, an unbound interface is provided.

- Root priveledges are required to acces PWM channels. Start the process as `sudo`.

## Driver

### `constructor(config: DriverConfiguration): Driver`

Creates a new driver with the provided configuration. Stores the array of channels with which to modify the strip.

**Params:**

- `config` - The configurations for the driver.

**Driver Configuration**

- `dma` - The DMA channel to use for the leds.
- `frequency` - The frequency of the PWM channel.
- `channels` - An array of ChannelConfiguration objects.

A channel will be created for every object with a count in the configuration. The default GPIO pin for the first channel is 18. If the second channel is not provided a GPIO, it will not be used.

### `Driver -> fini()`

Frees the memory associated with the driver. The current object can be garbage collected, and a new driver can be created using the constructor.

### `Driver -> render()`

The `leds` property of each channel will be read. The buffers are copied at this point so any invalid inputs, such as an invalid length, will throw an error. The length of the buffer must match the count property, and the property must be of type Uint32Array.

## Channel

### `constructor(config: ChannelConfiguration): Channel`

Creates a new channel with the provided configuration.

**Channel Configuration**

- `gpio?` - The GPIO pin the driver should use.
- `invert?` - Whether to invert the output signal.
- `count` - The number of leds to initialize the driver with.
- `type?` - The type of the strip.
- `brightness?` - The brighness of the strip.

### `Channel -> get data(): ChannelData`

Returns the driver provided data for the channel. This inludes a gamma table and rgbw shifts.

### `Channel -> fini(): void`

Frees the memory associated with the driver. The current driver can be garbage collected, and a new driver can be created using the constructor. This will free the other channel as well.

### `Channel -> render(): void`

The `leds` property of this channel will be read. The buffer is copied at this point so any invalid input, such as an invalid length, will throw an error. The length of the buffer must match the count property, and the property must be of type UInt32Array.

## StripType

An enum containing the various strip types the rpi_ws281x library supports.

## Tested Devices

- Raspberry Pi 3b v1.2

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
