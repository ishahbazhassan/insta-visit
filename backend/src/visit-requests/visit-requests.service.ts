import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVisitRequestDto } from './dto/create-visit-request.dto';

@Injectable()
export class VisitRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVisitRequestDto) {
    if (!dto.agreedToTerms) {
      throw new BadRequestException('You must agree to the terms to continue');
    }

    const service = await this.prisma.telehealthService.findFirst({
      where: {
        slug: dto.serviceSlug,
        isActive: true,
        category: { isActive: true },
      },
      include: {
        formFields: {
          where: { required: true },
          select: { key: true, label: true },
        },
      },
    });

    if (!service) {
      throw new NotFoundException('Telehealth service not found');
    }

    if (dto.pharmacyId) {
      const pharmacy = await this.prisma.pharmacy.findFirst({
        where: { id: dto.pharmacyId, isActive: true },
      });

      if (!pharmacy) {
        throw new NotFoundException('Pharmacy not found');
      }
    }

    this.validateScreeningAnswers(service.formFields, dto.screeningAnswers);

    const normalizedEmail = dto.patient.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser && existingUser.role !== Role.PATIENT) {
      throw new ConflictException(
        'This email is already registered with a different account type',
      );
    }

    const visitCode = await this.generateUniqueVisitCode();
    const dateOfBirth = new Date(dto.patient.dateOfBirth);

    if (Number.isNaN(dateOfBirth.getTime())) {
      throw new BadRequestException('Invalid date of birth');
    }

    const visit = await this.prisma.$transaction(async (tx) => {
      const patientUser = existingUser
        ? await tx.user.update({
            where: { id: existingUser.id },
            data: {
              firstName: dto.patient.firstName.trim(),
              lastName: dto.patient.lastName.trim(),
              phone: dto.patient.phone.trim(),
              status: UserStatus.ACTIVE,
            },
          })
        : await tx.user.create({
            data: {
              firstName: dto.patient.firstName.trim(),
              lastName: dto.patient.lastName.trim(),
              email: normalizedEmail,
              phone: dto.patient.phone.trim(),
              role: Role.PATIENT,
              status: UserStatus.ACTIVE,
            },
          });

      await tx.patientProfile.upsert({
        where: { userId: patientUser.id },
        update: {
          dateOfBirth,
          sex: dto.patient.sex.trim(),
          streetAddress: dto.patient.streetAddress.trim(),
          city: dto.patient.city.trim(),
          state: dto.patient.state.trim(),
          zipCode: dto.patient.zipCode.trim(),
        },
        create: {
          userId: patientUser.id,
          dateOfBirth,
          sex: dto.patient.sex.trim(),
          streetAddress: dto.patient.streetAddress.trim(),
          city: dto.patient.city.trim(),
          state: dto.patient.state.trim(),
          zipCode: dto.patient.zipCode.trim(),
        },
      });

      return tx.visit.create({
        data: {
          visitCode,
          patientId: patientUser.id,
          serviceId: service.id,
          pharmacyId: dto.pharmacyId,
          pastMedicalProblems: dto.health.pastMedicalProblems?.trim(),
          currentMedications: dto.health.currentMedications?.trim(),
          knownAllergies: dto.health.knownAllergies?.trim(),
          height: dto.health.height?.trim(),
          currentWeight: dto.health.currentWeight?.trim(),
          bmi: dto.health.bmi?.trim(),
          medicationDesired: dto.health.medicationDesired?.trim(),
          dosageDesired: dto.health.dosageDesired?.trim(),
          quantityDesired: dto.health.quantityDesired?.trim(),
          reasonForMedication: dto.health.reasonForMedication?.trim(),
          chiefComplaint: dto.health.chiefComplaint?.trim(),
          agreedToTerms: dto.agreedToTerms,
          screeningAnswers: dto.screeningAnswers ?? {},
        },
        select: {
          id: true,
          visitCode: true,
          status: true,
          createdAt: true,
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          service: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          pharmacy: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      });
    });

    return {
      message: 'Visit request submitted successfully',
      visit: {
        id: visit.id,
        visitCode: visit.visitCode,
        status: visit.status,
        createdAt: visit.createdAt,
        patient: visit.patient,
        service: visit.service,
        pharmacy: visit.pharmacy,
      },
    };
  }

  private validateScreeningAnswers(
    requiredFields: Array<{ key: string; label: string }>,
    screeningAnswers?: Record<string, string>,
  ) {
    if (!requiredFields.length) {
      return;
    }

    const answers = screeningAnswers ?? {};
    const missingFields = requiredFields.filter((field) => {
      const value = answers[field.key];
      return typeof value !== 'string' || value.trim().length === 0;
    });

    if (missingFields.length > 0) {
      throw new BadRequestException({
        message: 'Missing required screening answers',
        fields: missingFields.map((field) => field.key),
      });
    }
  }

  private async generateUniqueVisitCode() {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const visitCode = `AV-${Date.now().toString().slice(-6)}${Math.floor(
        100 + Math.random() * 900,
      )}`;

      const existing = await this.prisma.visit.findUnique({
        where: { visitCode },
        select: { id: true },
      });

      if (!existing) {
        return visitCode;
      }
    }

    throw new BadRequestException('Unable to generate visit code. Please retry.');
  }
}
