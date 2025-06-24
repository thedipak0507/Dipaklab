"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { pricingPlans, addOns, type Plan, type AddOn } from "@/lib/constants";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ArrowRight, Check, Upload, Video, Image as ImageIcon, Languages as LanguagesIcon, Palette, Users, HandCoins, ShoppingCart } from "lucide-react";

const formSchema = z.object({
  adType: z.enum(["video", "static"]).default("video"),
  duration: z.number().min(15).max(90),
  format: z.enum(["16:9", "9:16", "1:1"]),
  primaryLanguage: z.string().min(1, "Please select a primary language."),
  extraLanguages: z.array(z.string()).optional(),
  tone: z.string().min(1, "Please select a tone."),
  targetAudience: z.string().min(3, "Please describe your target audience."),
  brandName: z.string().min(2, "Brand name is required."),
  brandWebsite: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  industry: z.string().min(2, "Industry is required."),
  productName: z.string().min(2, "Product name is required."),
  productDescription: z.string().min(10, "Please describe your product."),
  productUsp: z.string().optional(),
  productTagline: z.string().optional(),
  logo: z.any().optional(),
  productImages: z.any().optional(),
  videoAssets: z.any().optional(),
  pastAds: z.any().optional(),
  selectedAddOns: z.record(z.boolean()).default({}),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: "ad-scope", name: "Ad Scope", icon: Palette, fields: ["adType", "duration", "format", "primaryLanguage", "extraLanguages", "tone", "targetAudience"] },
  { id: "brand-details", name: "Brand Details", icon: Users, fields: ["brandName", "brandWebsite", "industry", "productName", "productDescription", "productUsp", "productTagline", "logo", "productImages", "videoAssets", "pastAds"] },
  { id: "review-checkout", name: "Review & Checkout", icon: HandCoins, fields: ["selectedAddOns"] },
];

function ProjectForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  
  const selectedPlan = useMemo(() => {
    const plan = pricingPlans.find(p => p.id === planId);
    return plan || pricingPlans[0];
  }, [planId]);

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: 15,
      adType: 'video',
      selectedAddOns: {},
      brandWebsite: '',
    },
  });

  const durationValue = form.watch("duration");
  const selectedAddOns = form.watch("selectedAddOns");

  const totalCost = useMemo(() => {
    let cost = parseFloat(selectedPlan.price.replace(/[^0-9.-]+/g,""));
    addOns.forEach(addon => {
      if (selectedAddOns[addon.id]) {
        cost += addon.price;
      }
    });
    return cost;
  }, [selectedPlan, selectedAddOns]);

  const next = async () => {
    const fields = steps[currentStep].fields as (keyof FormData)[];
    const output = await form.trigger(fields, { shouldFocus: true });
    
    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    } else {
      // Handle final submission
      console.log(form.getValues());
      router.push('/confirmation');
    }
  };
  
  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <div className="flex justify-center items-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  currentStep === index ? "bg-primary border-primary" : currentStep > index ? "bg-green-500 border-green-500" : "bg-secondary border-border"
                )}>
                  {currentStep > index ? <Check className="w-6 h-6 text-white"/> : <step.icon className={cn("w-6 h-6", currentStep === index ? "text-primary-foreground" : "text-muted-foreground")} />}
                </div>
                <p className={cn("text-sm mt-2", currentStep >= index ? 'text-foreground' : 'text-muted-foreground')}>{step.name}</p>
              </div>
              {index < steps.length - 1 && <div className={cn("flex-auto border-t-2 transition-colors mx-4", currentStep > index ? 'border-green-500' : 'border-border')} />}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => next())} className="space-y-8">
            <Card>
              <CardContent className="p-8">
                {currentStep === 0 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="adType" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Ad Type</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                            <Label htmlFor="video" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary p-4 font-normal w-full cursor-pointer">
                              <Video className="mb-3 h-6 w-6" /> Video Ad
                              <RadioGroupItem value="video" id="video" className="sr-only"/>
                            </Label>
                            <Label htmlFor="static" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary p-4 font-normal w-full cursor-pointer">
                              <ImageIcon className="mb-3 h-6 w-6" /> Static Ad
                              <RadioGroupItem value="static" id="static" className="sr-only"/>
                            </Label>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="duration" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration ({durationValue}s)</FormLabel>
                        <FormControl>
                          <Slider 
                            min={15} 
                            max={selectedPlan.maxDuration} 
                            step={5} 
                            value={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="format" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Format</FormLabel>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                            <Label htmlFor="16:9" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary p-3 font-normal cursor-pointer">
                              <div className="w-12 h-7 bg-muted-foreground/20 rounded-sm mb-2"></div>16:9
                              <RadioGroupItem value="16:9" id="16:9" className="sr-only"/>
                            </Label>
                             <Label htmlFor="9:16" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary p-3 font-normal cursor-pointer">
                              <div className="w-7 h-12 bg-muted-foreground/20 rounded-sm mb-2"></div>9:16
                              <RadioGroupItem value="9:16" id="9:16" className="sr-only"/>
                            </Label>
                             <Label htmlFor="1:1" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary p-3 font-normal cursor-pointer">
                              <div className="w-10 h-10 bg-muted-foreground/20 rounded-sm mb-2"></div>1:1
                              <RadioGroupItem value="1:1" id="1:1" className="sr-only"/>
                            </Label>
                          </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="primaryLanguage" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a language" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="kannada">Kannada</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="tone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a tone" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="emotional">Emotional</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                            <SelectItem value="trustworthy">Trustworthy</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="targetAudience" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl><Textarea placeholder="e.g., Young professionals aged 25-35 interested in tech gadgets." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                  </div>
                )}
                
                {currentStep === 1 && (
                  <div className="grid md:grid-cols-2 gap-8">
                     <FormField control={form.control} name="brandName" render={({ field }) => (
                      <FormItem><FormLabel>Brand Name</FormLabel><FormControl><Input placeholder="Your Brand Inc." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="brandWebsite" render={({ field }) => (
                      <FormItem><FormLabel>Brand Website</FormLabel><FormControl><Input placeholder="https://yourbrand.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="industry" render={({ field }) => (
                      <FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., E-commerce, SaaS, Fashion" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="productName" render={({ field }) => (
                      <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input placeholder="Product X" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="productDescription" render={({ field }) => (
                      <FormItem className="md:col-span-2"><FormLabel>Product Description</FormLabel><FormControl><Textarea placeholder="Describe your product in detail..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="productUsp" render={({ field }) => (
                      <FormItem><FormLabel>USP (Optional)</FormLabel><FormControl><Input placeholder="What makes your product unique?" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="productTagline" render={({ field }) => (
                      <FormItem><FormLabel>Tagline (Optional)</FormLabel><FormControl><Input placeholder="Your catchy tagline" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="logo" render={({ field }) => (
                      <FormItem className="md:col-span-2"><FormLabel>Upload Assets</FormLabel>
                      <FormControl>
                        <div className="relative border-dashed border-2 rounded-lg p-6 text-center hover:border-primary transition-colors">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">Drop files here or click to upload</p>
                          <p className="text-xs text-muted-foreground">Logo, Product Images, Videos, Past Ads</p>
                          <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple {...field} />
                        </div>
                      </FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-headline mb-4">Review Your Order</h3>
                      <Card className="bg-secondary/50">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>{selectedPlan.name}</CardTitle>
                            <Button variant="link" size="sm" onClick={() => setCurrentStep(0)}>Change Plan</Button>
                          </div>
                          <CardDescription className="text-3xl font-bold text-foreground !mt-2">{selectedPlan.price}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedPlan.features.filter(f => f.included).map(f => <li key={f.name} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-500" />{f.name}</li>)}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-2xl font-headline mb-4">Optional Add-Ons</h3>
                      <div className="space-y-4">
                        {addOns.map((addon) => (
                           <FormField key={addon.id} control={form.control} name={`selectedAddOns.${addon.id}`} render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                               <div className="space-y-0.5">
                                 <FormLabel className="text-base">{addon.name}</FormLabel>
                                 <p className="text-sm text-muted-foreground">${addon.price.toLocaleString('en-US')}</p>
                               </div>
                               <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                             </FormItem>
                          )} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Card className="bg-primary/10 border-primary border-dashed">
                        <CardContent className="p-6 flex justify-between items-center">
                          <p className="text-2xl font-bold">Total</p>
                          <p className="text-3xl font-bold">${totalCost.toLocaleString('en-US')}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <div>
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={prev}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
              </div>
              <Button type="submit">
                {currentStep === steps.length - 1 ? (
                  <>Proceed to Checkout <ShoppingCart className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Next Step <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}

// Dynamically import ProjectForm with SSR disabled to prevent searchParams invariant error
const DynamicProjectForm = dynamic(() => Promise.resolve(ProjectForm), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function StartProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DynamicProjectForm />
    </Suspense>
  )
}