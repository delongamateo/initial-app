import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const CreatorSchema = z.object({
  ocuppation: z.string(),
  username: z.string(),
  instagram: z.string(),
  twitter: z.string(),
  website: z.string(),
  about: z.string(),
  categories: z.array(z.string()),
});

export const creatorRouter = createTRPCRouter({
  createCreator: protectedProcedure
    .input(CreatorSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { role: "CREATOR" },
      });
      return ctx.db.creator.create({
        data: {
          user: { connect: { id: ctx.session.user.id } },
          ...input,
        },
      });
    }),
  getCreator: protectedProcedure
    .input(
      z.object({ username: z.string().optional(), id: z.string().optional() }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.creator.findFirst({
        where: { OR: [{ username: input.username }, { id: input.id }] },
      });
    }),
  getCreators: protectedProcedure.query(({ ctx, input }) => {
    return ctx.db.creator.findMany({});
  }),
});
