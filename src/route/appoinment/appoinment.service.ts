import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subjects } from 'src/schema/subjects.entity';
import { Repository } from 'typeorm';
import { Appointments } from 'src/schema/appointments.entity';
import { Times } from 'src/schema/times.entity';
import moment from 'moment';
import { UserEntity } from 'src/schema/users.entity';

@Injectable()
export class AppoinmentService {
  @InjectRepository(Subjects)
  private readonly subjectsRepository: Repository<Subjects>;

  @InjectRepository(Appointments)
  private readonly appointmentsRepository: Repository<Appointments>;

  @InjectRepository(Times)
  private readonly TimesRepository: Repository<Times>;

  @InjectRepository(UserEntity)
  private readonly userEntityRepository: Repository<UserEntity>;

  async getSubjects(): Promise<Subjects[]> {
    const subjects = await this.subjectsRepository.find();
    console.log(subjects);
    return subjects.filter((subject) => subject.isDelete !== '1');
  }

  async getAppointments(userId: number, role: string): Promise<any[]> {
    const user = await this.userEntityRepository.findOne({
      where: { id: userId },
      select: ['role'],
    });

    const query = this.appointmentsRepository
      .createQueryBuilder('a')
      .leftJoin('a.user', 'u')
      .leftJoin('a.subject', 's')
      .leftJoin('a.animalsType', 'at')
      .where('a.isDelete = 0');

    if (user.role !== 1) {
      query.andWhere('a.user = :userId', { userId });
    }

    const rawAppointments = await query
      .select([
        'u.firstname AS name',
        's.subject AS subject',
        'at.name AS animals_type',
        'a.animalsBreed AS animals_breed',
        'a.animalsName AS animals_name',
        'a.timeAppointment AS time',
        'a.status AS status',
      ])
      .getRawMany();

    const appointments = rawAppointments.map((item) => {
      return {
        ...item,
        time: moment(item.time).utcOffset(7).format('DD/MM/YYYY HH:mm'),
      };
    });

    return appointments;
  }

  async createAppointment(body: any) {
    const {
      userId,
      subject,
      animalsType,
      animalsBreed,
      animalsName,
      timeAppointment,
      createBy,
    } = body;

    const user = await this.userEntityRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const appointment = await this.appointmentsRepository.save({
      user,
      subject,
      animalsType,
      animalsBreed,
      animalsName,
      timeAppointment,
      status: 0,
      createDate: new Date(),
      modifiedDate: new Date(),
      createBy,
      modifiedBy: createBy,
      isDelete: '0',
    });

    const appointmentDateObj = moment(timeAppointment);
    const appointmentDate = appointmentDateObj.format('DD/MM/YYYY');
    const appointmentTime = appointmentDateObj.format('HH:mm:ss');

    console.log('Appointment Date:', appointmentDate);
    console.log('Appointment Time:', appointmentTime);

    const timesRepository = this.TimesRepository;

    await timesRepository.update(
      {
        date: appointmentDate,
        time: appointmentTime,
      },
      {
        is_active: 1,
      },
    );

    return {
      message: 'จองนัดหมายสำเร็จ',
      data: appointment,
    };
  }
}
