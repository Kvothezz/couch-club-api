import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { ListsModule } from 'src/lists/lists.module';

@Module({
    imports: [ListsModule],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
