import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.$transaction(async (prisma) => {

      const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });

      await prisma.list.createMany({
        data: [
          { name: 'WANT_TO_WATCH', userId: user.id },
          { name: 'WATCHED', userId: user.id },
        ],
      });

       return user;
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(id: string) {
    return this.prisma.user.findUnique({where: { id },});
  }
}