import { isAuthorizedAsAdmin } from '@/app/actions/auth';
import { contentful } from '@/lib/contentful';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
   title: z.string().max(50).min(5),
   description: z.string().max(150).min(5),
});

export default async function page({ params, searchParams }: { params: { id: string }; searchParams: { error: string } }) {
   const isAdmin = await isAuthorizedAsAdmin();
   if (!isAdmin.success) return notFound();

   const news = await contentful.getEntry(params.id);
   if (!news) return notFound();

   console.log(news);

   const update = async (formData: FormData) => {
      'use server';

      const title = formData.get('title') as string;
      const description = formData.get('description') as string;

      const parsedData = schema.safeParse({ title, description });
      if (!parsedData.success) return redirect(`/admin/news/${params.id}?error=${parsedData.error.errors[0].message}`);
   };

   return (
      <main className='container mx-auto'>
         <form className='flex flex-col gap-3' action={update}>
            <div className='flex flex-col gap-3'>
               <label className='text-lg'>Title</label>
               <input type='text' name='title' defaultValue={news.fields.title as string} />
            </div>

            <div className='flex flex-col gap-3'>
               <label className='text-lg'>Description</label>
               <textarea name='description' defaultValue={news.fields.description as string} />
            </div>

            {searchParams.error && <span className='text-custom-red'>{searchParams.error}</span>}

            <button type='submit' className='text-custom-red'>
               Update
            </button>
         </form>
      </main>
   );
}
