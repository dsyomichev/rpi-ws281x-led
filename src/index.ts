import Driver, { DriverConfiguration } from './struct/Driver';
import Channel, { ChannelOptions, ChannelData } from './struct/Channel';
import { ws2811, ws2811_channel, rpi_hw } from './core/driver';
import StripType from './struct/StripType';

export default Driver;
export { DriverConfiguration, Channel, ChannelOptions, ChannelData, ws2811, ws2811_channel, rpi_hw, StripType };
