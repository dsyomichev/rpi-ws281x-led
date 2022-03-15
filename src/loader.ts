import driver, { ws2811 } from 'rpi-ws281x-node';
import detect from 'detect-rpi';
import mock from './mock/driver';

let intermediate: ws2811;

if (detect() && process.getuid && process.getuid() === 0 && Object.keys(driver).length !== 0) {
  intermediate = driver;
} else {
  intermediate = mock as ws2811;
}

const final: ws2811 = intermediate;

export default final;
