import { Controller, Get, Param, Post } from '@nestjs/common';
import { RelayService } from '../services/relay.service';


@Controller('relay')
export class RelayController {

  constructor(private readonly relayService: RelayService) {}
    @Post('enable/:id')
    enable(@Param('id') id: number) {
        console.log(`Enabling relay ${id}`);
        const status = this.relayService.enable(id);
        return status ? { message: `Relay ${id} enabled` } : { message: `Relay ${id} not found` };
    }

    @Post('disable/:id')
    disable(@Param('id') id: number) {
        console.log(`Disabling relay ${id}`);
        this.relayService.disable(id);
    }

    @Get('status/:id')
    getStatus(@Param('id') id: number) {
        console.log(`Getting status of relay ${id}`);
        return this.relayService.getStatus(id);
    }

}
