import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { DonatesService } from './donates.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

@Controller('donates')
export class DonatesController {
  constructor(private readonly donatesService: DonatesService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUserDonations(@Request() req: AuthenticatedRequest) {
    try {
      return await this.donatesService.findUserDonations(req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
