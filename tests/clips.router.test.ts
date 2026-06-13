import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "../server/routers";
import type { TrpcContext } from "../server/_core/context";
import type { User } from "../drizzle/schema";

const mockClips = [
  { id: 1, projectId: 1, type: "video", sourceUrl: "https://example.com/clip1.mp4", startTime: 0, endTime: 5000, duration: 5000, order: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, projectId: 1, type: "image", sourceUrl: "https://example.com/clip2.png", startTime: 5000, endTime: 8000, duration: 3000, order: 1, createdAt: new Date(), updatedAt: new Date() },
];

vi.mock("../server/db", () => ({
  getProjectClips: vi.fn((projectId: number) =>
    Promise.resolve(mockClips.filter((c) => c.projectId === projectId))
  ),
  createClip: vi.fn((data: any) => Promise.resolve(3)),
  updateClip: vi.fn(() => Promise.resolve()),
  deleteClip: vi.fn(() => Promise.resolve()),
  getProjectAudioTracks: vi.fn(() => Promise.resolve([])),
  getProjectExports: vi.fn(() => Promise.resolve([])),
  getProjectAIJobs: vi.fn(() => Promise.resolve([])),
  getClipEffects: vi.fn(() => Promise.resolve([])),
  getUserProjects: vi.fn(() => Promise.resolve([])),
  getProject: vi.fn(() => Promise.resolve(null)),
  createProject: vi.fn(() => Promise.resolve(0)),
  updateProject: vi.fn(() => Promise.resolve()),
  deleteProject: vi.fn(() => Promise.resolve()),
  createEffect: vi.fn(() => Promise.resolve(0)),
  updateEffect: vi.fn(() => Promise.resolve()),
  deleteEffect: vi.fn(() => Promise.resolve()),
  createAudioTrack: vi.fn(() => Promise.resolve(0)),
  updateAudioTrack: vi.fn(() => Promise.resolve()),
  deleteAudioTrack: vi.fn(() => Promise.resolve()),
  createExport: vi.fn(() => Promise.resolve(0)),
  updateExport: vi.fn(() => Promise.resolve()),
  createAIJob: vi.fn(() => Promise.resolve(0)),
  updateAIJob: vi.fn(() => Promise.resolve()),
}));

function createMockCtx(): TrpcContext {
  const user: User = {
    id: 1, openId: "test-user", name: "Test", email: "test@test.com",
    loginMethod: "email", role: "user",
    createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", hostname: "localhost", headers: { host: "localhost" } } as TrpcContext["req"],
    res: { clearCookie: vi.fn(), cookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("clips router", () => {
  let ctx: TrpcContext;
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    vi.clearAllMocks();
    ctx = createMockCtx();
    caller = appRouter.createCaller(ctx);
  });

  it("lists clips for a project", async () => {
    const result = await caller.clips.list({ projectId: 1 });
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe("video");
  });

  it("returns empty array for project with no clips", async () => {
    const result = await caller.clips.list({ projectId: 999 });
    expect(result).toEqual([]);
  });

  it("creates a clip", async () => {
    const result = await caller.clips.create({
      projectId: 1, type: "video", endTime: 3000, duration: 3000, order: 2,
    });
    expect(result).toBe(3);
  });

  it("updates a clip", async () => {
    await expect(caller.clips.update({ clipId: 1, duration: 10000 })).resolves.toBeUndefined();
  });

  it("deletes a clip", async () => {
    await expect(caller.clips.delete({ clipId: 1 })).resolves.toBeUndefined();
  });
});

describe("audioTracks router", () => {
  let ctx: TrpcContext;
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    vi.clearAllMocks();
    ctx = createMockCtx();
    caller = appRouter.createCaller(ctx);
  });

  it("lists tracks for a project", async () => {
    const result = await caller.audioTracks.list({ projectId: 1 });
    expect(result).toEqual([]);
  });

  it("creates an audio track", async () => {
    const result = await caller.audioTracks.create({
      projectId: 1, type: "background-music", sourceUrl: "https://example.com/music.mp3",
      duration: 10000, order: 0,
    });
    expect(result).toBe(0);
  });
});

describe("exports router", () => {
  let ctx: TrpcContext;
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    vi.clearAllMocks();
    ctx = createMockCtx();
    caller = appRouter.createCaller(ctx);
  });

  it("lists exports for a project", async () => {
    const result = await caller.exports.list({ projectId: 1 });
    expect(result).toEqual([]);
  });

  it("creates an export", async () => {
    const result = await caller.exports.create({
      projectId: 1, format: "mp4", resolution: "1080p", quality: "high",
    });
    expect(result).toBe(0);
  });

  it("updates an export", async () => {
    await expect(caller.exports.update({ exportId: 1, status: "completed", fileUrl: "https://example.com/out.mp4" })).resolves.toBeUndefined();
  });
});

describe("aiJobs router", () => {
  let ctx: TrpcContext;
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    vi.clearAllMocks();
    ctx = createMockCtx();
    caller = appRouter.createCaller(ctx);
  });

  it("lists AI jobs for a project", async () => {
    const result = await caller.aiJobs.list({ projectId: 1 });
    expect(result).toEqual([]);
  });

  it("creates an AI job", async () => {
    const result = await caller.aiJobs.create({
      projectId: 1, type: "auto-captions", input: JSON.stringify({ language: "en" }),
    });
    expect(result).toBe(0);
  });

  it("updates an AI job", async () => {
    await expect(caller.aiJobs.update({ jobId: 1, status: "completed", output: JSON.stringify({ captions: [] }) })).resolves.toBeUndefined();
  });
});
