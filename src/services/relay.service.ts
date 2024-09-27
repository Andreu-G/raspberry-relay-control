import * as dotenv from 'dotenv';
import { legacyPinMapping } from 'src/constants';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Gpio = require('onoff').Gpio;

dotenv.config();

export class RelayService {
  private channels: any[];

  constructor() {
    const legacyMode = process.env.LEGACY_MODE === 'true';
    const totalChannels = parseInt(process.env.CHANNELS_TOTAL || '0', 10);
    const channelPins = JSON.parse(process.env.CHANNELS_PINS || '[]');

    if (legacyMode) {
      console.log('Legacy mode enabled');
      for(let pin of channelPins) {
        pin = legacyPinMapping[pin] || pin;
      }
    }

    this.channels = [];
    for (let i = 0; i < totalChannels; i++) {
      this.channels.push({ id: i + 1, status: false, gpio: new Gpio(channelPins[i], 'out') });
    }
    console.log(`RelayService initialized with ${totalChannels} channels`);
  }

  enable(relayId: number): boolean {
    try {
      const relay = this.channels.find((r) => r.id === relayId);
      if (relay) {
      relay.gpio.writeSync(1);
      console.log(`Relay ${relayId} enabled`);
      return true;
    } else {
        console.error(`Relay ${relayId} not found`);
        return false;
      }
    } catch (error) {
      console.error(`Error enabling relay ${relayId}: ${error}`);
      return false;
    }
  }

  disable(relayId: number) {
    try {
      const relay = this.channels.find((r) => r.id === relayId);
      if (relay) {
      relay.gpio.writeSync(0);
      console.log(`Relay ${relayId} disabled`);
      return true;
    } else {
        console.error(`Relay ${relayId} not found`);
        return false;
      }
    } catch (error) {
      console.error(`Error disabling relay ${relayId}: ${error}`);
      return false;
    }
  }

  getStatus(relayId: number) {
    try {
      const relay = this.channels.find((r) => r.id === relayId);
      if (relay) {
      const status = relay.gpio.readSync() === 1;
      console.log(`Relay ${relayId} status: ${status}`);
      return status;
    } else {
      console.error(`Relay ${relayId} not found`);
      return false;
    }
    } catch (error) {
      console.error(`Error getting status of relay ${relayId}: ${error}`);
      return false;
    }
  }
}
