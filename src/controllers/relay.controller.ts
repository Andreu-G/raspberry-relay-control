import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RequestGuard } from 'src/guards/request.guard';
import { RelayService } from '../services/relay.service';

@Controller('relay')
export class RelayController {
  constructor(private readonly relayService: RelayService) {}
  @Post('enable/:id')
  @UseGuards(RequestGuard)
  enable(@Param('id') id: number) {
    console.log(`Enabling channel ${id}`);
    const status = this.relayService.enable(id);
    return status
      ? { message: `Channel ${id} enabled` }
      : { message: `Channel ${id} not found` };
  }

  @Post('disable/:id')
  @UseGuards(RequestGuard)
  disable(@Param('id') id: number) {
    console.log(`Disabling channel ${id}`);
    const status = this.relayService.disable(id);
    return status
      ? { message: `Channel ${id} disabled` }
      : { message: `Channel ${id} not found` };
  }

  @Get('status/:id')
  @UseGuards(RequestGuard)
  getStatus(@Param('id') id: number) {
    console.log(`Getting status of channel ${id}`);
    const status = this.relayService.getStatus(id);
    return status
      ? { message: `Channel ${id} is ${status}` }
      : { message: `Channel ${id} not found` };
  }

  @Get('status-all')
  @UseGuards(RequestGuard)
  getStatusAll() {
    console.log(`Getting status of all channels`);
    return this.relayService.getStatusAll();
  }
}
