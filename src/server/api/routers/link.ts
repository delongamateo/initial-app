import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const LinkSchema = z.object({
  url: z.string().url(),
  creatorId: z.string(),
  userId: z.string(),
});

export const linkRouter = createTRPCRouter({
  createLink: protectedProcedure
    .input(LinkSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.create({
        data: input,
      });
    }),

  getLinks: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    if (user.role === "CREATOR") {
      const creator = await ctx.db.creator.findFirst({
        where: { userId: user.id },
      });

      return ctx.db.link.findMany({
        where: { creatorId: creator?.id },
      });
    } else {
      return ctx.db.link.findMany({
        where: { userId: user.id },
      });
    }
  }),
  getLink: protectedProcedure
    .input(
      z.object({
        creatorId: z.string().optional(),
        linkId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.creatorId) {
        return ctx.db.link.findFirst({
          where: { creatorId: input.creatorId },
        });
      } else {
        return ctx.db.link.findFirst({
          where: { id: input.linkId },
        });
      }
    }),
  updateCount: protectedProcedure
    .input(z.object({ linkId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.link.update({
        where: { id: input.linkId },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    }),
});
