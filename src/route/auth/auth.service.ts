import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import logger from 'src/logger/pino.logger';
import { UserEntity } from 'src/schema/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    // private readonly jwtService: JwtService,
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByUsername(username: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: {
          username,
          // is_delete: 1,
        },
      });
    } catch (error) {
      logger.error(`Error Getting User By Username: ${error.message}`);
      throw error;
    }
  }

  async validatePassword(
    inputPassword: string,
    user: UserEntity,
  ): Promise<boolean> {
    try {
      return inputPassword === user.password;
      // return await bcrypt.compare(inputPassword, user.password);
    } catch (error) {
      logger.error(`Error Validating Password: ${error.message}`);
      throw error;
    }
  }
}
