import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/schema/users.entity';
import { Pets } from 'src/schema/pets.entity';
import { Price } from 'src/schema/price.entity';
import { AnimalsType } from 'src/schema/animalTypes.entity';
import { Weight } from 'src/schema/weight.entity';
import { Times } from 'src/schema/times.entity';
import { Subjects } from 'src/schema/subjects.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(Pets)
    private readonly petsRepository: Repository<Pets>,

    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,

    @InjectRepository(AnimalsType)
    private readonly animalsTypeRepository: Repository<AnimalsType>,

    @InjectRepository(Weight)
    private readonly weightRepository: Repository<Weight>,

    @InjectRepository(Times)
    private readonly timesRepository: Repository<Times>,

    @InjectRepository(Subjects)
    private readonly subjectsRepository: Repository<Subjects>,
  ) {}

  async getUser(): Promise<UserEntity[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.isDelete IS NULL OR user.isDelete != 1')
      .getMany();
    return users;
  }

  async saveUser(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async savePet(pet: Pets): Promise<Pets> {
    return await this.petsRepository.save(pet);
  }

  async getPetsByUserId(userId: number): Promise<Pets[]> {
    const pets = await this.petsRepository.find({
      where: { userId: userId },
    });
    console.log('Pets for user:', userId, pets);
    return pets;
  }

  async getPrice(): Promise<Price[]> {
    const price = await this.priceRepository.find();
    console.log(price);
    return price;
  }

  async getAnimalsType(): Promise<AnimalsType[]> {
    const animalsType = await this.animalsTypeRepository.find({
      where: { isDelete: 0 },
    });
    console.log(animalsType);
    return animalsType;
  }

  async getWeight(petWeightId: number): Promise<Weight[]> {
    console.log('Searching for weight with petWeightId:', petWeightId);

    const weight = await this.weightRepository.findOne({
      where: { id: petWeightId },
    });

    console.log('Found weight:', weight);
    return weight ? [weight] : [];
  }

  async getPriceById(
    weightId: number,
    animailTypeId: number,
    subjectId: number,
  ): Promise<Price[]> {
    const price = await this.priceRepository.find({
      where: {
        weightId: weightId,
        animalTypeId: animailTypeId,
        subjectId: subjectId,
      },
    });
    console.log('price:', price);
    return price;
  }

  getTimes(): Promise<Times[]> {
    return this.timesRepository.find();
  }
  getTimesById(id: number): Promise<Times[]> {
    return this.timesRepository.find({
      where: { id: id },
    });
  }

  async getTimesByDate(date: string): Promise<Times[]> {
    const times = await this.timesRepository
      .createQueryBuilder('time')
      .where('time.date = :date', { date })
      .andWhere('(time.is_active IS NULL OR time.is_active != 1)')
      .getMany();

    console.log('Times for date:', date, times);
    return times;
  }

  async getTimesByDateAndId(date: string, id: number): Promise<Times[]> {
    const times = await this.timesRepository.find({
      where: { date: date, id: id },
    });
    console.log('Times for date and id:', date, id, times);
    return times;
  }

  async addSubjects(subject: string, createBy: string): Promise<Subjects> {
    const newSubject = this.subjectsRepository.create({ subject, createBy });
    return await this.subjectsRepository.save(newSubject);
  }

  getAllweight(): Promise<Weight[]> {
    return this.weightRepository.find();
  }

  async deleteAnimalsType(id: number): Promise<void> {
    await this.animalsTypeRepository.update(id, { isDelete: 1 });
  }

  async getPetAll() {
    const pets = await this.petsRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.user', 'u')
      .leftJoinAndSelect('p.animalsType', 'at')
      .leftJoinAndSelect('p.petWeight', 'w')
      .where('p.isDelete IS NULL')
      .select([
        'p.id',
        'p.name',
        'p.petBreeds',
        'p.petAge',
        'p.createDate',
        'u.firstname',
        'at.id',
        'at.name',
        'w.weight',
        'w.id',
      ])
      .getRawMany();

    return pets;
  }

  async getAllWeight(animalTypeId: number): Promise<Weight[]> {
    try {
      const weights = await this.weightRepository.find({
        where: {
          isDelete: null,
          animalTypeId: animalTypeId,
        },
      });

      console.log('Found weights:', weights);
      return weights;
    } catch (error) {
      console.error('Error fetching weights:', error);
      return [];
    }
  }

  async updateUser(
    id: number,
    firstname: string,
    lastname: string,
    phone: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.phone = phone;
    user.password = password;

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.update(id, { isDelete: true });
  }

  async deletePet(id: number): Promise<void> {
    await this.petsRepository.update(id, { isDelete: true });
  }

  async editPetAgeAndWeight(id: number, petAge?: string, petWeightId?: number) {
    const pet = await this.petsRepository.findOne({ where: { id } });

    if (!pet) throw new Error('Not found');

    if (petAge !== undefined && petAge !== '') {
      pet.petAge = petAge;
    }
    if (petWeightId !== undefined) pet.petWeightId = petWeightId;

    return await this.petsRepository.save(pet);
  }
}
