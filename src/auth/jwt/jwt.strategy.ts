import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config, CONFIG } from 'src/configuration';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(CONFIG) conf: Config, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: conf.JWT_SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    return this.userService.findById(payload.id);
  }
}
