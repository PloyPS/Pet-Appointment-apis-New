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
    ) { }

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
    
    async validatePassword(inputPassword: string, user: UserEntity): Promise<boolean> {
        try {
            return inputPassword === user.password;
            // return await bcrypt.compare(inputPassword, user.password);
        } catch (error) {
            logger.error(`Error Validating Password: ${error.message}`);
            throw error;
        }
    }

    // async validateToken(token: string) {
    //     try {
    //         // const decoded = this.jwtService.verify(token); // ตรวจสอบความถูกต้องของ Token
    //         // return decoded; // คืนค่าข้อมูลที่ถอดรหัสได้
    //     } catch (error) {
    //         throw new Error('Invalid token'); // หาก Token ไม่ถูกต้อง
    //     }
    // }

    // async generateToken(user: UserEntity) {
    //     // สร้าง payload สำหรับ token ซึ่งสามารถเก็บข้อมูลที่จำเป็น เช่น username และ id
    //     const payload = { username: user.username, sub: user.id , role: user.role};
    //     // ใช้ JwtService เพื่อ sign และสร้าง JWT token
    //     // return this.jwtService.sign(payload);
    // }
}
