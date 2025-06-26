import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';

@Controller('appoinment')
export class AppoinmentController {
  constructor(private appoinmentService: AppoinmentService) {}

  @Get()
  async getAppointments(
    @Query('userId') userId: string,
    @Req() req,
  ): Promise<any> {
    try {
      const role = req.user?.role;

      if (!userId) {
        return { status: false, message: 'userId is required' };
      }

      const appointments = await this.appoinmentService.getAppointments(
        Number(userId),
        role,
      );

      return {
        status: true,
        message: 'OK',
        appointments,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('subject')
  async getAllActions() {
    try {
      return {
        status: true,
        message: 'OK',
        subjects: await this.appoinmentService.getSubjects(),
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('create')
  async createAppointment(@Body() body: any) {
    try {
      return {
        status: true,
        message: 'OK',
        appointment: await this.appoinmentService.createAppointment(body),
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch('status/:id')
  updateAppointmentStatus(
    @Param('id') id: number,
    @Body('status') status: number,
    @Req() req: any,
  ) {
    const modifiedBy = req.user?.id || 0;
    return this.appoinmentService.updateStatus(id, status, modifiedBy);
  }
}
