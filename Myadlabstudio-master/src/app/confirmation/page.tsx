import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, LayoutDashboard } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8 transform translate-x-4">
        <Image src="/lastlogo.png" alt="MYADLABS Logo" width={300} height={80} className="object-contain" />
      </Link>
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-green-500/10 p-4 rounded-full w-fit">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Project Confirmed!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Thanks! Your ad project is confirmed. We'll be in touch shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" asChild>
            <Link href="#">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Go to My Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
