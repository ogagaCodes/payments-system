import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';


import { JwtAuthGuard } from '@app/common';
import { InitiatePayment } from './dto/initiate_payment.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Payment Initiated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: InitiatePayment,
     description: 'Json structure for expected body request',
  })
  @UseGuards(JwtAuthGuard)
  async createSingleWallet(@Body() request: InitiatePayment, @Req() req: any) {
    return this.paymentsService.fundWallet(request);
  }
}