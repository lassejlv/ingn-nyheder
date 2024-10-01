'use client';

import React from 'react';

export default function NotFound() {
   return (
      <div className='flex items-center justify-center h-screen gap-5'>
         <h1 className='text-4xl italic font-bold'>404</h1>
         <p className='text-xl'>Siden blev ikke fundet, prøv en anden side.</p>
      </div>
   );
}
