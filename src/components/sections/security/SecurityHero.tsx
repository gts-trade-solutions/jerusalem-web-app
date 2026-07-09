import { Icon } from "@/components/Icon";

/**
 * Security hero — golden family/temple photo (cropped from the client
 * reference) on the right, warm haze left (a blurred copy of the same photo),
 * dark serif headline block, and the floating "Your Safety" card.
 */
export function SecurityHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* golden haze underlay — blurred copy of the photo keeps tones identical */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/security-hero.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-90 blur-2xl saturate-[1.05]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,243,226,0.9),rgba(250,243,226,0.72)_36%,rgba(250,243,226,0.18)_58%,transparent_72%)]" />

      <div className="relative z-[1] mx-auto grid max-w-[1400px] items-stretch lg:grid-cols-[1fr_1.02fr]">
        {/* text */}
        <div className="min-w-0 px-4 py-8 sm:px-6 lg:py-10 lg:pl-10 lg:pr-0">
          <h1 className="max-w-full break-words font-serif text-3xl font-bold leading-[1.05] tracking-tight text-[#251f12] sm:text-4xl lg:whitespace-nowrap lg:text-[2.45rem] xl:text-[2.9rem]">
            Authentication &amp; Security
          </h1>
          <p className="mt-2 max-w-full break-words font-serif text-lg font-medium text-[#2f5d3a] sm:text-xl">
            Protecting Faith and Community in Christ.
          </p>
          <p className="mt-4 max-w-md break-words text-[15px] leading-relaxed text-[#3a352a]">
            We are committed to providing a safe, trusted, and secure space for
            gathering, sharing, and growing together in Christ.
          </p>
        </div>

        {/* photo + floating card */}
        <div className="relative min-h-[14rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/security-hero.jpg"
            alt="A family looking at a phone together at golden hour, with the temple in the distance"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 16%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 16%)",
            }}
          />
          {/* sized/positioned to always cover the patched zone in the photo */}
          <div className="absolute bottom-[3%] right-[1%] flex min-h-[39%] w-[34.5%] min-w-[195px] flex-col justify-center rounded-xl bg-white p-3.5 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg border-2 border-[#b8892b] text-[#b8892b]">
                <Icon name="ShieldCheck" size={24} strokeWidth={2} />
              </span>
              <p className="font-serif text-base font-bold leading-tight text-[#251f12]">
                Your Safety.
                <br />
                Our Priority.
              </p>
            </div>
            <p className="mt-2.5 flex items-center gap-1.5 text-[13px] font-medium text-[#3a352a]">
              <span className="grid size-4 place-items-center rounded-full bg-[#2f7d52] text-white">
                <Icon name="Check" size={10} strokeWidth={3} />
              </span>
              Protected in Christ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
