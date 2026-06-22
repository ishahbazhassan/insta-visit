import { IsIn } from 'class-validator';

export class UpdateProviderStatusDto {
  @IsIn(['ACTIVE', 'INACTIVE'], {
    message: 'Status must be ACTIVE or INACTIVE',
  })
  status!: 'ACTIVE' | 'INACTIVE';
}
