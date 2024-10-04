'use server';

import { redis } from '@/lib/redis';
import { Action } from '@/types/Action';
import { cookies } from 'next/headers';

export const isAuthorizedAsAdmin = async (): Promise<Action<null>> => {
   const token = cookies().get('admin:session');
   if (!token) return { success: false, message: 'Unauthorized' };

   const validToken = await redis.get(`admin:session:${token.value}`);
   if (!validToken) return { success: false, message: 'Unauthorized' };

   return { success: true };
};
