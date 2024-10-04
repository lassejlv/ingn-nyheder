'use client';

import { Trash, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NewsCardActions({ newsId }: { newsId: string }) {
   const router = useRouter();

   return (
      <div className='flex items-center gap-3'>
         <button className='text-custom-red' onClick={() => router.push(`/admin/news/${newsId}`)}>
            <Edit size={24} />
         </button>

         <button className='text-custom-red'>
            <Trash size={24} />
         </button>
      </div>
   );
}
