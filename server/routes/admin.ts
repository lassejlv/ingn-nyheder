import { procedure, router } from '../trpc';
import { isAuthorizedAsAdmin } from '@/app/actions/auth';

export const adminRouter = router({
   isAuthorized: procedure.query(async () => {
      const isItTrue = await isAuthorizedAsAdmin();

      return isItTrue.success;
   }),
});
