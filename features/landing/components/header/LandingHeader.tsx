"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { landingNavLinks } from "../../data/landing-content";

const LandingHeader = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/icons/instaVisit.svg"
            alt="InstaVisitRx+"
            width={160}
            height={36}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {landingNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#0A1E25] transition-colors hover:text-[#705295]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:support@instavisitrx.com"
            className="text-[#0A1E25] transition-colors hover:text-[#705295]"
            aria-label="Contact email"
          >
            <HiOutlineMail size={22} />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => router.push(AUTH_ROUTES.login)}
          className="shrink-0 rounded-full bg-[#705295] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Login | Sign Up
        </button>
      </div>
    </header>
  );
};

export default LandingHeader;
