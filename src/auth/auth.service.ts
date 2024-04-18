import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}

  async register(registerDto: RegisterDto){
    const userFound = await this.userService.findByUserNameOrEmail(registerDto.email);

    if (userFound) {
      throw new BadRequestException('User already exists');
    }

    return await this.userService.create(registerDto);
  }

  async login (loginDto: LoginDto) {
    const user = await this.userService.findByUserNameOrEmail(loginDto.userNameOrEmail);

    if (!user) {
      throw new BadRequestException('email or password is wrong');
    }
    
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('email or password is wrong');
    }

    const payload = { sub: user.id, username: user.userName, email: user.email, roles: user.roles};
    const token = await this.jwtService.signAsync(payload)
    
    return {
      token,
      username: payload.username,
      email: payload.email,
      roles: payload.roles
    };
  }
}
