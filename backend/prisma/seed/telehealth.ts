import {
  CatalogType,
  FormFieldType,
  FormSection,
  PrismaClient,
} from '@prisma/client';

type ScreeningFieldSeed = {
  key: string;
  label: string;
  sortOrder: number;
};

type ServiceSeed = {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  price?: number;
  sortOrder: number;
  screeningFields?: ScreeningFieldSeed[];
};

type CategorySeed = {
  slug: string;
  name: string;
  type: CatalogType;
  sortOrder: number;
  services: ServiceSeed[];
};

const YES_NO_OPTIONS = ['Yes', 'No'];

const TELEHEALTH_CATEGORIES: CategorySeed[] = [
  {
    slug: 'respiratory-diseases',
    name: 'Respiratory Diseases',
    type: CatalogType.DISEASE,
    sortOrder: 1,
    services: [
      {
        slug: 'common-cold',
        name: 'Common Cold',
        icon: '🤧',
        sortOrder: 1,
      },
      {
        slug: 'flu',
        name: 'Flu (Influenza)',
        icon: '🌡️',
        sortOrder: 2,
      },
      {
        slug: 'asthma',
        name: 'Asthma',
        icon: '🫁',
        sortOrder: 3,
      },
    ],
  },
  {
    slug: 'skin-diseases',
    name: 'Skin Diseases',
    type: CatalogType.DISEASE,
    sortOrder: 2,
    services: [
      {
        slug: 'acne-treatment',
        name: 'Acne Treatment',
        icon: '✨',
        description: 'Treatment for mild to moderate acne.',
        sortOrder: 1,
        screeningFields: [
          {
            key: 'severeAcneScarring',
            label: 'Do you have severe acne scarring?',
            sortOrder: 1,
          },
          {
            key: 'pregnantOrBreastfeeding',
            label: 'Are you currently pregnant or breastfeeding?',
            sortOrder: 2,
          },
        ],
      },
      {
        slug: 'eczema',
        name: 'Eczema',
        icon: '🩹',
        sortOrder: 2,
      },
    ],
  },
  {
    slug: 'urinary-conditions',
    name: 'Urinary Conditions',
    type: CatalogType.DISEASE,
    sortOrder: 3,
    services: [
      {
        slug: 'uti-treatment',
        name: 'UTI Treatment',
        icon: '💧',
        description: 'Asynchronous visit for urinary tract infection symptoms.',
        price: 49.99,
        sortOrder: 1,
        screeningFields: [
          {
            key: 'burningUrination',
            label: 'Are you experiencing burning during urination?',
            sortOrder: 1,
          },
          {
            key: 'feverPresent',
            label: 'Do you currently have a fever?',
            sortOrder: 2,
          },
          {
            key: 'bloodInUrine',
            label: 'Have you noticed blood in your urine?',
            sortOrder: 3,
          },
        ],
      },
    ],
  },
  {
    slug: 'weight-management',
    name: 'Weight Management',
    type: CatalogType.MEDICATION,
    sortOrder: 4,
    services: [
      {
        slug: 'mounjaro',
        name: 'Mounjaro',
        icon: '💊',
        description: 'Weight management medication request.',
        price: 299.99,
        sortOrder: 1,
        screeningFields: [
          {
            key: 'allergicReactionMounjaro',
            label:
              'Has the patient ever had an allergic reaction to Mounjaro or similar medications?',
            sortOrder: 1,
          },
          {
            key: 'thyroidCancerHistory',
            label:
              'Does the patient have a personal or family history of thyroid cancer?',
            sortOrder: 2,
          },
          {
            key: 'pancreatitisHistory',
            label: 'Does the patient have a history of pancreatitis?',
            sortOrder: 3,
          },
          {
            key: 'diabeticRetinopathy',
            label: 'Does the patient have diabetic retinopathy?',
            sortOrder: 4,
          },
          {
            key: 'pregnantOrBreastfeeding',
            label: 'Is the patient pregnant, planning pregnancy, or breastfeeding?',
            sortOrder: 5,
          },
          {
            key: 'gastroparesis',
            label: 'Does the patient have gastroparesis?',
            sortOrder: 6,
          },
          {
            key: 'kidneyDisease',
            label: 'Does the patient have severe kidney disease?',
            sortOrder: 7,
          },
          {
            key: 'medullaryThyroidCarcinoma',
            label:
              'Does the patient have Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)?',
            sortOrder: 8,
          },
        ],
      },
    ],
  },
  {
    slug: 'pain-and-fever',
    name: 'Pain & Fever',
    type: CatalogType.MEDICATION,
    sortOrder: 5,
    services: [
      {
        slug: 'paracetamol',
        name: 'Paracetamol',
        icon: '💊',
        sortOrder: 1,
      },
      {
        slug: 'ibuprofen',
        name: 'Ibuprofen',
        icon: '💊',
        sortOrder: 2,
      },
    ],
  },
];

