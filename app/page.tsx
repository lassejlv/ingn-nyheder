'use client';

import { trpc } from '@/server/client';
import Image from 'next/image';
import Link from 'next/link';

function CardSkeleton() {
   return (
      // lav en skeleton til nyhederne, ingen text osv, kun en boks med en højde og bredde
      <div className='p-3 shadow-xl rounded-md border-2 border-gray-200 mt-4 px-3 animate-pulse'>
         <div className='bg-gray-300 h-5 w-1/2 mb-2 rounded-md animate-pulse'></div>
         <div className='bg-gray-300 h-5 w-3/4 mb-2 rounded-md animate-pulse'></div>
         <div className='bg-gray-300 h-5 w-1/2 mb-2 rounded-md animate-pulse'></div>
         <div className='bg-gray-300 h-5 w-1/3 mb-2 rounded-md animate-pulse'></div>
         <div className='bg-gray-300 h-5 w-1/4 mb-2 rounded-md animate-pulse'></div>
      </div>
   );
}

export default function Home() {
   const news = trpc.news.getNews.useQuery();

   if (news.isLoading)
      return (
         <main className='container mx-auto py-5 px-3'>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
         </main>
      );

   if (news.error) {
      return <div>Error: {news.error.message}</div>;
   }

   if (!news.data) return <div>No data...</div>;

   console.log(news.data[0].fields.images[0].fields.file.url);

   return (
      <>
         {news.isLoading ? (
            <></>
         ) : (
            <main className='container mx-auto py-5 px-3'>
               <div className='p-3 shadow-xl rounded-md border-2 border-gray-200 mt-4 px-3'>
                  <span style={{ animationDuration: '1.5s' }} className='bg-yellow-500 text-blue p-1 text-sm my-2 rounded-md animate-pulse'>
                     Senete nyt
                  </span>
                  <h1 className='text-2xl font-bold mb-2'>{news.data[0].fields.title}</h1>
                  <p className='text-sm'>{news.data[0].fields.description}</p>
                  <p className='text-sm mt-2 text-custom-red'>
                     Udgivet den{' '}
                     {new Date(news.data[0].sys.createdAt).toLocaleDateString('da-DK', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                     })}
                  </p>

                  <div className='flex mt-3 items-center'>
                     <Link href={`/news/${news.data[0].fields.slug}`}>Læs mere</Link>

                     {news.data[0].fields.tags.split(',').map((tag: string) => (
                        <Link href={`/news?tag=${tag}`} key={tag} className='bg-gray-200 text-gray-700 text-xs px-1 py-0.5 rounded-md ml-2'>
                           {tag}
                        </Link>
                     ))}
                  </div>

                  <Image
                     src={`https:${news.data[0].fields.images[0].fields.file.url}`}
                     alt={news.data[0].fields.images[0].fields.title}
                     width={0}
                     height={0}
                     sizes='100vw'
                     className='bg-cover object-cover bg-no-repeat rounded-md mt-3 '
                     style={{ width: '100%', height: 'auto' }}
                  />
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {news.data.slice(1).map((n: any) => (
                     <div key={n.sys.id} className='p-3 shadow-xl rounded-md border-2 border-gray-200 mt-4 px-3'>
                        <h1 className='text-2xl font-bold mb-2'>{n.fields.title}</h1>
                        <p className='text-sm'>{n.fields.description}</p>
                        <p className='text-sm mt-2 text-custom-red'>
                           Udgivet den{' '}
                           {new Date(n.sys.createdAt).toLocaleDateString('da-DK', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                           })}
                        </p>

                        <div className='flex mt-3 items-center'>
                           <Link href={`/news/${n.fields.slug}`}>Læs mere</Link>

                           {n.fields.tags.split(',').map((tag: string) => (
                              <Link href={`/news?tag=${tag}`} key={tag} className='bg-gray-200 text-gray-700 text-xs px-1 py-0.5 rounded-md ml-2'>
                                 {tag}
                              </Link>
                           ))}
                        </div>

                        <Image
                           src={`https:${n.fields.images[0].fields.file.url}`}
                           alt={n.fields.images[0].fields.title}
                           width={0}
                           height={0}
                           sizes='100vw'
                           className='bg-cover object-cover bg-no-repeat rounded-md mt-3 '
                           style={{ width: '100%', height: 'auto' }}
                        />
                     </div>
                  ))}
               </div>
            </main>
         )}
      </>
   );
}
