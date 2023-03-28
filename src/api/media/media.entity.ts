/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { AuditEntity } from '../../common/db/customBaseEntites/AuditEntity';
import { MediaType } from './enums/media.type';

@Entity('media')
export class Media extends AuditEntity {
  @Column()
  key: string;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    default: MediaType.IMAGE,
    enum: MediaType,
  })
  mediaType: MediaType;
}
