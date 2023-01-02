import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from '../service/user.service';
import { ValidateIdMiddleware } from './validate-id.middleware';

describe('ValidateIdMiddleware', () => {
  let middleware: ValidateIdMiddleware;

  const mockUserService = {
    findOneById: jest.fn((id: number) =>
      id === 1 ? { id: 1, name: 'mock', email: 'mock' } : null,
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateIdMiddleware,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    middleware = module.get<ValidateIdMiddleware>(ValidateIdMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should throw error if id invalid', () => {
    const request = {
      params: {
        id: 'invalid',
      },
    } as any;
    const response = {} as Response;
    const next = jest.fn() as NextFunction;
    const res = middleware.use(request, response, next);
    expect(res).toEqual(new BadRequestException('Id inválido'));
  });

  it('should throw error if user not found', () => {
    const request = {
      params: {
        id: 2,
      },
    } as any;
    const response = {} as Response;
    const next = jest.fn() as NextFunction;
    const res = middleware.use(request, response, next);
    expect(res).toEqual(new BadRequestException('Usuário não encontrado'));
  });

  it('should return user', () => {
    const request = {
      params: {
        id: 1,
      },
    } as any;
    const response = {} as Response;
    const next = jest.fn() as NextFunction;
    middleware.use(request, response, next);
    expect(next).toBeCalled();
  });
});
