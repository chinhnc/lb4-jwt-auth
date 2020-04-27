import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User } from './user.model';
import { Role } from './role.model';

@model({
  settings: {
    strict: false,
    mysql: { table: 'user_roles' },
  }
})
export class UserRole extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User)
  user_id: number;

  @belongsTo(() => Role)
  role_id: number;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}
