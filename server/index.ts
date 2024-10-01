import { newsRouter } from './routes/news';
import { router } from './trpc';

export const appRouter = router({
   news: newsRouter,
});

export type AppRouter = typeof appRouter;
