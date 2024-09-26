
export class Channel {
   id: number;
   status: boolean;
   gpio: any;

  constructor(id: number, status: boolean = false, gpio: any) {
    this.id = id;
    this.status = status;
    this.gpio = gpio;
  }
}
