import { Injectable } from '@angular/core';
import { Prisma, User } from '@prisma/client';
import { RestApiService } from '../../shared/services/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  user = new RestApiService<User, Prisma.UserFindManyArgs, Prisma.UserCreateInput, Prisma.UserUpdateInput>('user');
}
