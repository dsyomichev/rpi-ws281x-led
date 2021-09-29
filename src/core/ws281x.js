import isRPI from 'detect-rpi';
import StripType from '../struct/base/StripType';
import mock from './mock';

const supported = isRPI() && process.getuid && process.getuid() === 0;

if (supported) {
  // eslint-disable-next-line global-require
  const driver = require('bindings')('ws281x');
  if (driver.path) delete driver.path;

  module.exports = driver;
} else {
  module.exports = mock;
}

module.exports.StripType = StripType;
