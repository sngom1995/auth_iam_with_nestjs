import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActiveUser } from './decorators/active-user.decorator';
import { OtpAuthenticationService } from './otp-authentication.service';
import ActiveUserData from '../interfaces/active-user-data.interface';
import { toFileStream } from 'qrcode';

import { Response } from 'express';

@Auth(AuthType.NONE)
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenicationService: AuthenticationService,
    private readonly otpAuthService: OtpAuthenticationService,
  ) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenicationService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authenicationService.signIn(signInDto);
  }
  @Auth(AuthType.BEARER)
  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  async generateQrCode(
    @ActiveUser() activeUser: ActiveUserData,
    @Res() response: Response,
  ) {
    const { secret, uri } = await this.otpAuthService.generateSecret(
      activeUser.email,
    );
    await this.otpAuthService.enableTfaForUser(activeUser.email, secret);
    response.type('png');
    return toFileStream(response, uri);
  }
  @HttpCode(HttpStatus.OK) // changed since the default is 201
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenicationService.refreshTokens(refreshTokenDto);
  }
}
