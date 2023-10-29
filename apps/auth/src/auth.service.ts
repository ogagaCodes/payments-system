import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import { UsersDTO } from '@app/users/dto/create_user.dto';
import { validate } from 'class-validator';
import { LoggerService } from '@app/common/logger/logger.service';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private userservice: UsersService,
  ) {}

  async login(user: UsersDTO): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();
    userDTO.phone_number = user.phone_number;
    userDTO.password = user.password;
    userDTO.user_name = user.user_name;

    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      // Get user information
      const userDetails = await this.userservice.findOne({phone_number: user.phone_number});

      // Check if user exists
      if (userDetails == null) {
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }

      // Check if the given password match with saved password
      const isValid = compareSync(user.password, userDetails.password);
      if (isValid) {
        // Generate JWT token
        return {
          status: 200,
          msg: {
            phone_number: user.phone_number,
            access_token: this.jwtService.sign({ email: user.phone_number }),
          },
        };
      } else {
        // Password or email does not match
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }
    } else {
      return { status: 400, msg: { msg: 'Invalid fields.' } };
    }
  }

  async register(body: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();
    userDTO.phone_number = body.phone_number;
    userDTO.password = hashSync(body.password, 10);

    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.userservice.create(userDTO).catch((error) => {
        this.logger.debug(error.message);
        isOk = false;
      });
      if (isOk) {
        return { status: 201, content: { msg: 'User created with success' } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }
}