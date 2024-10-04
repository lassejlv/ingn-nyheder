'use client';

export default function CardSkeleton() {
  return (
    <div className='p-3 shadow-xl rounded-md border-2 border-gray-200 mt-4 px-3 animate-pulse'>
      <div className='bg-gray-300 h-5 w-1/2 mb-2 rounded-md animate-pulse'></div>
      <div className='bg-gray-300 h-5 w-3/4 mb-2 rounded-md animate-pulse'></div>
      <div className='bg-gray-300 h-5 w-1/2 mb-2 rounded-md animate-pulse'></div>
      <div className='bg-gray-300 h-5 w-1/3 mb-2 rounded-md animate-pulse'></div>
      <div className='bg-gray-300 h-5 w-1/4 mb-2 rounded-md animate-pulse'></div>
    </div>
  );
}
