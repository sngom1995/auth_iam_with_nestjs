import { Role } from '../../users/enums/role.enum';

export default interface ActiveUserData {
  sub: number;
  email: string;
  role: Role;
}
