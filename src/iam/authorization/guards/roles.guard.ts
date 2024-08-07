import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { REQUEST_ROLE_KEY } from '../decorators/roles.decorator';
import { Role } from '../../../users/enums/role.enum';
import ActiveUserData from '../../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../../iam.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(
      REQUEST_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!contextRoles) {
      return true;
    }
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    return contextRoles.some((role) => user.role === role);
  }
}
