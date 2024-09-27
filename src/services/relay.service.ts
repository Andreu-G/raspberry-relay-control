import { exec } from 'child_process';

import * as dotenv from 'dotenv';
dotenv.config();

/*
We decided to use exec instead of the onoff library due to /sys/class/gpio being deprecated, which is the API that onoff still uses. Other libraries also suffer from this issue.
Pull requests to fix this issue are most welcome.
*/

export class RelayService {
  private channels: any[];

  constructor() {
    const totalChannels = parseInt(process.env.CHANNELS_TOTAL || '0', 10);
    const channelPins = JSON.parse(process.env.CHANNELS_PINS || '[]');

    this.channels = [];
    for (let i = 0; i <= totalChannels; i++) {
      this.channels.push({ id: i, status: false, gpioChannel: channelPins[i]});
    }
    console.log(`RelayService initialized with ${totalChannels} channels`);
  }

  enable(relayId: number): boolean {
    try {
      const relay = this.channels.find((r) => r.id === relayId);
      if (relay) {
      exec(`pinctrl set ${relay.gpioChannel} op dh`);
      relay.status = true;
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
      exec(`pinctrl set ${relay.gpioChannel} op dl`);
      relay.status = false;
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
      const status = exec(`pinctrl get ${relay.gpioChannel}`);
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
