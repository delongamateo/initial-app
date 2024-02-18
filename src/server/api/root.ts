import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { messageRouter } from "./routers/message";
import { linkRouter } from "./routers/link";
import { creatorRouter } from "./routers/creator";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  message: messageRouter,
  link: linkRouter,
  creator: creatorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
