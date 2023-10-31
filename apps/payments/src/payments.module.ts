import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { RmqModule, DatabaseModule, AuthModule } from '@app/common';
import { LoggerService } from '@app/common/logger/logger.service';
// import { LocalStrategy } from './strategies/local.strategy';
import { WalletsModule } from '@app/wallets/wallets.module'; 

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    WalletsModule,
    RmqModule,
    AuthModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, LoggerService],
})

export class PaymentsModule {}
