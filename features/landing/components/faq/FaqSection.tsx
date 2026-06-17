"use client";

import { useState } from "react";
import { faqItems } from "../../data/landing-content";
import SectionHeading from "../shared/SectionHeading";
import FaqItem from "./FaqItem";

const FaqSection = () => {
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  return (
    <section id="faqs" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <SectionHeading
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Explore commonly asked questions to better understand our platform, features, and care process."
      />
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
        {faqItems.map((item) => (
          <FaqItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openId === item.id}
            onToggle={() =>
              setOpenId((prev) => (prev === item.id ? "" : item.id))
            }
          />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
