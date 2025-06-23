import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-12 md:py-20 relative z-10">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex flex-col items-center gap-8">
          <Image src="/lastlogo.png" alt="MYADLABS Logo" width={600} height={600} className="object-contain" />
          <div className="flex gap-6 font-code text-sm uppercase tracking-widest">
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-primary transition-colors">Linkedin</Link>
          </div>
          <p className="font-code text-xs text-muted-foreground uppercase tracking-widest">© 2024 MYADLABS. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
