import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  createMessage: protectedProcedure
    .input(z.object({ text: z.string().min(1), isUserMessage: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.message.create({
        data: {
          text: input.text,
          createdBy: { connect: { id: ctx.session.user.id } },
          isUserMessage: input.isUserMessage,
        },
      });
    }),

  getMessages: protectedProcedure.query(({ ctx }) => {
    return ctx.db.message.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      take: 6,
    });
  }),
});
