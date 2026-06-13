import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Projects
  projects: router({
    list: protectedProcedure.query(({ ctx }) => {
      return db.getUserProjects(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .query(({ ctx, input }) => {
        return db.getProject(input.projectId, ctx.user.id);
      }),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          description: z.string().optional(),
          resolution: z.enum(["720p", "1080p", "4K"]).default("1080p"),
          format: z.enum(["mp4", "mov"]).default("mp4"),
          aspectRatio: z.enum(["16:9", "9:16", "1:1"]).default("16:9"),
        })
      )
      .mutation(({ ctx, input }) => {
        return db.createProject({
          userId: ctx.user.id,
          name: input.name,
          description: input.description,
          resolution: input.resolution,
          format: input.format,
          aspectRatio: input.aspectRatio,
          status: "draft",
        });
      }),

    update: protectedProcedure
      .input(
        z.object({
          projectId: z.number(),
          name: z.string().min(1).max(255).optional(),
          description: z.string().optional(),
          thumbnail: z.string().optional(),
          status: z.enum(["draft", "processing", "completed", "failed"]).optional(),
        })
      )
      .mutation(({ ctx, input }) => {
        return db.updateProject(input.projectId, ctx.user.id, {
          name: input.name,
          description: input.description,
          thumbnail: input.thumbnail,
          status: input.status,
        });
      }),

    delete: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .mutation(({ ctx, input }) => {
        return db.deleteProject(input.projectId, ctx.user.id);
      }),
  }),

  // Clips
  clips: router({
    list: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .query(({ input }) => {
        return db.getProjectClips(input.projectId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          projectId: z.number(),
          type: z.enum(["image", "video", "text", "ai-generated"]),
          sourceUrl: z.string().optional(),
          startTime: z.number().default(0),
          endTime: z.number(),
          duration: z.number(),
          order: z.number(),
        })
      )
      .mutation(({ input }) => {
        return db.createClip(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          clipId: z.number(),
          startTime: z.number().optional(),
          endTime: z.number().optional(),
          duration: z.number().optional(),
          order: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        return db.updateClip(input.clipId, input);
      }),

    delete: protectedProcedure
      .input(z.object({ clipId: z.number() }))
      .mutation(({ input }) => {
        return db.deleteClip(input.clipId);
      }),
  }),

  // Audio Tracks
  audioTracks: router({
    list: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .query(({ input }) => {
        return db.getProjectAudioTracks(input.projectId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          projectId: z.number(),
          type: z.enum(["background-music", "voice-over", "sound-effect"]),
          sourceUrl: z.string(),
          startTime: z.number().default(0),
          duration: z.number(),
          volume: z.number().default(100),
          order: z.number(),
        })
      )
      .mutation(({ input }) => {
        return db.createAudioTrack(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          trackId: z.number(),
          volume: z.number().optional(),
          startTime: z.number().optional(),
          duration: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        return db.updateAudioTrack(input.trackId, input);
      }),

    delete: protectedProcedure
      .input(z.object({ trackId: z.number() }))
      .mutation(({ input }) => {
        return db.deleteAudioTrack(input.trackId);
      }),
  }),

  // Exports
  exports: router({
    list: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .query(({ input }) => {
        return db.getProjectExports(input.projectId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          projectId: z.number(),
          format: z.enum(["mp4", "mov"]),
          resolution: z.enum(["720p", "1080p", "4K"]),
          quality: z.enum(["low", "medium", "high"]).default("high"),
        })
      )
      .mutation(({ input }) => {
        return db.createExport({
          projectId: input.projectId,
          format: input.format,
          resolution: input.resolution,
          quality: input.quality,
          status: "pending",
        });
      }),

    update: protectedProcedure
      .input(
        z.object({
          exportId: z.number(),
          status: z.enum(["pending", "processing", "completed", "failed"]).optional(),
          fileUrl: z.string().optional(),
          fileSize: z.number().optional(),
          error: z.string().optional(),
        })
      )
      .mutation(({ input }) => {
        return db.updateExport(input.exportId, input);
      }),
  }),

  // AI Jobs
  aiJobs: router({
    list: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .query(({ input }) => {
        return db.getProjectAIJobs(input.projectId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          projectId: z.number(),
          type: z.enum(["text-to-video", "auto-captions", "narration", "background-removal"]),
          input: z.string(),
        })
      )
      .mutation(({ input }) => {
        return db.createAIJob({
          projectId: input.projectId,
          type: input.type,
          input: input.input,
          status: "pending",
        });
      }),

    update: protectedProcedure
      .input(
        z.object({
          jobId: z.number(),
          status: z.enum(["pending", "processing", "completed", "failed"]).optional(),
          output: z.string().optional(),
          error: z.string().optional(),
        })
      )
      .mutation(({ input }) => {
        return db.updateAIJob(input.jobId, input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
