// src/module/terminal/terminal.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TerminalService } from './terminal.service';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post('execute')
  async executeCommand(@Body('command') command: string) {
    return this.terminalService.processCommand(command);
  }
}
