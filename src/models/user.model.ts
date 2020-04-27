import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    mysql: { table: 'users' },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
    name: 'is_active',
  })
  is_active: boolean;

  // Auth provider - 'google'
  @property({
    type: 'string',
    name: 'auth_provider',
  })
  auth_provider: string;

  // Id from external provider
  @property({
    type: 'string',
    name: 'auth_id',
  })
  auth_id?: string;

  @property({
    type: 'string',
    name: 'auth_token',
  })
  auth_token?: string;

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'date',
    required: false,
    name: 'created_at',
  })
  created_at: string;

  @property({
    type: 'date',
    required: false,
    name: 'updated_at',
  })
  updated_at: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
