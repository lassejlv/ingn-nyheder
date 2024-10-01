import { initTRPC } from '@trpc/server';

interface Context {
   request: Request;
}

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const procedure = trpc.procedure;
