import { addOns } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AddonsSection() {
  return (
    <section id="addons" className="py-24 md:py-32 bg-black text-white relative border-t border-neutral-800">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-code text-xs tracking-[0.3em] text-neutral-500">
        //ADD-ONS
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline text-center max-w-3xl mx-auto leading-tight">
          SUPERCHARGE YOUR PROJECT
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {addOns.map((addon) => (
            <Card key={addon.id} className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between">
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-code uppercase tracking-widest">{addon.name}</CardTitle>
                <CardDescription className="pt-2 !mt-0 text-sm text-neutral-400">{addon.description}</CardDescription>
              </CardHeader>
              <p className="text-2xl font-headline text-white pt-4 mt-auto">₹{addon.price.toLocaleString("en-IN")}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
