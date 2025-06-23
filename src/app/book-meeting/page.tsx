import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function BookMeetingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
       <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">Book a Meeting</CardTitle>
          <CardDescription className="text-lg">
            Schedule a call with our team to discuss your project in detail.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-4">Cal.com embed placeholder</p>
              <Button size="lg">Schedule Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
