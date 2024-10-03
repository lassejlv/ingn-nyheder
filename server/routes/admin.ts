import { cookies } from 'next/headers';
import { procedure, router } from '../trpc';
import { redis } from '@/lib/redis';

export const adminRouter = router({
   isAuthorized: procedure.query(async ({}) => {
      const token = cookies().get('admin:session');
      if (!token) return false;

      const validToken = await redis.get(`admin:session:${token.value}`);
      if (!validToken) return false;

      return true;
   }),
});
