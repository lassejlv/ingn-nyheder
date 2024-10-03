'use client';
import { Hammer, Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { trpc } from '@/server/client';

const categories = ['Alle', 'Indland', 'Udland', 'Teknologi', 'Sport', 'Politik', 'Samfund'];

export default function Navbar() {
   const [isOpen, setIsOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
   const isAdminAuthenticated = trpc.admin.isAuthorized.useQuery();

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   useEffect(() => {
      if (isOpen && window.innerWidth > 768) {
         setIsOpen(false);
      }
   }, [isOpen]);

   return (
      <nav
         className={`flex items-center justify-between p-3 shadow-xl sticky top-0 transition-colors duration-300 ${
            isScrolled && !isOpen ? 'bg-transparent backdrop-blur-lg' : 'bg-white'
         }`}
      >
         <Link href='/' className='text-custom-red uppercase text-2xl font-bold'>
            ingn
         </Link>

         <ul className='gap-3 hidden md:flex'>
            <li className='text-lg'>| </li>
            {categories.map((c) => (
               <li key={c} className='text-lg'>
                  <Link href={`/news?tag=${c.toLowerCase()}`}>{c} |</Link>
               </li>
            ))}
         </ul>

         <div className='flex gap-3'>
            <Link href='/login' className='text-custom-red'>
               <User size={30} />
            </Link>
            {isAdminAuthenticated.data && (
               <Link href='/admin' className='text-custom-red'>
                  <Hammer size={30} />
               </Link>
            )}
            <button className='text-custom-red md:hidden' onClick={() => setIsOpen(!isOpen)}>
               <Menu size={30} />
            </button>
         </div>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-0 left-0 w-full h-full bg-white ${isOpen ? 'block' : 'hidden'}`}
         >
            <button
               className='absolute top-4 right-4 text-custom-red '
               onClick={() => {
                  setIsScrolled(window.scrollY > 0);
                  setIsOpen(false);
               }}
            >
               <X size={30} />
            </button>
            <ul className='flex flex-col items-center justify-center gap-3 mt-3'>
               {categories.map((c) => (
                  <li key={c} className='text-lg hover:underline'>
                     <Link href={`/news?tag=${c.toLowerCase()}`}>{c}</Link>
                  </li>
               ))}
            </ul>
         </motion.div>
      </nav>
   );
}
