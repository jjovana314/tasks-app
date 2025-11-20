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

const saveMock = jest.fn();

const mockTaskModel: any = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: saveMock,
}));

mockTaskModel.find = jest.fn();
mockTaskModel.findById = jest.fn();
mockTaskModel.findByIdAndUpdate = jest.fn();
mockTaskModel.findByIdAndDelete = jest.fn();

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
    });
  });

  describe('findOne', () => {
    it('should return one task', async () => {
      mockTaskModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockTask),
      });

      const result = await service.findOne('task123');
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException', async () => {
      mockTaskModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('badid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a task', async () => {
      saveMock.mockResolvedValue({
        _id: 'newId',
        title: 'New task',
      });

      const result = await service.create({ title: 'New task' } as any);

      expect(saveMock).toHaveBeenCalled();
      expect(result._id).toBe('newId');
    });
  });

  describe('update', () => {
    it('should update task', async () => {
      mockTaskModel.findByIdAndUpdate.mockResolvedValue(mockTask);

      const result = await service.update('task123', { title: 'Updated' });
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException', async () => {
      mockTaskModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.update('badid', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete task', async () => {
      mockTaskModel.findByIdAndDelete.mockResolvedValue(mockTask);

      const result = await service.remove('task123');
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException', async () => {
      mockTaskModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove('badid')).rejects.toThrow(NotFoundException);
    });
  });
});
