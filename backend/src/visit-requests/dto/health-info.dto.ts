import { IsOptional, IsString } from 'class-validator';

export class HealthInfoDto {
  @IsOptional()
  @IsString()
  pastMedicalProblems?: string;

  @IsOptional()
  @IsString()
  currentMedications?: string;

  @IsOptional()
  @IsString()
  knownAllergies?: string;

  @IsOptional()
  @IsString()
  height?: string;

  @IsOptional()
  @IsString()
  currentWeight?: string;

  @IsOptional()
  @IsString()
  bmi?: string;

  @IsOptional()
  @IsString()
  medicationDesired?: string;

  @IsOptional()
  @IsString()
  dosageDesired?: string;

  @IsOptional()
  @IsString()
  quantityDesired?: string;

  @IsOptional()
  @IsString()
  reasonForMedication?: string;

  @IsOptional()
  @IsString()
  chiefComplaint?: string;
}
