import { Allow } from 'class-validator';

export class UserCreateData {
  @Allow()
  firstName!: string;

  @Allow()
  lastName!: string;

  @Allow()
  username!: string;

  @Allow()
  email!: string;

  @Allow()
  password!: string;
}
