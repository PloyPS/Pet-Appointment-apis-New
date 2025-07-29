import { Body, Controller, HttpException, Post } from '@nestjs/common';
import logger from 'src/logger/pino.logger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dataLogin: { username: string; password: string }) {
    console.log(dataLogin);
    try {
      if (!dataLogin.username || !dataLogin.password) {
        logger.info('Username and Password are required!');
        return {
          status: false,
          message: 'Username and Password are required!',
        };
      }

      const user = await this.authService.getUserByUsername(dataLogin.username);
      if (!user) {
        logger.info(`User not found: ${dataLogin.username}`);
        return {
          status: false,
          message: 'User not found!',
        };
      }

      const isPasswordValid = await this.authService.validatePassword(
        dataLogin.password,
        user,
      );
      if (!isPasswordValid) {
        logger.info(`Invalid Password for User: ${user.username}`);
        return {
          status: false,
          message: 'Invalid Password!',
        };
      }

      return {
        status: true,
        message: 'Login Successful!',
        user: {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          role: user.role,
        },
      };
    } catch (error) {
      logger.error(`Error Logging In: ${error.message}`);
      console.log(error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      } else {
        throw new HttpException('Internal server error', 500);
      }
    }
  }
}
