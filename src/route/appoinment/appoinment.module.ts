import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from 'src/schema/subjects.entity';
import { AppoinmentController } from './appoinment.controller';
import { AppoinmentService } from './appoinment.service';
import { Appointments } from 'src/schema/appointments.entity';
import { Times } from 'src/schema/times.entity';
import { UserEntity } from 'src/schema/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subjects, Appointments, Times, UserEntity]),
  ],
  controllers: [AppoinmentController],
  providers: [AppoinmentService],
})
export class AppoinmentModule {}
