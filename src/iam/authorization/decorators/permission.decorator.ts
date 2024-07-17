import { PermissionType } from '../permission.type';
import { SetMetadata } from '@nestjs/common';

export const REQUEST_PERMISSION_KEY = 'permissions';

export const Permission = (...permissions: PermissionType[]) =>
  SetMetadata(REQUEST_PERMISSION_KEY, permissions);
