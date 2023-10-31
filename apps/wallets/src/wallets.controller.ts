import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { WalletDTO } from './dto/wallet.dto';
import { BulkCreateWalletDTO } from './dto/bulk_create.dto';
import { WalletTransferDTO } from './dto/wallet_transfer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletService } from './wallets.service';
import { WebHookDTO } from './dto/webhook.dto';


@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Wallet successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: WalletDTO,
     description: 'Json structure for expected body request',
  })
  @UseGuards(JwtAuthGuard)
  async createSingleWallet(@Body() request: WalletDTO, @Req() req: any) {
    return this.walletsService.createWallet(request);
  }


  @ApiResponse({ status: 201, description: 'Wallets successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: BulkCreateWalletDTO,
     description: 'Json structure for expected body request',
  })
  @Post("/bulk-create")
  @UseGuards(JwtAuthGuard)
  async bulkCreateWaklle(@Body() request: BulkCreateWalletDTO, @Req() req: any) {
    return this.walletsService.bulkCreateWallet(request);
  }


  @ApiResponse({ status: 201, description: 'Transfer Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: WalletTransferDTO,
     description: 'Json structure for expected body request',
  })
  @Post("/transfer")
  @UseGuards(JwtAuthGuard)
  async transfer(@Body() request: WalletTransferDTO, @Req() req: any) {
    return this.walletsService.walletTransfer(request);
  }

  @Post("/paystack-webhook")
  async webhook(@Body() request: WebHookDTO, @Req() req: any) {
    return this.walletsService.webHookListener(request);
  }
}