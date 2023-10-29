import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletDTO } from './dto/wallet.dto';
import { BulkCreateWalletDTO } from './dto/bulk_create.dto';
import { WalletTransactionsDTO } from './dto/transactions.dto';
import { OperationTrackerDTO } from './dto/operation_tracker.dto';
import { CreditWalletDTO } from './dto/credit_wallet.dto';
import { DebitWalletDTO } from './dto/debit_wallet.dto';
import { WalletTransferDTO } from './dto/wallet_transfer.dto';

import { Wallet } from './entities/wallet.entity';
import { WalletTransactions } from './entities/transactions.entity';
import { WalletFrequencyCounter } from './entities/operation_tracker.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(WalletTransactions)
    private transactionRepository: Repository<WalletTransactions>,
    @InjectRepository(WalletFrequencyCounter)
    private operationCounterRepository: Repository<WalletFrequencyCounter>,
  ) {}

  createWallet(walletDto: WalletDTO): Promise<Wallet> {
    const wallet = new Wallet();
    wallet.user_phone_number = walletDto.user_phone_number;
    wallet.user_id = walletDto.user_id;
    wallet.currency = walletDto.currency;

    return this.walletRepository.save(wallet);
  }

  async bulkCreateWallet(
    bulkCreateWalletDTO: BulkCreateWalletDTO,
  ): Promise<Wallet[]> {
    const wallets: any[] = [];

    for (let i = 0; i < bulkCreateWalletDTO.number_of_wallets; i++) {
      const wallet = new Wallet();
      wallet.user_phone_number = bulkCreateWalletDTO.user_phone_number;
      wallet.user_id = bulkCreateWalletDTO.user_id;
      wallet.currency = bulkCreateWalletDTO.currency;

      const new_wallet = this.walletRepository.save(wallet);
      wallets.push(new_wallet);
    }

    return wallets;
  }

  createWalletTransaction(
    transactionDto: WalletTransactionsDTO,
  ): Promise<WalletTransactions> {
    const transaction = new WalletTransactions();

    transaction.user_id = transactionDto.user_id;
    transaction.user_phone_number = transactionDto.user_phone_number;
    transaction.funding_origin = transactionDto.funding_origin;
    transaction.amount = transactionDto.amount;
    transaction.current_balance = transactionDto.current_balance;
    transaction.previous_balance = transactionDto.previous_balance;
    transaction.transaction_type = transactionDto.transaction_type;

    return this.transactionRepository.save(transaction);
  }

  createOperationCounter(
    operationTrackerCounterDto: OperationTrackerDTO,
  ): Promise<WalletFrequencyCounter> {
    const operationCounter = new WalletFrequencyCounter();

    operationCounter.wallet_id = operationTrackerCounterDto.wallet_id;
    operationCounter.operation_type = operationTrackerCounterDto.operation_type;
    operationCounter.freqency = operationTrackerCounterDto.freqency;
    operationCounter.has_exceeded_frequency_history =
      operationTrackerCounterDto.has_exceeded_frequency_history;

    return this.operationCounterRepository.save(operationCounter);
  }

  async creditWallet(creditWalletDTO: CreditWalletDTO): Promise<Wallet> {
    // find wallet
    try {
      const exisitingWallet = await this.walletRepository.findOne({
        where: {
          id: creditWalletDTO.wallet_id,
        },
      });
      // increase balance
      const available_balance =
        exisitingWallet.available_balance + creditWalletDTO.amount;

      // increase withdrwable balance
      const withdrawable_balance =
        exisitingWallet.withdrawable_balance + creditWalletDTO.amount;

      // save new update to an object
      const newUpdateFiedls = {
        available_balance,
        withdrawable_balance,
      };
      const creditedWallet = this.walletRepository.save({
        id: creditWalletDTO.wallet_id,
        ...newUpdateFiedls,
      });
      //  check if credit was succesful and save transcation
      return creditedWallet;
    } catch (error) {}
    // id: creditWalletDTO.wallet_id,
    // available_balance: creditWalletDTO.amount,
    // user_id: creditWalletDTO.user_id,
  }

  async debitWallet(debitWalletDTO: DebitWalletDTO): Promise<Wallet> {
    // find wallet
    const exisitingWallet = await this.walletRepository.findOne({
      where: {
        id: debitWalletDTO.wallet_id,
      },
    });
    // increase balance
    const available_balance =
      exisitingWallet.available_balance - debitWalletDTO.amount;

    // increase withdrwable balance
    const withdrawable_balance =
      exisitingWallet.withdrawable_balance - debitWalletDTO.amount;

    // save new update to an object
    const newUpdateFiedls = {
      available_balance,
      withdrawable_balance,
    };
    return this.walletRepository.save({
      id: debitWalletDTO.wallet_id,
      ...newUpdateFiedls,
    });
    // id: creditWalletDTO.wallet_id,
    // available_balance: creditWalletDTO.amount,
    // user_id: creditWalletDTO.user_id,
  }

  async walletTransfer(walletTransferDTO: WalletTransferDTO): Promise<Object> {
    // return object holder
    // TODO convert currency if its cross boder transfer ////// @optional
    let Data: Object = {};

    // check is wallet exist and it isnt blocked and amount to user has sufficient balance
    let senderWallet = await this.walletRepository.findOne({
      where: {
        user_id: walletTransferDTO.user_id,
      },
    });

    const receiverWallet = await this.walletRepository.findOne({
      where: {
        id: walletTransferDTO.receiver_wallet_id,
      },
    });

    switch (true) {
      default:
        // debit sender wallet
        let amountToDebit = walletTransferDTO.transfer_amount;
        let newAvailableBalance =
          senderWallet.withdrawable_balance - amountToDebit;
        const newUpdateFiedls = {
          available_balance: newAvailableBalance,
        };
        this.walletRepository.save({
          id: walletTransferDTO.sender_wallet_id,
          ...newUpdateFiedls,
        });

        // credit receiver wallet
        let amountToCredit = walletTransferDTO.transfer_amount;
        let newRecieverAvailableBalance =
          receiverWallet.available_balance + amountToCredit;
        const newUpdate = {
          available_balance: newRecieverAvailableBalance,
        };
        this.walletRepository.save({
          id: walletTransferDTO.receiver_wallet_id,
          ...newUpdate,
        });
        // save transction for bothe parties
        Data = {
          code: 200,
          message: 'Transfer Successful',
          data: {},
        };
      // TODO::: Notify Sender And Reciever
      case !senderWallet:
        Data = {
          code: 404,
          message: 'Wallet Not Found',
          data: null,
        };
        break;
      // check if reciever wallet exist
      case !receiverWallet:
        Data = {
          code: 404,
          message: "Receiver Wallet DOesn't Exist",
          data: null,
        };
        break;
      case senderWallet && senderWallet.is_blocked:
        Data = {
          code: 401,
          message: 'Your Wallet Is Blocked, Please Contact Support',
          data: null,
        };
        break;
      case receiverWallet && receiverWallet.is_blocked:
        Data = {
          code: 401,
          message: 'Receiver Wallet Is Blocked',
          data: null,
        };
        break;
      // check if wallet balance is sufficient
      case senderWallet.withdrawable_balance <
        walletTransferDTO.transfer_amount:
        // create an approval notification to admin
        Data = {
          code: 201,
          message: 'Insufficient Balance',
          data: null,
        };
        break;
      // check if amount is greater than 1million(Specified currenecy)
      case walletTransferDTO.transfer_amount >= 1000000:
        // save transction as pending
        // create an approval notification to admin
        Data = {
          code: 201,
          message: 'Payment Initiated, Pending Approval',
          data: null,
        };
        break;
    }

    return Data;
  }
  async fetchUserWallets(query): Promise<Wallet[]> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.user_id || '';
    const [result, total] = await this.walletRepository.findAndCount({
      where: { user_id: keyword },
      take: take,
      skip: skip,
    });
    // TODO : Write a custom pagination function
    return result;
  }

  async findSingleWalletTransaction(query): Promise<WalletTransactions[]> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.user_id || '';
    const [result, total] = await this.transactionRepository.findAndCount({
      where: { user_id: keyword },
      take: take,
      skip: skip,
    });
    // TODO : Write a custom pagination function
    return result;
  }

  async saveFrequencyCounter(
    operationTrackerDTO: OperationTrackerDTO,
  ): Promise<WalletFrequencyCounter> {
    const frequencyCounter = new WalletFrequencyCounter();
    frequencyCounter.wallet_id = operationTrackerDTO.wallet_id;
    frequencyCounter.operation_type = operationTrackerDTO.operation_type;
    frequencyCounter.has_exceeded_frequency_history =
      operationTrackerDTO.has_exceeded_frequency_history;
    frequencyCounter.freqency = operationTrackerDTO.freqency;

    return this.operationCounterRepository.save(frequencyCounter);
  }
}
