import { treatments } from "../../data/landing-content";
import SectionHeading from "../shared/SectionHeading";
import TreatmentCard from "./TreatmentCard";

const TreatmentsSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <SectionHeading
        title="Recommended Popular"
        highlight="Treatments"
        subtitle="Explore commonly used treatments recommended by healthcare providers."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {treatments.map((item) => (
          <TreatmentCard key={item.id} label={item.label} emoji={item.emoji} />
        ))}
      </div>
    </section>
  );
};

export default TreatmentsSection;
