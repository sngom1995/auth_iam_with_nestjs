import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing.service';
import { randomUUID } from 'crypto';

export interface GeneratedApiKeyPayload {
  // ⚠️ note ideally this should be its own file, putting it here just for brevity
  apiKey: string;
  hashedKey: string;
}
@Injectable()
export class ApiKeysService {
  constructor(private readonly hashService: HashingService) {}
  async createAndHash(id: number): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(id);
    const hashedKey = await this.hashService.hash(apiKey);
    return { apiKey, hashedKey };
  }
  async validate(apiKey: string, hashedKey: string): Promise<boolean> {
    return this.hashService.compare(apiKey, hashedKey);
  }
  extractIdFromApiKey(apiKey: string): string {
    const [id] = Buffer.from(apiKey, 'base64').toString('ascii').split(' ');
    return id;
  }
  private generateApiKey(id: number): string {
    const apiKey = `${id} ${randomUUID()}`;
    return Buffer.from(apiKey).toString('base64');
  }
}
