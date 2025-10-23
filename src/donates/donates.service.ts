import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonatesService {

  constructor(private readonly prisma: PrismaService) { }

  async findUserDonations(userId: string) {
    try {
      const donates = await this.prisma.donation.findMany({
        where: {
          userId: userId,
          status: "PAID"
        },
        orderBy: {
          createdAt: "desc"
        },
      });
      return donates;
    } catch (err) {
      throw new Error("Falha ao buscar doações");
    }
  }
}
