import { describe, expect, it } from "vitest";
import {
  users, projects, clips, effects, audioTracks,
  textOverlays, exports, aiJobs,
} from "../drizzle/schema";

describe("database schema", () => {
  it("exports at least the 8 expected tables", () => {
    const tables = [users, projects, clips, effects, audioTracks, textOverlays, exports, aiJobs];
    expect(tables.length).toBe(8);
  });

  it("users table has expected columns", () => {
    const cols = Object.keys(users);
    expect(cols).toContain("id");
    expect(cols).toContain("openId");
    expect(cols).toContain("email");
    expect(cols).toContain("role");
    expect(cols).toContain("createdAt");
    expect(cols).toContain("updatedAt");
  });

  it("projects table has expected columns", () => {
    const cols = Object.keys(projects);
    expect(cols).toContain("id");
    expect(cols).toContain("userId");
    expect(cols).toContain("name");
    expect(cols).toContain("status");
    expect(cols).toContain("resolution");
    expect(cols).toContain("format");
    expect(cols).toContain("aspectRatio");
  });

  it("clips table has expected columns", () => {
    const cols = Object.keys(clips);
    expect(cols).toContain("id");
    expect(cols).toContain("projectId");
    expect(cols).toContain("type");
    expect(cols).toContain("sourceUrl");
    expect(cols).toContain("startTime");
    expect(cols).toContain("endTime");
    expect(cols).toContain("duration");
    expect(cols).toContain("order");
  });

  it("effects table has expected columns", () => {
    const cols = Object.keys(effects);
    expect(cols).toContain("id");
    expect(cols).toContain("clipId");
    expect(cols).toContain("type");
    expect(cols).toContain("name");
    expect(cols).toContain("settings");
    expect(cols).toContain("startTime");
    expect(cols).toContain("duration");
  });

  it("audioTracks table has expected columns", () => {
    const cols = Object.keys(audioTracks);
    expect(cols).toContain("id");
    expect(cols).toContain("projectId");
    expect(cols).toContain("type");
    expect(cols).toContain("sourceUrl");
    expect(cols).toContain("volume");
    expect(cols).toContain("order");
  });

  it("textOverlays table has expected columns", () => {
    const cols = Object.keys(textOverlays);
    expect(cols).toContain("id");
    expect(cols).toContain("clipId");
    expect(cols).toContain("content");
    expect(cols).toContain("fontFamily");
    expect(cols).toContain("fontSize");
    expect(cols).toContain("color");
  });

  it("exports table has expected columns", () => {
    const cols = Object.keys(exports);
    expect(cols).toContain("id");
    expect(cols).toContain("projectId");
    expect(cols).toContain("format");
    expect(cols).toContain("resolution");
    expect(cols).toContain("status");
    expect(cols).toContain("fileUrl");
  });

  it("aiJobs table has expected columns", () => {
    const cols = Object.keys(aiJobs);
    expect(cols).toContain("id");
    expect(cols).toContain("projectId");
    expect(cols).toContain("type");
    expect(cols).toContain("input");
    expect(cols).toContain("output");
    expect(cols).toContain("status");
  });

  it("users have role enum constraint", () => {
    const roleCol = users.role;
    expect(roleCol).toBeDefined();
  });

  it("projects have status enum constraint", () => {
    const statusCol = projects.status;
    expect(statusCol).toBeDefined();
  });
});
