const MobileAppSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#F5F0FA] py-16 md:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full border border-[#705295]/10" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full border border-[#705295]/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1E25] md:text-3xl">
            Download Our <span className="text-[#705295]">Mobile App</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
            Get convenient access to care anytime, anywhere. Download our mobile
            app to connect with licensed providers, manage your requests, and
            receive updates on the go.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-xl bg-black px-5 py-3 text-xs font-semibold text-white"
            >
              Download on the App Store
            </button>
            <button
              type="button"
              className="rounded-xl bg-black px-5 py-3 text-xs font-semibold text-white"
            >
              GET IT ON Google Play
            </button>
          </div>
        </div>

        <div className="relative mx-auto flex h-[320px] w-full max-w-sm items-center justify-center">
          <div className="absolute left-0 top-8 h-[280px] w-[140px] rounded-[2rem] border-4 border-[#705295] bg-gradient-to-b from-[#705295] to-[#5a3f7a] shadow-xl" />
          <div className="absolute right-0 top-0 h-[300px] w-[150px] rounded-[2rem] border-4 border-gray-200 bg-white shadow-xl">
            <div className="flex h-full flex-col gap-2 p-4">
              <div className="h-3 w-16 rounded bg-[#EBE5F1]" />
              <div className="mt-2 h-20 rounded-lg bg-[#F5F0FA]" />
              <div className="h-12 rounded-lg bg-[#F5F0FA]" />
              <div className="h-12 rounded-lg bg-[#F5F0FA]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
