'use client';

import { trpc } from '@/server/client';
import { useRouter } from 'next/navigation';

export default function Page() {
   const router = useRouter();

   const isAuthorized = trpc.admin.isAuthorized.useQuery();
   const newsArticles = trpc.news.getNews.useQuery();

   if (isAuthorized.isLoading) return <h1>Loading...</h1>;
   if (isAuthorized.error || newsArticles.error) return <h1>Error!</h1>;
   if (!isAuthorized.data) return router.push('/admin/login');

   return (
      <>
         <h1 className='text-3xl font-bold'>Admin</h1>
         <p>
            Manage all news articles here. Delete / Update / Create new articles.
            <table className='table table-auto'>
               <thead className='bg-gray-200'>
                  <tr>ID</tr>
                  <tr>Title</tr>
                  <tr>Description</tr>
                  <tr>Created At</tr>
                  <tr>Actions</tr>
               </thead>
            </table>
         </p>
      </>
   );
}
