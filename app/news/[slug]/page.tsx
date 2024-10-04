'use client';

import { trpc } from '@/server/client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { isLoading, error, data } = trpc.news.getNewsBySlug.useQuery({ slug });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <>
      <h1 className='text-3xl font-bold text-center mt-5'>{data.fields.title}</h1>
      <div className='text-center text-sm text-custom-red'>
        Udgivet den{' '}
        {new Date(data.sys.createdAt).toLocaleDateString('da-DK', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </div>
      <div className='container mx-auto py-5 px-3'>
        <div className='prose my-4'>{documentToReactComponents(data.fields.body)}</div>
      </div>
    </>
  );
}
