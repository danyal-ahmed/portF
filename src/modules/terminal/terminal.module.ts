// src/module/terminal/terminal.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminalService } from './terminal.service';
import { TerminalController } from './terminal.controller';

@Module({
  imports: [ConfigModule],
  controllers: [TerminalController],
  providers: [TerminalService],
})
export class TerminalModule {}
