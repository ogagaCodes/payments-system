import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import  dbConfig  from './database.config';


@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({...configService.get('database')})
    })
  ],
})
export class DatabaseModule {}