const PHARMACY_SEEDS = [
  {
    name: 'ABC Hawaii Pharmacy',
    address: '123 Main Street',
    city: 'Honolulu',
    state: 'HI',
    zipCode: '96813',
    phone: '(808) 555-0101',
    fax: '(808) 555-0102',
    latitude: 21.3069,
    longitude: -157.8583,
  },
  {
    name: 'Pacific Care Pharmacy',
    address: '456 Kalakaua Ave',
    city: 'Honolulu',
    state: 'HI',
    zipCode: '96815',
    phone: '(808) 555-0202',
    fax: '(808) 555-0203',
    latitude: 21.2793,
    longitude: -157.8293,
  },
  {
    name: 'Island Health Pharmacy',
    address: '789 King Street',
    city: 'Honolulu',
    state: 'HI',
    zipCode: '96817',
    phone: '(808) 555-0303',
    latitude: 21.3228,
    longitude: -157.8701,
  },
];

export async function seedTelehealth(prisma: PrismaClient) {
  for (const categorySeed of TELEHEALTH_CATEGORIES) {
    const category = await prisma.serviceCategory.upsert({
      where: { slug: categorySeed.slug },
      update: {
        name: categorySeed.name,
        type: categorySeed.type,
        sortOrder: categorySeed.sortOrder,
        isActive: true,
      },
      create: {
        slug: categorySeed.slug,
        name: categorySeed.name,
        type: categorySeed.type,
        sortOrder: categorySeed.sortOrder,
        isActive: true,
      },
    });

    for (const serviceSeed of categorySeed.services) {
      const service = await prisma.telehealthService.upsert({
        where: { slug: serviceSeed.slug },
        update: {
          categoryId: category.id,
          name: serviceSeed.name,
          description: serviceSeed.description,
          icon: serviceSeed.icon,
          price: serviceSeed.price,
          sortOrder: serviceSeed.sortOrder,
          isActive: true,
        },
        create: {
          categoryId: category.id,
          slug: serviceSeed.slug,
          name: serviceSeed.name,
          description: serviceSeed.description,
          icon: serviceSeed.icon,
          price: serviceSeed.price,
          sortOrder: serviceSeed.sortOrder,
          isActive: true,
        },
      });

      if (serviceSeed.screeningFields?.length) {
        for (const field of serviceSeed.screeningFields) {
          await prisma.serviceFormField.upsert({
            where: {
              serviceId_key: {
                serviceId: service.id,
                key: field.key,
              },
            },
            update: {
              label: field.label,
              section: FormSection.SCREENING,
              fieldType: FormFieldType.SELECT,
              options: YES_NO_OPTIONS,
              required: true,
              sortOrder: field.sortOrder,
            },
            create: {
              serviceId: service.id,
              key: field.key,
              label: field.label,
              section: FormSection.SCREENING,
              fieldType: FormFieldType.SELECT,
              options: YES_NO_OPTIONS,
              required: true,
              sortOrder: field.sortOrder,
            },
          });
        }
      }
    }
  }

  for (const pharmacy of PHARMACY_SEEDS) {
    const existing = await prisma.pharmacy.findFirst({
      where: {
        name: pharmacy.name,
        address: pharmacy.address,
      },
    });

    if (existing) {
      await prisma.pharmacy.update({
        where: { id: existing.id },
        data: {
          ...pharmacy,
          isActive: true,
        },
      });
      continue;
    }

    await prisma.pharmacy.create({
      data: {
        ...pharmacy,
        isActive: true,
      },
    });
  }

  console.log('Telehealth catalog and pharmacies seeded successfully');
}
