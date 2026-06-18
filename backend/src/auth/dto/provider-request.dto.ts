import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ProviderRequestDto {
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

  @IsString()
  npiNumber!: string;

  @IsString()
  credentials!: string;

  @IsString()
  licenseNumber!: string;

  @IsString()
  licenseExpirationDate!: string;

  @IsString()
  licenseState!: string;

  @IsString()
  homeStreetAddress!: string;

  @IsString()
  homeCity!: string;

  @IsString()
  homeState!: string;

  @IsString()
  homeZipCode!: string;

  @IsString()
  practiceAddress!: string;

  @IsOptional()
  @IsBoolean()
  sameAsHomeAddress?: boolean;
}
