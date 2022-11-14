import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class CreateUserReqDto {
  @IsString()
  @ApiProperty()
  readonly firstname: string;

  @IsString()
  @ApiProperty()
  readonly lastname: string;

  @IsString()
  @IsOptional()
  @ValidateIf((obj) => !!obj.email)
  @IsEmail()
  @ApiProperty()
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

export class UpdateUserReqDto extends PartialType(CreateUserReqDto) {
  @IsString()
  @IsOptional()
  @ValidateIf((obj) => !!obj.password)
  @Length(6)
  @ApiProperty()
  readonly password?: string;
}
