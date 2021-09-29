import rpi from 'detect-rpi';
import MockDriver from '../mock/MockDriver';

if (rpi() && process.getuid && process.getuid() === 0) {
  module.exports = require('bindings')('ws281x');
} else {
  module.exports = new MockDriver();
}
