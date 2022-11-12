import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class LoginReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export class LoginResDto {
  @IsNotEmpty()
  @IsObject()
  @ApiProperty()
  user: User;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  access_token: string;
}
