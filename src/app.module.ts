import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './route/users/users.controller';
import { UsersService } from './route/users/users.service';
import { UsersModule } from './route/users/users.module';
import { UserEntity } from './schema/users.entity';
import { join } from 'path';
import { AuthService } from './route/auth/auth.service';
import { AuthModule } from './route/auth/auth.module';
import { AuthController } from './route/auth/auth.controller';
import { Pets } from './schema/pets.entity';
import { Price } from './schema/price.entity';
import { AnimalsType } from './schema/animalTypes.entity';
import { Weight } from './schema/weight.entity';
import { AppoinmentService } from './route/appoinment/appoinment.service';
import { AppoinmentModule } from './route/appoinment/appoinment.module';
import { AppoinmentController } from './route/appoinment/appoinment.controller';
import { Subjects } from './schema/subjects.entity';
import { Times } from './schema/times.entity';
import { Appointments } from './schema/appointments.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'convergence',
      database: 'pet-appoinment',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      Pets,
      Price,
      AnimalsType,
      Weight,
      Subjects,
      Times,
      Appointments,
    ]),
    UsersModule,
    AuthModule,
    AppoinmentModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    AppoinmentController,
  ],
  providers: [AppService, UsersService, AuthService, AppoinmentService],
})
export class AppModule {}
