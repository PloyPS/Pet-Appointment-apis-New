import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getAllActions() {
    try {
      return {
        status: true,
        message: 'OK',
        actions: await this.usersService.getUser(),
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('save')
  async saveUser(@Body() user: any) {
    try {
      return {
        status: true,
        message: 'OK',
        user: await this.usersService.saveUser(user),
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('save-pets')
  async savePets(@Body() pets: any) {
    try {
      return {
        status: true,
        message: 'OK',
        user: await this.usersService.savePet(pets),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('pets')
  async getAllPets(@Query('userId') userId: number) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const pets = await this.usersService.getPetsByUserId(userId);
    return {
      status: true,
      message: 'OK',
      pets: pets,
    };
  }

  @Get('price')
  async getAllPrice() {
    try {
      return {
        status: true,
        message: 'OK',
        price: await this.usersService.getPrice(),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('animals-type')
  async getAnimalsType() {
    try {
      return {
        status: true,
        message: 'OK',
        animailType: await this.usersService.getAnimalsType(),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('weight')
  async getWeight(@Query('petWeightId') petWeightId: number) {
    try {
      if (!petWeightId) {
        throw new Error('petWeightId is required');
      }

      const weight = await this.usersService.getWeight(petWeightId);

      return {
        status: true,
        message: 'OK',
        weight: weight,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('price-by-weight')
  async getPriceByWeight(
    @Query('weightId') weightId: number,
    @Query('animalTypeId') animalTypeId: number,
    @Query('subjectId') subjectId: number,
  ) {
    try {
      console.log(
        'weightId:',
        weightId,
        'animalTypeId:',
        animalTypeId,
        'subjectId:',
        subjectId,
      );
      if (!weightId || !animalTypeId || !subjectId) {
        throw new Error('weightId, animalTypeId, and subjectId are required');
      }
      const price = await this.usersService.getPriceById(
        weightId,
        animalTypeId,
        subjectId,
      );
      return {
        status: true,
        message: 'OK',
        price: price,
      };
      console.log('Price by weight:', price);
    } catch (error) {
      throw error;
    }
  }

  @Get('times')
  async getTimes() {
    try {
      return {
        status: true,
        message: 'OK',
        times: await this.usersService.getTimes(),
      };
    } catch (error) {
      throw error;
    }
  }
  @Get('times-by-id')
  async getTimesById(@Query('id') id: number) {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      const times = await this.usersService.getTimesById(id);
      return {
        status: true,
        message: 'OK',
        times: times,
      };
    } catch (error) {
      throw error;
    }
  }
  @Get('times-by-date')
  async getTimesByDate(@Query('date') date: string) {
    try {
      if (!date) {
        throw new Error('Date is required');
      }
      const times = await this.usersService.getTimesByDate(date);
      return {
        status: true,
        message: 'OK',
        times: times,
      };
    } catch (error) {
      throw error;
    }
  }
  @Get('times-by-date-and-id')
  async getTimesByDateAndId(
    @Query('date') date: string,
    @Query('id') id: number,
  ) {
    try {
      if (!date || !id) {
        throw new Error('Date and ID are required');
      }
      const times = await this.usersService.getTimesByDateAndId(date, id);
      return {
        status: true,
        message: 'OK',
        times: times,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('save-subjects')
  async saveSubjects(@Body() body: { subject: string; createBy: string }) {
    try {
      return {
        status: true,
        message: 'OK',
        subject: await this.usersService.addSubjects(
          body.subject,
          body.createBy,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('all-weight')  
  async getAllWeight() {
    try {
      return {
        status: true,
        message: 'OK',
        weight: await this.usersService.getAllweight(),
      };
    } catch (error) {
      throw error;
    }
  }
}
