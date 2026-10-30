// src/module/terminal/terminal.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class TerminalService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEN_AI_API_KEY');
    console.log('this is api key: ', apiKey);
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async processCommand(command: string): Promise<{ reply: string }> {
    if (!command || !command.trim()) {
      return { reply: 'Please enter a valid command.' };
    }

    try {
      // Use the universally supported base model alias
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-3.5-flash',
      });

      // Manually combine your system context with the user's command
      const fullPrompt = `You are an AI CLI assistant running on the developer portfolio of Danyal Ahmed. 
      Danyal is a Lead Backend and Full-Stack Software Engineer specializing in Laravel, Node.js, React, NestJS, and enterprise databases (MySQL, Oracle, Elasticsearch). 
      He holds a BS in Computer Science from Sindh Madressatul Islam University.
      Recent work includes: 
      - DealSense: Engineered a competitive intelligence alternative to legacy capital market platforms, leveraging LLMs to instantly parse unstructured credit agreements.
      - Pakistan State Oil: Multi-tenant audit portals with Google Vision API defect detection.
      - BDC Collateral: Financial data visualization and asset tracking.
      Keep your answers concise, professional, and formatted for a terminal interface. Do not use markdown headers.
      
      USER COMMAND TO ANSWER: ${command}`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;

      return { reply: response.text() };
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException('Failed to process AI command');
    }
  }
}
