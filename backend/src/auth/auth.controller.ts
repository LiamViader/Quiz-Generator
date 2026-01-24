import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  private client: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  @Post('google-login')
  async googleLogin(@Body('token') token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await this.usersService.createOrUpdateGoogleUser(payload);

      // Generate our own JWT for session management
      const jwtPayload = {
        email: user.email,
        sub: user._id,
        googleId: user.googleId,
        name: user.name,
        picture: user.picture
      };
      return {
        access_token: this.jwtService.sign(jwtPayload),
        user: user
      };
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw new UnauthorizedException('Invalid Google Token');
    }
  }
}
