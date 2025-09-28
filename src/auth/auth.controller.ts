import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserDto } from 'src/user/dtos/user.dto';

@Controller('auth')
export class AuthController {
  private client: OAuth2Client;
  constructor(private readonly authService: AuthService) {
    this.client = new OAuth2Client();
  }

  @Post('/login')
  async loginUser(@Body() body: LoginDto) {
    return this.authService.signIn(body);
  }

  @Post('/registration')
  async registerUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('/google-auth')
  async googleAuth(@Body() body: GoogleAuthDto) {
    const { access_token } = body;
    try {
      // Use the access token to get user info from Google
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
      );

      if (!response.ok) {
        throw new BadRequestException('Invalid Google access token');
      }

      const userInfo = await response.json();
      const userDetails = await this.authService.handleGoogleSignIn(userInfo);
      return userDetails;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
