import { redirect } from 'next/navigation';
import { z } from 'zod';
import { redis } from '@/lib/redis';
import { cookies } from 'next/headers';

const generateRandomAuthToken = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const schema = z.object({
   username: z.string().min(3).max(32),
   password: z.string().min(8).max(32),
});

export default async function page({ searchParams }: { searchParams: { error: string } }) {
   const Login = async (formData: FormData) => {
      'use server';

      const username = formData.get('username');
      const password = formData.get('password');

      const parsedData = schema.safeParse({ username, password });
      if (!parsedData.success) return redirect(`/admin/login?error=${parsedData.error.errors[0].message}`);

      const validUsername = process.env.ADMIN_USERNAME === username;
      const validPass = process.env.ADMIN_PASSWORD === password;

      if (!validUsername || !validPass) return redirect('/admin/login?error=Invalid username or password');

      const newToken = generateRandomAuthToken();
      await redis.set(`admin:session:${newToken}`, newToken, 'EX', 60 * 60 * 24);

      cookies().set('admin:session', newToken, { httpOnly: true, path: '/', sameSite: 'lax' });

      return redirect('/admin?success=You have successfully logged in');
   };

   return (
      <form className='flex flex-col items-center justify-center gap-4' action={Login}>
         <div className='flex flex-col gap-2'>
            <label htmlFor='username'>Username</label>
            <input id='username' name='username' type='text' />
         </div>

         <div className='flex flex-col gap-2'>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' />
         </div>

         {searchParams.error && <p className='text-red-500'>{searchParams.error}</p>}

         <button className='bg-custom-red text-white rounded-md px-4 py-2'>Login</button>
      </form>
   );
}
