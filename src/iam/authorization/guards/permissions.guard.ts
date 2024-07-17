import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import ActiveUserData from '../../interfaces/active-user-data.interface';

import { REQUEST_PERMISSION_KEY } from '../decorators/permission.decorator';
import { PermissionType } from '../permission.type';
import { REQUEST_USER_KEY } from '../../iam.constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<PermissionType[]>(
      REQUEST_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!contextRoles) {
      return true;
    }
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    return contextRoles.every((permission) =>
      user.permissions.includes(permission),
    );
  }
}
