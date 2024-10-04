import { z } from 'zod';
import { procedure, router } from '../trpc';
import { contentful } from '@/lib/contentful';
import { TRPCError } from '@trpc/server';
import { env } from '@/lib/env';

export const newsRouter = router({
   getNews: procedure.query(async () => {
      const posts = await contentful.getEntries<any>({
         content_type: 'news',
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      return posts.items as any;
   }),

   getNewsBySlug: procedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      const posts = await contentful.getEntries<any>({
         content_type: 'news',
         'fields.slug': input.slug,
      });

      return posts.items[0] as any;
   }),

   getNewsByTag: procedure.input(z.object({ tag: z.string() })).query(async ({ input }) => {
      const posts = await contentful.getEntries<any>({
         content_type: 'news',
         // Where fields.tags contains input.tag
         'fields.tags.sys.id': input.tag,
      });

      return posts.items;
   }),

   deleteNewsById: procedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
      return true;
   }),
});
