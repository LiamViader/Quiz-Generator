import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quiz.controller';

import { QuizService } from './quiz.service';

describe('QuizzesController', () => {
  let controller: QuizzesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [
        {
          provide: QuizService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuizzesController>(QuizzesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
