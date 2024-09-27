
export class Channel {
   id: number;
   status: boolean;
   gpioChannel: any;

  constructor(id: number, status: boolean = false, gpioChannel: any) {
    this.id = id;
    this.status = status;
    this.gpioChannel = gpioChannel;
  }
}
