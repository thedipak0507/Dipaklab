import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 top-0 -z-10 h-full w-full bg-background"
      >
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(180,4,38,0.2)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-foreground">
            MyAdLab delivers professional AI-powered ads — faster, sharper, and
            <span className="text-primary"> 70% cheaper</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            World's First platform to create studio quality complete Ads.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold" asChild>
            <Link href="/#pricing">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold" asChild>
            <Link href="/book-meeting">
              <PlayCircle className="mr-2 h-5 w-5" />
              Book a Meeting
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
