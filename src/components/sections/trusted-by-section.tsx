import Image from "next/image";

const logos = [
  { name: "BoAt", src: "https://placehold.co/200x100.png", hint: "boat logo" },
  { name: "Mamaearth", src: "https://placehold.co/200x100.png", hint: "mamaearth logo" },
  { name: "UrbanGabru", src: "https://placehold.co/200x100.png", hint: "urbangabru logo" },
  { name: "Lenskart", src: "https://placehold.co/200x100.png", hint: "lenskart logo" },
  { name: "Myntra", src: "https://placehold.co/200x100.png", hint: "myntra logo" },
  { name: "Noise", src: "https://placehold.co/200x100.png", hint: "noise logo" },
  { name: "Bewakoof", src: "https://placehold.co/200x100.png", hint: "bewakoof logo" },
];

const duplicatedLogos = [...logos, ...logos];

export default function TrustedBySection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-muted-foreground tracking-tight">
          Trusted by Modern Brands
        </h2>
        <div className="relative mt-12 w-full overflow-hidden">
          <div className="flex animate-logo-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-64 px-8">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={80}
                  data-ai-hint={logo.hint}
                  className="w-full h-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        </div>
      </div>
    </section>
  );
}
