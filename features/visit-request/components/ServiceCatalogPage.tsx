"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Heading from "@/app/components/ui/headings/Heading";
import { getErrorMessage } from "@/lib/api";
import { fetchTelehealthCategories } from "../api/telehealth.api";
import type { ServiceCategory } from "../types/telehealth.types";
import RequestVisitShell from "./RequestVisitShell";

const ServiceCatalogPage = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchTelehealthCategories();
        setCategories(response.categories);
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setIsLoading(false);
      }
    };

    void loadCategories();
  }, []);

  const diseaseCategories = useMemo(
    () => categories.filter((category) => category.type === "DISEASE"),
    [categories],
  );

  const medicationCategories = useMemo(
    () => categories.filter((category) => category.type === "MEDICATION"),
    [categories],
  );

  const renderCategoryBlock = (category: ServiceCategory) => (
    <div key={category.id} className="space-y-3">
      <h3 className="text-base font-semibold text-[#0A1E25]">{category.name}</h3>
      <div className="flex flex-wrap gap-2">
        {category.services.map((service) => (
          <Link
            key={service.id}
            href={`/request-visit/${service.slug}`}
            className="rounded-lg border border-[#E8E0F0] bg-white px-4 py-2 text-sm font-medium text-[#705295] transition-colors hover:bg-[#F5F0FA]"
          >
            {service.icon ? `${service.icon} ` : null}
            {service.name}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <RequestVisitShell>
      <Heading
        title="Telehealth Services"
        className="mb-2 text-left text-2xl md:text-3xl"
      />
      <p className="mb-8 text-sm text-gray-600">
        Select a condition or medication to start your asynchronous visit
        request.
      </p>

      {isLoading ? (
        <p className="text-gray-600">Loading services...</p>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error ? (
        <div className="grid gap-10 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-[#0A1E25]">
              Diseases &amp; Conditions
            </h2>
            <div className="space-y-6">
              {diseaseCategories.map(renderCategoryBlock)}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-[#0A1E25]">Medications</h2>
            <div className="space-y-6">
              {medicationCategories.map(renderCategoryBlock)}
            </div>
          </section>
        </div>
      ) : null}
    </RequestVisitShell>
  );
};

export default ServiceCatalogPage;
