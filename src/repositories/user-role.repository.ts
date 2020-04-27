import { DefaultCrudRepository } from '@loopback/repository';
import { UserRole } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRoleRepository extends DefaultCrudRepository<UserRole, typeof UserRole.prototype.id> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(UserRole, dataSource);
  }
}
