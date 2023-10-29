// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { RmqModule, DatabaseModule, LoggerModule } from '@app/common';
// import { PassportModule } from '@nestjs/passport';
// import { UsersModule } from '@app/users/users.module';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { AuthController } from './auth.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '@app/users/entities/user.entity';

// @Module({
//   imports: [
//     LoggerModule,
//     PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: false }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         privateKey: configService.get<string>('keys.privateKey'),
//         publicKey: configService.get<string>('keys.publicKey'),
//         signOptions: { expiresIn: '60s', algorithm: 'RS256' },
//       }),
//       inject: [ConfigService],
//     }),
//     UsersModule,
//     RmqModule,
//     TypeOrmModule.forFeature([User]),
//   ],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService, JwtModule, PassportModule],
//   controllers: [AuthController],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule, DatabaseModule } from '@app/common';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoggerService } from '@app/common/logger/logger.service';

import { JwtStrategy } from './strategies/jwt.strategy';
// import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LoggerService],
})
export class AuthModule {}
