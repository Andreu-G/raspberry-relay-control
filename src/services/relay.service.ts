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
    const totalChannels = process.env.CHANNELS_TOTAL;
    const channelPins = process.env.CHANNELS_PINS.split(',');

    this.channels = [];
    for (let i = 0; i < parseInt(totalChannels); i++) {
      this.channels.push({
        id: i + 1,
        status: false,
        gpioChannel: channelPins[i],
      });
    }
    console.log(
      `RelayService initialized with ${this.channels.length} channels`,
    );
  }

  enable(channelId: number): boolean {
    try {
      const relay = this.channels.find((c) => c.id == channelId);
      if (relay) {
        exec(`pinctrl set ${relay.gpioChannel} op dh`);
        relay.status = true;
        console.log(`Channel ${channelId} enabled`);
        return true;
      } else {
        console.error(`Channel ${channelId} not found`);
        return false;
      }
    } catch (error) {
      console.error(`Error enabling channel ${channelId}: ${error}`);
      return false;
    }
  }

  disable(channelId: number) {
    try {
      const relay = this.channels.find((c) => c.id == channelId);
      if (relay) {
        exec(`pinctrl set ${relay.gpioChannel} op dl`);
        relay.status = false;
        console.log(`Channel ${channelId} disabled`);
        return true;
      } else {
        console.error(`Channel ${channelId} not found`);
        return false;
      }
    } catch (error) {
      console.error(`Error disabling channel ${channelId}: ${error}`);
      return false;
    }
  }

  getStatus(channelId: number) {
    try {
      const relay = this.channels.find((c) => c.id == channelId);
      if (relay) {
        const status = exec(`pinctrl get ${relay.gpioChannel}`);
        console.log(`Channel ${channelId} status: ${status}`);
        return status;
      } else console.error(`Channel ${channelId} not found`);
      return false;
    } catch (error) {
      console.error(`Error getting status of channel ${channelId}: ${error}`);
      return false;
    }
  }
  getStatusAll() {
    return this.channels;
  }
}
