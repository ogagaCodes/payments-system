import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDTO } from './dto/create_user.dto';
import { FetchProfileDTO } from './dto/fetch_user_profile.dto';
import { User } from './entities/user.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(createUserDto: UsersDTO): Promise<User> {
    const user = new User();

    user.phone_number = createUserDto.phone_number;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(fetchProfuleDto :FetchProfileDTO): Promise<User> {
    return this.usersRepository.findOne({
      where: { 
        phone_number: fetchProfuleDto.phone_number 
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}