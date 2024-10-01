import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
   server: {
      CONTENTFUL_SPACE_ID: z.string(),
      CONTENTFUL_ACCESS_TOKEN: z.string(),
   },
   runtimeEnv: process.env,
});
