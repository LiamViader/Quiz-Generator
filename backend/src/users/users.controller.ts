import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config'; // Assuming you have or will use JwtAuthGuard directly or via strategy

@Controller('users')
export class UsersController {
  constructor(private readonly configService: ConfigService) { }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    const personalLimit = parseInt(this.configService.get<string>('PERSONAL_DAILY_QUIZ_LIMIT') || "10");
    return {
      ...req.user.toObject(),
      personalLimit
    };
  }
}
