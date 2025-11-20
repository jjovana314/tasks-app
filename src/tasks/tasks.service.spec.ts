import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { Task } from './entities/tasks.entity';

const mockTask = {
  _id: 'task123',
  title: 'Test task',
  description: 'Test description',
  statusId: 'board123',
  userId: 'user123',
};

const mockTaskModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      mockTaskModel.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockTask]),
      });

      const result = await service.findAll();

      expect(result).toEqual([mockTask]);
      expect(mockTaskModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      mockTaskModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockTask),
      });

      const result = await service.findOne('task123');

      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockTaskModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('wrongId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const dto = {
        title: 'New task',
        description: 'Description',
      };

      mockTaskModel.save = jest.fn().mockResolvedValue({
        ...dto,
        _id: 'newId',
      });

      const result = await service.create(dto as any);

      expect(result.title).toBe(dto.title);
    });
  });

  describe('update', () => {
    it('should update and return task', async () => {
      mockTaskModel.findByIdAndUpdate.mockResolvedValue(mockTask);

      const result = await service.update('task123', {
        title: 'Updated title',
      });

      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockTaskModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        service.update('wrongId', { title: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });
  });


  describe('remove', () => {
    it('should delete and return task', async () => {
      mockTaskModel.findByIdAndDelete.mockResolvedValue(mockTask);

      const result = await service.remove('task123');

      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockTaskModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove('wrongId')).rejects.toThrow(NotFoundException);
    });
  });
});
