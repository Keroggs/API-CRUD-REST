import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Any } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = () => {
    return {
      id: 1,
      name: 'Jose',
      email: 'unu@gmail.com',
    };}

    const mockUsersRepository = {
      create: jest.fn().mockImplementation(User => User),
      save: jest.fn().mockImplementation(User => Promise.resolve({id: expect.any(Number), ...User})),
      update: jest.fn().mockImplementation((id, user) => Promise.resolve({...user})),
      delete: jest.fn(),
       findOne: jest.fn((id) => Promise.resolve(mockUser())),
       find: jest.fn(() => [
    
        {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        },
        {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        }
      
    ]),
      findall: jest.fn(),
    }

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService, { 
          provide: getRepositoryToken(User),
          useValue:mockUsersRepository
        }],
      }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  it('should create a user', async () => {
    const user = await service.create(mockUser());
    expect(user).toEqual({
      name: expect.any(String),
      id: expect.any(Number),
      email: expect.any(String)
    });
  })

  it('Should find a user by id', async () => {
    const user = await service.findOne(1);
    expect(user).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
    }));
  })

  it('Should update a current user', async () => {
    const user = await service.update(1, mockUser());
    expect(user).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...mockUser(),
    }));
  });

  it('Should return an array of users', async () => {
    const result: User[] = await service.findall();
    expect(result).toBeInstanceOf(Array);
  });

  it('Should delete a user by id', async () => {
    await service.delete(1);
    expect(mockUsersRepository.delete).toHaveBeenCalledWith(1);
  });

});
