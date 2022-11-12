import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserReqDto {
  @IsString()
  @ApiProperty()
  readonly firstname: string;

  @IsString()
  @ApiProperty()
  readonly lastname: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;
}

export class UpdateUserReqDto extends PartialType(CreateUserReqDto) {}
