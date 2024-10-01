import { CHANNELS_PINS as _CHANNELS_PINS, CHANNELS_TOTAL as _CHANNELS_TOTAL, PORT as _PORT, REQUEST_SECRET as _REQUEST_SECRET } from './env.json';

export const apps = [{
  script: 'main.js',
  watch: '.'
}, {
  script: './service-worker/',
  watch: ['./service-worker']
}];
export const deploy = {
  production: {
    REQUEST_SECRET: _REQUEST_SECRET,
    PORT: _PORT,
    CHANNELS_TOTAL: _CHANNELS_TOTAL,
    CHANNELS_PINS: _CHANNELS_PINS
  }
};
