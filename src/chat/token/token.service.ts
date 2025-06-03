import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  extractToken(connectionParams: any): string | null {
    console.log("TOKEN",connectionParams.Authorization);
    return connectionParams?.Authorization || null;
  }

  validateToken(token: string): any {
    const refreshTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_KEY',
    );
    try {
      return verify(token, refreshTokenSecret);
    } catch (error) {
      return null;
    }
  }
}
