import { IsDateString, IsEmail, IsString, MinLength } from 'class-validator';

export class PatientInfoDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsString()
  sex!: string;

  @IsString()
  streetAddress!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  zipCode!: string;
}
