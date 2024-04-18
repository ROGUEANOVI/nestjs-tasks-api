import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService){
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({summary: 'Register Account'})
  @ApiResponse({status:201, description: "Return created user account"})
  @ApiResponse({status:400, description: "Return register bad request"})
  register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @ApiOperation({summary: 'Login Account'})
  @ApiResponse({status:201, description: "Return created user account"})
  @ApiResponse({status:400, description: "Return register bad request"})
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
}
