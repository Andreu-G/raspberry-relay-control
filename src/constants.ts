/*
    We are using constants instead of env due to pm2 not loading env correctly in Raspberry Pi. Pull requests to fix this issue are most welcome.
*/
export const REQUEST_SECRET = '12345678';
export const PORT = 3000;
export const CHANNELS_TOTAL = 4;
export const CHANNELS_PINS = [4, 6, 22, 26];
