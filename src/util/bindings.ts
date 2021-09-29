/* eslint-disable global-require */
/* eslint-disable no-console */
import isRPI from 'detect-rpi';

export default (() => {
  const stub: { [key: string]: any } = {};

  if (!isRPI()) {
    console.warn('Package is installed on an unsupported OS. A non-functional interface will be provided.');

    return stub;
  }

  if (!process.getuid || process.getuid() !== 0) {
    console.warn('The driver requires root privileges. A non-functional interface will be provided.');

    return stub;
  }

  const WS281xWrapper = require('bindings')('ws281x_wrapper');

  return new WS281xWrapper();
})();
