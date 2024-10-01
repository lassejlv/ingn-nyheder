import type { Metadata } from 'next';
import { TRPCProvider } from './provider';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
   title: 'Ingn Nyheder',
   description: 'Ingen nyheder at vise',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang='en'>
         <body className={`${poppins.className} `}>
            <TRPCProvider>
               <Navbar />
               {children}
            </TRPCProvider>
         </body>
      </html>
   );
}
