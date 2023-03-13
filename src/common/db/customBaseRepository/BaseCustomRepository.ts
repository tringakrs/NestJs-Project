import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AuditEntity } from '../customBaseEntites/AuditEntity';
import { IBaseCustomRepository } from './interfaces/BaseCustomRepository.interface';

export abstract class BaseCustomRepository<T extends AuditEntity>
  extends Repository<T>
  implements IBaseCustomRepository<T>
{
  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await super.findOne({
      ...options,
      where: {
        ...options?.where,
        //hotfix
        //kur e kemi indefined mos me kthy error po null kur nuk kemi te dhena
        //that allows you to safely access properties or methods of an object that may be undefined or null
        deleted_at: null,
      },
    });
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await super.find({
      ...options,
      where: {
        ...options?.where,
        deleted_at: null,
      },
    });
  }
}
