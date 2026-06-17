import Image from "next/image";
import Link from "next/link";
import { footerSocialLinks } from "../../data/landing-content";

const LandingFooter = () => {
  return (
    <footer className="border-t border-[#F5EDE6] bg-[#FFF9F8]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <Image
          src="/assets/icons/instaVisit.svg"
          alt="InstaVisitRx+"
          width={150}
          height={34}
        />

        <div className="flex flex-wrap items-center gap-4">
          {footerSocialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xs font-bold text-gray-500 transition-colors hover:border-[#705295] hover:text-[#705295]"
              aria-label={social.label}
            >
              {social.label.charAt(0)}
            </a>
          ))}
          <div
            className="ml-2 flex h-9 items-center rounded border border-gray-200 px-2 text-[10px] text-gray-400"
            title="Security badge"
          >
            🔒 Secure
          </div>
        </div>
      </div>

      <div className="border-t border-[#F5EDE6]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-gray-400 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} InstaVisitRx+. All rights reserved.</p>
          <Link href="#" className="hover:text-[#705295]">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
