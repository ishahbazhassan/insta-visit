"use client";

import { useRouter } from "next/navigation";

type HeroCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
  variant: "provider" | "patient";
  href: string;
};

const HeroCard = ({
  title,
  description,
  buttonLabel,
  variant,
  href,
}: HeroCardProps) => {
  const router = useRouter();
  const isProvider = variant === "provider";

  return (
    <div
      id={variant}
      className={`relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl p-6 md:min-h-[380px] md:p-8 ${
        isProvider
          ? "bg-gradient-to-br from-[#5a3f7a] via-[#705295] to-[#8b6aad]"
          : "bg-[#F5EDE6]"
      }`}
    >
      {isProvider && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {!isProvider && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="relative z-10">
        <h2
          className={`text-xl font-bold leading-snug md:text-2xl ${
            isProvider ? "text-white" : "text-[#0A1E25]"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-3 text-sm leading-relaxed md:text-base ${
              isProvider ? "text-white/90" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        )}
        <button
          type="button"
          onClick={() => router.push(href)}
          className={`mt-6 rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
            isProvider
              ? "bg-white text-[#705295]"
              : "bg-[#705295] text-white"
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
