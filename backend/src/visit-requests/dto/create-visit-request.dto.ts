import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { HealthInfoDto } from './health-info.dto';
import { PatientInfoDto } from './patient-info.dto';

export class CreateVisitRequestDto {
  @IsString()
  @MinLength(2)
  serviceSlug!: string;

  @ValidateNested()
  @Type(() => PatientInfoDto)
  patient!: PatientInfoDto;

  @ValidateNested()
  @Type(() => HealthInfoDto)
  health!: HealthInfoDto;

  @IsOptional()
  @IsObject()
  screeningAnswers?: Record<string, string>;

  @IsOptional()
  @IsUUID()
  pharmacyId?: string;

  @IsBoolean()
  agreedToTerms!: boolean;
}
