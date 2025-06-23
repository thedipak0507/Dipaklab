import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/lib/constants";
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import AddonsSection from "@/components/sections/addons-section";

const portfolioItems = [
  { src: "https://placehold.co/800x600.png", hint: "yellow sportscar", title: "BOAT", category: "AD FILM" },
  { src: "https://placehold.co/600x800.png", hint: "man on motorcycle", title: "URBAN GABRU", category: "UGC" },
  { src: "https://placehold.co/800x600.png", hint: "woman in black jacket", title: "NOISE", category: "AD FILM" },
]

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-body relative overflow-x-clip">
      <Header />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800" />
      <main className="relative z-10">
        <section id="hero" className="container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-48 md:pb-24 text-center relative">
          <h1 className="font-headline text-8xl md:text-[16vw] leading-none tracking-tighter">MYADLABS</h1>
          <div className="flex justify-center items-center gap-12 font-code uppercase text-xs tracking-[0.3em] mt-4 mb-12 relative">
             <div className="absolute w-[90%] h-px bg-neutral-800 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            <Link href="#work" className="bg-black px-4 z-10">Work</Link>
            <Link href="#about" className="bg-black px-4 z-10">About</Link>
          </div>
          <div className="max-w-4xl mx-auto my-12 flex justify-center items-center">
            <div className="bg-[#111] p-[10px] rounded-[20px] shadow-[0_0_15px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.4)] border-2 border-[#333] w-full aspect-video relative overflow-hidden">
              <video autoPlay muted loop playsInline className="w-full h-full rounded-[12px] object-cover pointer-events-none">
                <source src="/myadmerge.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <p className="font-headline text-3xl md:text-5xl tracking-tight">PROFESSIONAL ADS FOR LESS</p>
          <p className="font-headline text-3xl md:text-5xl tracking-tight mt-2">FASTER, SHARPER & 70% CHEAPER</p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full rounded-full px-10 py-7 font-code text-base font-semibold uppercase tracking-widest sm:w-auto">
              <Link href="#pricing">Start Your Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-full border-white px-10 py-7 font-code text-base font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black sm:w-auto">
              <Link href="https://cal.com/myadlab/30min" target="_blank" rel="noopener noreferrer">Book a Meeting</Link>
            </Button>
          </div>
        </section>

        <section id="pricing" className="py-24 md:py-32 bg-black text-white relative border-t border-b border-neutral-800">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 font-code text-xs tracking-[0.3em] text-neutral-500">
            //PRICING
          </div>
          <div className="absolute top-8 right-8 font-code text-xs tracking-[0.3em] text-neutral-500 hidden md:block">
            BEST PLANS
          </div>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline text-center max-w-2xl mx-auto leading-tight">
              BIG OR SMALL? I HAVE A PLAN.
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
              {pricingPlans.slice(0, 5).map((plan) => (
                <Card key={plan.id} className={cn(
                    "bg-neutral-950 border p-8 h-full flex flex-col hover:border-neutral-700 transition-colors relative", 
                    plan.highlighted ? "border-primary" : "border-neutral-800"
                )}>
                    <div className="flex-grow">
                        <h3 className="text-2xl font-code uppercase tracking-widest flex items-center gap-2">
                            {plan.name}
                        </h3>
                        <p className="text-neutral-400 mt-4 text-sm leading-relaxed min-h-[4rem]">{plan.description}</p>
                        
                        <div className="mt-6">
                            <p className="text-5xl font-headline">{plan.price}<span className="text-base font-code text-neutral-500">{plan.priceSubtitle}</span></p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-800">
                            <h4 className="font-code text-sm uppercase tracking-widest text-neutral-400">What's included</h4>
                            <ul className="space-y-4 mt-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm">
                                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-neutral-200">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <Button 
                            asChild={!plan.comingSoon && plan.id !== 'enterprise'}
                            size="lg"
                            disabled={plan.comingSoon}
                            className={cn(
                                "w-full rounded-full font-code text-base font-semibold uppercase tracking-widest transition-colors py-7",
                                plan.highlighted ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white text-black hover:bg-neutral-200",
                                plan.comingSoon && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            {plan.id === 'enterprise' ? 
                                <a href="mailto:sales@myadlab.ai">{plan.cta}</a> : 
                                plan.comingSoon ? 
                                <span>{plan.cta}</span> :
                                <Link href={`/start-project?plan=${plan.id}`}>{plan.cta}</Link>
                            }
                        </Button>
                    </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <AddonsSection />

        <section id="work" className="py-16 md:py-24">
           <div className="container mx-auto px-4 md:px-6 relative">
             <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="font-headline text-6xl md:text-8xl tracking-tighter -skew-y-3">LATEST</h2>
                  <h2 className="font-headline text-6xl md:text-8xl tracking-tighter -skew-y-3 md:ml-20">PORTFOLIO</h2>
                </div>
                <p className="font-code uppercase text-sm tracking-[0.3em]">Check out</p>
             </div>
             <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-8">
                <div className="w-full aspect-video relative">
                  <Image src={portfolioItems[0].src} data-ai-hint={portfolioItems[0].hint} layout="fill" objectFit="cover" alt={portfolioItems[0].title} />
                  <div className="absolute bottom-4 left-4 font-code text-sm uppercase">
                    <p>{portfolioItems[0].title}</p>
                    <p className="text-muted-foreground text-xs">{portfolioItems[0].category}</p>
                  </div>
                </div>
                <div className="w-full aspect-square relative md:ml-24">
                  <Image src={portfolioItems[2].src} data-ai-hint={portfolioItems[2].hint} layout="fill" objectFit="cover" alt={portfolioItems[2].title} />
                   <div className="absolute bottom-4 left-4 font-code text-sm uppercase">
                    <p>{portfolioItems[2].title}</p>
                    <p className="text-muted-foreground text-xs">{portfolioItems[2].category}</p>
                  </div>
                </div>
              </div>
              <div className="md:mt-24">
                 <div className="w-full aspect-[3/4] relative">
                  <Image src={portfolioItems[1].src} data-ai-hint={portfolioItems[1].hint} layout="fill" objectFit="cover" alt={portfolioItems[1].title} />
                   <div className="absolute bottom-4 left-4 font-code text-sm uppercase">
                    <p>{portfolioItems[1].title}</p>
                    <p className="text-muted-foreground text-xs">{portfolioItems[1].category}</p>
                  </div>
                </div>
              </div>
             </div>
          </div>
        </section>

        <section className="py-16 md:py-24 h-[120vh] flex items-center justify-center">
            <div className="w-[40vh] h-[80vh] relative">
                <Image src="https://placehold.co/600x1200.png" data-ai-hint="man posing" layout="fill" objectFit="cover" alt="Fashion model" />
            </div>
        </section>

        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-4xl md:text-6xl tracking-tight">World's First Platform for Complete Studio quality AI-Ads</h2>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 text-center">
           <div className="container mx-auto px-4 md:px-6">
              <h3 className="font-headline text-5xl md:text-7xl">WHY?</h3>
              <p className="font-code uppercase text-sm tracking-[0.3em] mt-4 mb-12">Because we offer</p>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto text-lg text-left">
                  <p className="flex items-center gap-4"><span className="text-2xl">💬</span><span>1 Ad, multiple Languages — No Extra Shoot</span></p>
                  <p className="flex items-center gap-4"><span className="text-2xl">🎥</span><span>Cinematic complete Ads, Not Just Product Shots</span></p>
                  <p className="flex items-center gap-4"><span className="text-2xl">🧠</span><span>AI Voices That Feel More Real Than Real</span></p>
                  <p className="flex items-center gap-4"><span className="text-2xl">🎭</span><span>Choose Your AI Actor or Get a Surprise One</span></p>
                  <p className="flex items-center gap-4"><span className="text-2xl">📈</span><span>Analytics + A/B Variants for Smarter Ads</span></p>
                  <p className="flex items-center gap-4"><span className="text-2xl">⚡️</span><span>From Script to Delivery — In Just Days</span></p>
                  <p className="flex items-center gap-4"><span className="text-2xl">💼</span><span>Enterprise Plans with Strategy & Scale</span></p>
                  <p className="flex items-center gap-4"><span className="text-2xl">🌟</span><span>Real Celebrity Ads — Coming Soon</span></p>
              </div>
           </div>
           <div className="w-full h-[60vh] relative my-24">
             <Image src="https://placehold.co/1600x900.png" data-ai-hint="woman portrait red light" layout="fill" objectFit="cover" alt="Pro Services" />
           </div>
        </section>
        
        <section className="py-16 md:py-24 text-center">
           <div className="container mx-auto px-4 md:px-6">
             <h2 className="font-headline text-4xl md:text-6xl tracking-tight max-w-4xl mx-auto">WE CREATE ADS ACROSS ALL PLATFORMS!</h2>
             <p className="font-code uppercase text-sm tracking-[0.3em] mt-4 mb-16">ALL FORMATS INCLUDED</p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="aspect-[9/16] relative"><Image src="https://placehold.co/450x800.png" data-ai-hint="social media ad" alt="Platform ad 1" layout="fill" objectFit="cover" /></div>
               <div className="aspect-[9/16] relative mt-12"><Image src="https://placehold.co/450x800.png" data-ai-hint="phone screen ad" alt="Platform ad 2" layout="fill" objectFit="cover" /></div>
               <div className="aspect-[9/16] relative"><Image src="https://placehold.co/450x800.png" data-ai-hint="app interface ad" alt="Platform ad 3" layout="fill" objectFit="cover" /></div>
               <div className="aspect-[9/16] relative mt-12"><Image src="https://placehold.co/450x800.png" data-ai-hint="mobile game ad" alt="Platform ad 4" layout="fill" objectFit="cover" /></div>
             </div>
           </div>
        </section>
        
        <section id="contact" className="py-16 md:py-24 text-center">
          <div className="w-full h-[60vh] relative mb-24">
             <Image src="https://placehold.co/1600x900.png" data-ai-hint="abstract red texture" layout="fill" objectFit="cover" alt="CTA Background" />
          </div>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-6xl md:text-8xl -skew-y-3">LET'S WORK</h2>
            <h2 className="font-headline text-6xl md:text-8xl -skew-y-3">TOGETHER</h2>
            <Button size="lg" variant="outline" className="rounded-full border-white hover:bg-white hover:text-black transition-colors px-10 py-7 uppercase tracking-widest font-code mt-12">Create</Button>
            <div className="max-w-md mx-auto h-80 relative my-16">
              <Image src="https://placehold.co/600x800.png" data-ai-hint="man silhouette red" layout="fill" objectFit="cover" alt="Contact person" />
            </div>
            <div className="font-code text-sm md:text-base uppercase tracking-widest space-y-4">
              <p><a href="mailto:hello@myadlabs.com" className="hover:text-primary">hello@myadlabs.com</a></p>
              <p><a href="tel:+910000000000" className="hover:text-primary">+91 000 000 0000</a></p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
