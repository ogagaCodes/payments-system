import { Module } from '@nestjs/common';
import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    // RmqModule.register({
    //   name: BILLING_SERVICE,
    // }),
    AuthModule],
  providers: [UsersService],
})
export class UsersModule {}
