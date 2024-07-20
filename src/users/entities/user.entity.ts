import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import {
  Permission,
  PermissionType,
} from '../../iam/authorization/permission.type';
import { ApiKey } from '../api-keys/entities/api-key';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true }) // 👈
  password: string;

  @Column({ nullable: true })
  googleId: string;
  @Column({ default: false })
  isTfaEnabled: boolean; // 👈 NEW

  @Column({ nullable: true })
  tfaSecret: string;
  @Column({ enum: Role, default: Role.Regular })
  role: Role;
  @Column({ enum: Permission, default: [], type: 'json' })
  permissions: PermissionType[];
  @JoinTable()
  @OneToMany(() => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];
}
