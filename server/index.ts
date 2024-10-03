import { adminRouter } from './routes/admin';
import { newsRouter } from './routes/news';
import { router } from './trpc';

export const appRouter = router({
   news: newsRouter,
   admin: adminRouter,
});

export type AppRouter = typeof appRouter;
