import { heroCards } from "../../data/landing-content";
import HeroCard from "./HeroCard";

const HeroSection = () => {
  return (
    <section id="home" className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-5 md:grid-cols-2">
        {heroCards.map((card) => (
          <HeroCard
            key={card.id}
            title={card.title}
            description={card.description}
            buttonLabel={card.buttonLabel}
            variant={card.variant}
            href={card.href}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
