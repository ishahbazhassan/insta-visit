"use client";

import { FaMinus, FaPlus } from "react-icons/fa";

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-[#0A1E25] md:text-base">
          {question}
        </span>
        <span className="shrink-0 text-[#705295]">
          {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-gray-50 px-6 pb-5 pt-2">
          <p className="text-sm leading-relaxed text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
