import { Module } from '@nestjs/common';
import { DonatesController } from './donates.controller';
import { DonatesService } from './donates.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DonatesController],
  providers: [DonatesService],
})
export class DonatesModule {}
