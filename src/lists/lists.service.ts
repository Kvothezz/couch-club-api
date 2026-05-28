import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { RemoveMovieDto } from './dto/remove-movie.dto';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async addMovieToList(userId: string, addMovieDto: AddMovieDto) {
    const { tmdbId, listType } = addMovieDto;

    const otherListType = listType === 'WANT_TO_WATCH' ? 'WATCHED' : 'WANT_TO_WATCH';

    return this.prisma.$transaction(async (prisma) => {
      const lists = await prisma.list.findMany({
        where: { userId, name: { in: [listType, otherListType] } },
      });

      const targetList = lists.find((list) => list.name === listType);
      const otherList = lists.find((list) => list.name === otherListType);

      if (!targetList) throw new NotFoundException('Lista não encontrada.');

      const existingMovie = await prisma.movie.findFirst({
        where: { tmdbId, listId: targetList.id },
      });

      if (existingMovie) {
        throw new ConflictException('Este filme já está nesta lista.');
      }

      if (otherList) {
        await prisma.movie.deleteMany({
          where: {
            tmdbId,
            listId: otherList.id,
          },
        });
      }

      return prisma.movie.create({
        data: {
          tmdbId,
          listId: targetList.id,
        },
      });
    });
  }

  async removeMovieFromList(userId: string, removeMovieDto: RemoveMovieDto) {
    const { tmdbId, listType } = removeMovieDto;

    const list = await this.prisma.list.findFirst({
      where: { userId, name: listType },
    });

    if (!list) {
      throw new NotFoundException('Lista não encontrada.');
    }

    const result = await this.prisma.movie.deleteMany({
      where: {
        listId: list.id,
        tmdbId: tmdbId,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Filme não encontrado nesta lista.');
    }

    return { success: true, message: 'Filme removido com sucesso.' };
  }

  async getLists(userId: string) {
    const lists = await this.prisma.list.findMany({
      where: { userId: userId },
      include: {
        movies: {
          orderBy: {
            addedAt: 'desc',
          },
        },
      },
    });

    return lists;
  }
}