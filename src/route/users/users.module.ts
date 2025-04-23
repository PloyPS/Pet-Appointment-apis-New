import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/schema/users.entity';
import { Pets } from 'src/schema/pets.entity';
import { Price } from 'src/schema/price.entity';
import { AnimalsType } from 'src/schema/animalTypes.entity';
import { Weight } from 'src/schema/weight.entity';
import { Times } from 'src/schema/times.entity';
import { Subjects } from 'src/schema/subjects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      Pets,
      Price,
      AnimalsType,
      Weight,
      Times,
      Subjects,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  //   exports: [UsersService],
})
export class UsersModule {}
