import { solutions } from "../../data/landing-content";
import SectionHeading from "../shared/SectionHeading";
import SolutionCard from "./SolutionCard";

const SolutionsSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <SectionHeading
        title="Explore Our Healthcare"
        highlight="Solutions"
        subtitle="Find services created to make healthcare simple and accessible."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {solutions.map((item) => (
          <SolutionCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default SolutionsSection;
