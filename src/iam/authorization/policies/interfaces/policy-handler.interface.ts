import { Policy } from './policies.interface';
import ActiveUserData from '../../../interfaces/active-user-data.interface';

export interface PolicyHandler<T extends Policy> {
  handle(policy: T, user: ActiveUserData): Promise<void>;
}
