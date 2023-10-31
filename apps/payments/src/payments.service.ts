import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';

// external libraries

// DTOs
import { InitiatePayment } from './dto/initiate_payment.dto';

// entities

import { Wallet } from '@app/wallets/entities/wallet.entity';
import { WalletTransactions } from '@app/wallets/entities/transactions.entity';
import { WalletFrequencyCounter } from '@app/wallets/entities/operation_tracker.entity';
@Injectable()
export class PaymentsService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async fundWallet(
    initiatePayment: InitiatePayment,
  ): Promise<Object> {
    // convert amount to naira[defaul currency]
    const amount : number = initiatePayment.amount * 100;
        // request body from the clients
        const email = initiatePayment.email;
        // params
        const params = JSON.stringify({
          "email": email,
          "amount": amount * 100
        })
        const url = 'api.paystack.co/transaction/initialize';
        const headersRequest = {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer sk_test_a58a6242b497fc8bcfdf5d94f290a17f7f63a8f6`,  // TODO::: To be aaded to an env
      };
      
      const result = await this.httpService.post(url, params, { headers: headersRequest });
    return result;
  }

  async verifyTransactionsTransaction(
    transaction_ref: string,
  ): Promise<Object> {
    const transaction = new WalletTransactions();


    return {};
  }

  async retryTopUp(
    transaction_ref,
  ): Promise<Object> {
    // TODO:::: payment status
    // TODO: Check retry count
    // Update trasnactions as appropriate

    return {};
  }
}
