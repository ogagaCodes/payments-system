import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { WalletDTO } from './dto/wallet.dto';
import { BulkCreateWalletDTO } from './dto/bulk_create.dto';
import { WalletTransferDTO } from './dto/wallet_transfer.dto';

import { WalletService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSingleWallet(@Body() request: WalletDTO, @Req() req: any) {
    return this.walletsService.createWallet(request);
  }

  @Post("/bulk-create")
  @UseGuards(JwtAuthGuard)
  async bulkCreateWaklle(@Body() request: BulkCreateWalletDTO, @Req() req: any) {
    return this.walletsService.bulkCreateWallet(request);
  }

  @Post("/transfer")
  @UseGuards(JwtAuthGuard)
  async transfer(@Body() request: WalletTransferDTO, @Req() req: any) {
    return this.walletsService.walletTransfer(request);
  }
}