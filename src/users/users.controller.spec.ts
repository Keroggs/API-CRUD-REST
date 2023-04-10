import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';




describe('UsersController', () => {
  let controller: UsersController;
//user de prueba
  const mockUser = () => {
    return {
      id: 1,
      name: 'Omar',
      email: 'uwu@gmail.com',
    };}

  const mockUsersService = {
    create: jest.fn(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }),
    update: jest.fn((id, user) => ({
      id, 
      ...user
    }
    )
    ),
    delete: jest.fn((id) => {
      return {
        id
      }
    }
      ),
      findOne: jest.fn((id) => {
        return {
          id
        }
      
  }),

      

      findall: jest.fn(() => [
    
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
          
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService).useValue(mockUsersService).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
//test create
  it('should create a user', async () => {
    const user = await controller.create(mockUser());
    expect(user).toEqual({
      name: expect.any(String),
      id: expect.any(Number),
      email: expect.any(String)
    });
  })
//test update
  it('should update a user', async () => {

    const user = await controller.update(1, mockUser());

    expect(user).toEqual({
      id: 1,
      ...mockUser()
    });
  })
//test delete
  it('should delete a user', async () => {
    await controller.delete(1);
    expect(mockUsersService.delete).toBeCalledWith(1);
  });
//test findall
  it('Should return an array of users', async () => {
    const result: User[] = await controller.findAll();
    expect(result).toBeInstanceOf(Array);
  });
//test findOne
  it ('Should return a user', async () => 
  { 
    const result = await controller.findOne(mockUser().id);
    expect(result).toBeInstanceOf(Object);
  })
    ;})
;
