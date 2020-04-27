import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    strict: false,
    mysql: { table: 'roles' },
  }
})
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}
