import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceController } from './experience.controller.js';
import { ExperienceService } from './experience.service.js';

describe('ExperienceController', () => {
  let controller: ExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceController],
      providers: [ExperienceService],
    }).compile();

    controller = module.get<ExperienceController>(ExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
