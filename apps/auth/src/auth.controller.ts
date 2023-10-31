import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'User Login Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: Object,
     description: 'Json structure for expected body request',
  })
  async login(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.msg);
  }


  @ApiResponse({ status: 201, description: 'Signup Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: Object,
     description: 'Json structure for expected body request',
  })
  @Post('register')
  async register(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.content);
  }
}