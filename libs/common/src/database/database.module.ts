import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import  dbConfiguration  from './database.config';


@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({...configService.get('database')})
    })
  ],
})
export class DatabaseModule {}