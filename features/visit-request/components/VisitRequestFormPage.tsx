"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, type Path, type UseFormRegisterReturn } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/button/Button";
import CheckboxField from "@/app/components/ui/inputs/CheckboxField";
import Heading from "@/app/components/ui/headings/Heading";
import InputField from "@/app/components/ui/inputs/InputField";
import SelectField from "@/app/components/ui/inputs/SelectField";
import { getErrorMessage } from "@/lib/api";
import {
  fetchPharmacies,
  fetchTelehealthServiceBySlug,
  submitVisitRequest,
} from "../api/telehealth.api";
import type {
  Pharmacy,
  ServiceFormField,
  TelehealthServiceDetail,
} from "../types/telehealth.types";
import RequestVisitShell from "./RequestVisitShell";

type VisitRequestFormValues = {
  pharmacyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  sex: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  pastMedicalProblems: string;
  currentMedications: string;
  knownAllergies: string;
  height: string;
  currentWeight: string;
  bmi: string;
  medicationDesired: string;
  dosageDesired: string;
  quantityDesired: string;
  reasonForMedication: string;
  chiefComplaint: string;
  agreedToTerms: boolean;
  [key: string]: string | boolean;
};

const sexOptions = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Other", label: "Other" },
];

const VisitRequestFormPage = () => {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [service, setService] = useState<TelehealthServiceDetail | null>(null);
  const [screeningFields, setScreeningFields] = useState<ServiceFormField[]>(
    [],
  );
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const { control, handleSubmit, register, reset } =
    useForm<VisitRequestFormValues>({
    defaultValues: {
      pharmacyId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      sex: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      pastMedicalProblems: "",
      currentMedications: "",
      knownAllergies: "",
      height: "",
      currentWeight: "",
      bmi: "",
      medicationDesired: "",
      dosageDesired: "",
      quantityDesired: "",
      reasonForMedication: "",
      chiefComplaint: "",
      agreedToTerms: false,
    },
  });

  useEffect(() => {
    const loadFormData = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        const [serviceResponse, pharmaciesResponse] = await Promise.all([
          fetchTelehealthServiceBySlug(slug),
          fetchPharmacies(),
        ]);

        setService(serviceResponse.service);
        setScreeningFields(
          serviceResponse.formFields.filter(
            (field) => field.section === "SCREENING",
          ),
        );
        setPharmacies(pharmaciesResponse.pharmacies);

        const screeningDefaults = serviceResponse.formFields
          .filter((field) => field.section === "SCREENING")
          .reduce<Record<string, string>>((defaults, field) => {
            defaults[`screening_${field.key}`] = "";
            return defaults;
          }, {});

        reset((currentValues) => ({
          ...currentValues,
          ...screeningDefaults,
        }));
      } catch (error) {
        setLoadError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    void loadFormData();
  }, [slug, reset]);

  const pharmacyOptions = useMemo(
    () =>
      pharmacies.map((pharmacy) => ({
        value: pharmacy.id,
        label: `${pharmacy.name} — ${pharmacy.address}`,
      })),
    [pharmacies],
  );

  const screeningSelectOptions = (field: ServiceFormField) =>
    (field.options ?? ["Yes", "No"]).map((option) => ({
      value: option,
      label: option,
    }));

  const onSubmit = async (values: VisitRequestFormValues) => {
    if (!service) {
      return;
    }

    if (!values.agreedToTerms) {
      toast.error("You must agree to the terms to continue");
      return;
    }

    const screeningAnswers = screeningFields.reduce<Record<string, string>>(
      (answers, field) => {
        const value = values[`screening_${field.key}`];
        if (typeof value === "string" && value.trim()) {
          answers[field.key] = value;
        }
        return answers;
      },
      {},
    );

    try {
      setIsSubmitting(true);

      const response = await submitVisitRequest({
        serviceSlug: service.slug,
        patient: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          dateOfBirth: values.dateOfBirth,
          sex: values.sex,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
        },
        health: {
          pastMedicalProblems: values.pastMedicalProblems,
          currentMedications: values.currentMedications,
          knownAllergies: values.knownAllergies,
          height: values.height,
          currentWeight: values.currentWeight,
          bmi: values.bmi,
          medicationDesired: values.medicationDesired,
          dosageDesired: values.dosageDesired,
          quantityDesired: values.quantityDesired,
          reasonForMedication: values.reasonForMedication,
          chiefComplaint: values.chiefComplaint,
        },
        screeningAnswers,
        pharmacyId: values.pharmacyId || undefined,
        agreedToTerms: values.agreedToTerms,
      });

      const visit = response.visit;
      const query = new URLSearchParams({
        visitCode: visit.visitCode,
        service: visit.service.name,
      });

      router.push(`/request-visit/success?${query.toString()}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <RequestVisitShell>
        <p className="text-gray-600">Loading form...</p>
      </RequestVisitShell>
    );
  }

  if (loadError || !service) {
    return (
      <RequestVisitShell>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {loadError ?? "Service not found"}
        </div>
        <Link
          href="/request-visit"
          className="mt-4 inline-block text-sm font-medium text-[#705295] hover:underline"
        >
          Back to services
        </Link>
      </RequestVisitShell>
    );
  }

  return (
    <RequestVisitShell>
      <div className="mb-6">
        <Link
          href="/request-visit"
          className="text-sm font-medium text-[#705295] hover:underline"
        >
          ← Back to services
        </Link>
      </div>

      <Heading
        title={`Request Asynchronous Visit — ${service.name}`}
        className="mb-2 text-left text-2xl md:text-3xl"
      />
      <p className="mb-8 text-sm text-gray-600">
        {service.description ??
          "Complete the form below to submit your visit request."}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
      >
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0A1E25]">Choose Pharmacy</h2>
          <SelectField
            label="Pharmacy"
            name="pharmacyId"
            control={control}
            options={pharmacyOptions}
            placeholder="Select a pharmacy"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0A1E25]">
            Patient Information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              control={control}
              required
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              control={control}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              control={control}
              required
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              control={control}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="text"
              control={control}
              placeholder="YYYY-MM-DD"
              required
            />
            <SelectField
              label="Sex"
              name="sex"
              control={control}
              options={sexOptions}
              placeholder="Select sex"
              required
            />
          </div>
          <InputField
            label="Street Address"
            name="streetAddress"
            type="text"
            control={control}
            required
          />
          <div className="grid gap-4 md:grid-cols-3">
            <InputField
              label="City"
              name="city"
              type="text"
              control={control}
              required
            />
            <InputField
              label="State"
              name="state"
              type="text"
              control={control}
              required
            />
            <InputField
              label="Zip Code"
              name="zipCode"
              type="text"
              control={control}
              required
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#0A1E25]">
            Patient Health Information
          </h2>
          <FormTextarea
            label="Past Medical Problems"
            registration={register("pastMedicalProblems")}
          />
          <FormTextarea
            label="Current Medications"
            registration={register("currentMedications")}
          />
          <FormTextarea
            label="Known Allergies"
            registration={register("knownAllergies")}
          />
          <div className="grid gap-4 md:grid-cols-3">
            <InputField
              label="Height"
              name="height"
              type="text"
              control={control}
            />
            <InputField
              label="Current Weight"
              name="currentWeight"
              type="text"
              control={control}
            />
            <InputField label="BMI" name="bmi" type="text" control={control} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <InputField
              label="Medication Desired"
              name="medicationDesired"
              type="text"
              control={control}
            />
            <InputField
              label="Dosage Desired"
              name="dosageDesired"
              type="text"
              control={control}
            />
            <InputField
              label="Quantity Desired"
              name="quantityDesired"
              type="text"
              control={control}
            />
          </div>
          <FormTextarea
            label="Reason for Medication"
            registration={register("reasonForMedication")}
          />
          <FormTextarea
            label="Chief Medical Complaint"
            registration={register("chiefComplaint")}
          />
        </section>

        {screeningFields.length > 0 ? (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-[#0A1E25]">
              Screening Questions
            </h2>
            {screeningFields.map((field) => (
              <SelectField
                key={field.id}
                label={field.label}
                name={`screening_${field.key}` as Path<VisitRequestFormValues>}
                control={control}
                options={screeningSelectOptions(field)}
                placeholder="Select an answer"
                required={field.required}
              />
            ))}
          </section>
        ) : null}

        <section className="space-y-4 border-t border-gray-100 pt-6">
          <CheckboxField
            label="I agree to the Terms of Service, Privacy Policy, and consent to telehealth treatment."
            name="agreedToTerms"
            control={control}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Link
              href="/request-visit"
              className="inline-flex h-[45px] items-center justify-center rounded-lg border border-[#D4CFCC] px-6 text-sm font-semibold text-[#0A1E25] hover:bg-gray-50"
            >
              Back
            </Link>
            <Button
              type="submit"
              label={isSubmitting ? "Submitting..." : "Submit Request"}
              width="w-auto"
              className="px-8"
              disabled={isSubmitting}
            />
          </div>
        </section>
      </form>
    </RequestVisitShell>
  );
};

type FormTextareaProps = {
  label: string;
  registration: UseFormRegisterReturn;
};

const FormTextarea = ({ label, registration }: FormTextareaProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-[14px] font-medium text-[#000000]">{label}</label>
    <textarea
      {...registration}
      rows={3}
      className="w-full rounded-lg border border-[#D4CFCC] bg-white px-4 py-3 text-[14px] text-[#0A1E25] outline-none placeholder:text-[#999999]/60"
    />
  </div>
);

export default VisitRequestFormPage;
