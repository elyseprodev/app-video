import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "../server/routers";
import type { TrpcContext } from "../server/_core/context";
import type { User } from "../drizzle/schema";

vi.mock("../server/db", () => {
  const mockProjects = [
    { id: 1, userId: 1, name: "Test Project", status: "draft", format: "mp4", resolution: "1080p", aspectRatio: "16:9", description: null, thumbnail: null, duration: null, createdAt: new Date(), updatedAt: new Date() },
  ];

  return {
    getUserProjects: vi.fn((userId: number) =>
      Promise.resolve(mockProjects.filter((p) => p.userId === userId))
    ),
    getProject: vi.fn((projectId: number, userId: number) =>
      Promise.resolve(mockProjects.find((p) => p.id === projectId && p.userId === userId) ?? null)
    ),
    createProject: vi.fn((data: any) => Promise.resolve(2)),
    updateProject: vi.fn(() => Promise.resolve()),
    deleteProject: vi.fn(() => Promise.resolve()),
    getProjectClips: vi.fn(() => Promise.resolve([])),
    getProjectAudioTracks: vi.fn(() => Promise.resolve([])),
    getProjectExports: vi.fn(() => Promise.resolve([])),
    getProjectAIJobs: vi.fn(() => Promise.resolve([])),
  };
});

function createMockCtx(userOverrides?: Partial<User>): TrpcContext {
  const user: User = {
    id: 1,
    openId: "test-user",
    name: "Test User",
    email: "test@example.com",
    loginMethod: "email",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...userOverrides,
  };

  return {
    user,
    req: {
      protocol: "https",
      hostname: "localhost",
      headers: { host: "localhost" },
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("projects router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("list", () => {
    it("returns projects for the authenticated user", async () => {
      const ctx = createMockCtx();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.projects.list();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toBe("Test Project");
    });

    it("returns empty array for user with no projects", async () => {
      const ctx = createMockCtx({ id: 999, openId: "no-projects" });
      const caller = appRouter.createCaller(ctx);
      const result = await caller.projects.list();
      expect(result).toEqual([]);
    });
  });

  describe("get", () => {
    it("returns a project by id", async () => {
      const ctx = createMockCtx();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.projects.get({ projectId: 1 });
      expect(result).not.toBeNull();
      expect(result?.name).toBe("Test Project");
    });

    it("returns null for non-existent project", async () => {
      const ctx = createMockCtx();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.projects.get({ projectId: 999 });
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("creates a project with valid input", async () => {
      const ctx = createMockCtx();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.projects.create({
        name: "New Project",
        resolution: "1080p",
        format: "mp4",
        aspectRatio: "16:9",
      });
      expect(result).toBe(2);
    });
  });

  describe("delete", () => {
    it("deletes a project", async () => {
      const ctx = createMockCtx();
      const caller = appRouter.createCaller(ctx);
      await expect(caller.projects.delete({ projectId: 1 })).resolves.toBeUndefined();
    });
  });
});
