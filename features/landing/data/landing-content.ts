export const landingNavLinks = [
  { label: "Home", href: "#home" },
  { label: "Provider", href: "#provider" },
  { label: "Patient", href: "#patient" },
  { label: "FAQs", href: "#faqs" },
] as const;

export const heroCards = [
  {
    id: "provider",
    title: "Are You a Provider? Join Us & Grow Your Practice",
    description:
      "Reach more patients, increase flexibility, and streamline visits with a secure, easy-to-use InstaVisitRx designed for licensed providers.",
    buttonLabel: "Join as Provider",
    variant: "provider" as const,
    href: "/signup",
  },
  {
    id: "patient",
    title:
      "Easily request asynchronous Telehealth visits, share your health concerns, and get professional medical guidance from trusted providers in minutes (more immediate)",
    description: "",
    buttonLabel: "Request Treatment Now",
    variant: "patient" as const,
    href: "/signup",
  },
] as const;

export const treatments = [
  { id: "uti", label: "UTI Treatment", emoji: "💧" },
  { id: "acne", label: "Acne Treatment", emoji: "✨" },
  { id: "birth-control", label: "Birth Control", emoji: "💊" },
  { id: "pink-eye", label: "Pink Eye", emoji: "👁️" },
] as const;

export const solutions = [
  {
    id: "certified",
    title: "Certified Providers",
    description:
      "Connect with licensed healthcare professionals you can trust.",
    icon: "🩺",
  },
  {
    id: "availability",
    title: "24/7 Availability",
    description:
      "Access care when you need it, without waiting for office hours.",
    icon: "🕐",
  },
  {
    id: "secure",
    title: "Secure & Private",
    description:
      "Your health information is protected with industry-standard security.",
    icon: "🔒",
  },
  {
    id: "accessible",
    title: "Easy & Accessible",
    description:
      "Simple, user-friendly platform designed for patients and providers.",
    icon: "📱",
  },
] as const;

export const faqItems = [
  {
    id: "what-is",
    question: "What is InstaVisitRx?",
    answer:
      "InstaVisitRx is a telehealth platform that connects patients with licensed providers for asynchronous online visits, treatment requests, and secure medical guidance.",
  },
  {
    id: "request-visit",
    question: "How do I Request an online visit?",
    answer:
      "Create an account, complete your health intake form, select your concern, and submit a visit request. A licensed provider will review and respond through the platform.",
  },
  {
    id: "services",
    question: "What types of services are offered?",
    answer:
      "We offer treatment for common conditions including UTI, acne, birth control, pink eye, and more — all reviewed by certified healthcare providers.",
  },
  {
    id: "providers",
    question: "Who are the providers on InstaVisitRx?",
    answer:
      "All providers on InstaVisitRx are licensed medical professionals who have been verified and credentialed before joining the platform.",
  },
  {
    id: "privacy",
    question: "Is my information kept private?",
    answer:
      "Yes. InstaVisitRx uses secure, HIPAA-compliant practices to protect your personal and medical information at all times.",
  },
] as const;

export const footerSocialLinks = [
  { id: "tiktok", label: "TikTok", href: "#" },
  { id: "x", label: "X", href: "#" },
  { id: "instagram", label: "Instagram", href: "#" },
  { id: "linkedin", label: "LinkedIn", href: "#" },
  { id: "facebook", label: "Facebook", href: "#" },
] as const;
