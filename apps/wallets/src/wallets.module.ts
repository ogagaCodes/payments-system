import { Module } from '@nestjs/common';
import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { WalletsController } from './wallets.controller';
import { WalletService } from './wallets.service';
import { Wallet } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactions } from './entities/transactions.entity';
import { WalletFrequencyCounter } from './entities/operation_tracker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransactions, WalletFrequencyCounter]),
    DatabaseModule,
    // RmqModule.register({
    //   name: BILLING_SERVICE,
    // }),
    AuthModule,
],
  controllers: [WalletsController],
  providers: [WalletService],
})
export class WalletsModule {
}
