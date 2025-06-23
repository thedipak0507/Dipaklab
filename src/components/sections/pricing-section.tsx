import Link from "next/link";
import { pricingPlans, type Plan } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <Card className={cn(
      "flex flex-col border-2",
      plan.highlighted ? "border-primary shadow-2xl shadow-primary/20" : "border-border"
    )}>
      <CardHeader className="p-6">
        <div className="flex items-center gap-3">
          <plan.icon className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
        </div>
        <CardDescription className="pt-2 text-4xl font-bold text-foreground">
          {plan.price}
          {plan.priceSubtitle && <span className="text-base font-normal text-muted-foreground ml-1">{plan.priceSubtitle}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6">
        <Button 
          asChild 
          className={cn(
            "w-full text-lg py-6", 
            plan.highlighted ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80",
            plan.comingSoon && "opacity-50 cursor-not-allowed"
          )}
          disabled={plan.comingSoon}
        >
          {plan.id === "enterprise" ? <a href="mailto:sales@myadlab.ai">{plan.cta}</a> : <Link href={plan.comingSoon ? "#" : `/start-project?plan=${plan.id}`}>{plan.cta}</Link>}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            Plans that Scale with You
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan to create stunning ads and grow your brand.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingPlans.slice(0, 4).map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <PricingCard plan={pricingPlans[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
