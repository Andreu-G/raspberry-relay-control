import { Controller, Get, Param, Post } from '@nestjs/common';
import { RelayService } from '../services/relay.service';


@Controller('relay')
export class RelayController {

  constructor(private readonly relayService: RelayService) {}
    @Post('enable/:id')
    enable(@Param('id') id: number) {
        console.log(`Enabling channel ${id}`);
        const status = this.relayService.enable(id);
        return status ? { message: `Channel ${id} enabled` } : { message: `Channel ${id} not found` };
    }

    @Post('disable/:id')
    disable(@Param('id') id: number) {
        console.log(`Disabling channel ${id}`);
        this.relayService.disable(id);
    }

    @Get('status/:id')
    getStatus(@Param('id') id: number) {
        console.log(`Getting status of channel ${id}`);
        return this.relayService.getStatus(id);
    }

    @Get('status-all')
    getStatusAll() {
        console.log(`Getting status of all channels`);
        return this.relayService.getStatusAll();
    }
}
