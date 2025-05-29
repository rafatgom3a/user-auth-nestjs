import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsNumber,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must be alphanumeric and at least 8 characters long',
  })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty({ example: '01234567890' })
  @Matches(/^01\d{9}$/, {
    message: 'Mobile number must start with 01 and be 11 digits',
  })
  mobileNumber: string;

  @ApiProperty({ example: 'normal', enum: ['admin', 'normal'] })
  @IsIn(['admin', 'normal'])
  role: 'admin' | 'normal';
}
