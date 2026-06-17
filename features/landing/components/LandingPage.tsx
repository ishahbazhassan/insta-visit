"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/features/auth/lib/session";
import FaqSection from "./faq/FaqSection";
import LandingFooter from "./footer/LandingFooter";
import LandingHeader from "./header/LandingHeader";
import HeroSection from "./hero/HeroSection";
import MobileAppSection from "./mobile-app/MobileAppSection";
import SolutionsSection from "./solutions/SolutionsSection";
import TreatmentsSection from "./treatments/TreatmentsSection";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/provider/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <HeroSection />
        <TreatmentsSection />
        <SolutionsSection />
        <MobileAppSection />
        <FaqSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
