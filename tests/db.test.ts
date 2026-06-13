import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("drizzle-orm/mysql2", () => ({
  drizzle: vi.fn(() => ({
    insert: vi.fn(() => ({
      values: vi.fn(() => Promise.resolve([{ insertId: 1 }])),
      onDuplicateKeyUpdate: vi.fn(() => ({ set: vi.fn(() => Promise.resolve()) })),
    })),
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([])),
          orderBy: vi.fn(() => Promise.resolve([])),
        })),
        orderBy: vi.fn(() => Promise.resolve([])),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => Promise.resolve()),
      })),
    })),
    delete: vi.fn(() => ({
      where: vi.fn(() => Promise.resolve()),
    })),
  })),
}));

vi.mock("../server/_core/env", () => ({
  ENV: {
    ownerOpenId: "owner-123",
    cookieSecret: "test-secret",
    appId: "test-app",
    oAuthServerUrl: "https://oauth.test.com",
    databaseUrl: "",
    isProduction: false,
    forgeApiUrl: "",
    forgeApiKey: "",
  },
}));

import * as db from "../server/db";

describe("db projects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getUserProjects returns empty array when DB unavailable", async () => {
    const result = await db.getUserProjects(1);
    expect(result).toEqual([]);
  });

  it("getProject returns null when DB unavailable", async () => {
    const result = await db.getProject(1, 1);
    expect(result).toBeNull();
  });

  it("getProjectClips returns empty array when DB unavailable", async () => {
    const result = await db.getProjectClips(1);
    expect(result).toEqual([]);
  });

  it("getProjectAudioTracks returns empty array when DB unavailable", async () => {
    const result = await db.getProjectAudioTracks(1);
    expect(result).toEqual([]);
  });

  it("getProjectExports returns empty array when DB unavailable", async () => {
    const result = await db.getProjectExports(1);
    expect(result).toEqual([]);
  });

  it("getProjectAIJobs returns empty array when DB unavailable", async () => {
    const result = await db.getProjectAIJobs(1);
    expect(result).toEqual([]);
  });

  it("getClipEffects returns empty array when DB unavailable", async () => {
    const result = await db.getClipEffects(1);
    expect(result).toEqual([]);
  });

  it("getClipTextOverlays returns empty array when DB unavailable", async () => {
    const result = await db.getClipTextOverlays(1);
    expect(result).toEqual([]);
  });

  it("createProject throws when DB unavailable", async () => {
    await expect(db.createProject({ userId: 1, name: "Test", status: "draft" } as any)).rejects.toThrow("Database not available");
  });

  it("deleteProject throws when DB unavailable", async () => {
    await expect(db.deleteProject(1, 1)).rejects.toThrow("Database not available");
  });
});
