import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYADLABS",
  description: "Professional ads for less. Faster, sharper & 70% cheaper.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
