import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginReqDto, LoginResDto } from './auth.dto';
import { IJwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginReqDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Username or password incorrect');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username or password incorrect');
    }
    return this.generateJWT(user);
  }

  private generateJWT(user: User): LoginResDto {
    const payload: IJwtPayload = {
      id: user.id,
      fullName: `${user.firstname} ${user.lastname}`,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
