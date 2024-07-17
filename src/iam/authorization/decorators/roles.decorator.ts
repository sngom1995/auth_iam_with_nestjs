import { Role } from '../../../users/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const REQUEST_ROLE_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(REQUEST_ROLE_KEY, roles);
