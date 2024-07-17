import { Role } from '../../users/enums/role.enum';
import { PermissionType } from '../authorization/permission.type';

export default interface ActiveUserData {
  sub: number;
  email: string;
  role: Role;
  permissions: PermissionType[];
}
