import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Video Projects
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"), // S3 URL
  duration: int("duration"), // in seconds
  resolution: varchar("resolution", { length: 50 }).default("1080p").notNull(), // HD, 1080p, 4K
  format: varchar("format", { length: 10 }).default("mp4").notNull(), // mp4, mov
  aspectRatio: varchar("aspectRatio", { length: 10 }).default("16:9").notNull(),
  status: mysqlEnum("status", ["draft", "processing", "completed", "failed"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// Video Clips
export const clips = mysqlTable("clips", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  type: mysqlEnum("type", ["image", "video", "text", "ai-generated"]).notNull(),
  sourceUrl: text("sourceUrl"), // S3 URL
  startTime: int("startTime").default(0).notNull(), // in milliseconds
  endTime: int("endTime").notNull(), // in milliseconds
  duration: int("duration").notNull(), // in milliseconds
  order: int("order").notNull(), // clip position in timeline
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Clip = typeof clips.$inferSelect;
export type InsertClip = typeof clips.$inferInsert;

// Effects and Transitions
export const effects = mysqlTable("effects", {
  id: int("id").autoincrement().primaryKey(),
  clipId: int("clipId").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // filter, transition, text-overlay, etc.
  name: varchar("name", { length: 100 }).notNull(),
  settings: text("settings"), // JSON string with effect parameters
  startTime: int("startTime").notNull(),
  duration: int("duration").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Effect = typeof effects.$inferSelect;
export type InsertEffect = typeof effects.$inferInsert;

// Audio Tracks
export const audioTracks = mysqlTable("audioTracks", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  type: mysqlEnum("type", ["background-music", "voice-over", "sound-effect"]).notNull(),
  sourceUrl: text("sourceUrl").notNull(), // S3 URL
  startTime: int("startTime").default(0).notNull(),
  duration: int("duration").notNull(),
  volume: int("volume").default(100).notNull(), // 0-100
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AudioTrack = typeof audioTracks.$inferSelect;
export type InsertAudioTrack = typeof audioTracks.$inferInsert;

// Text Overlays
export const textOverlays = mysqlTable("textOverlays", {
  id: int("id").autoincrement().primaryKey(),
  clipId: int("clipId").notNull(),
  content: text("content").notNull(),
  fontFamily: varchar("fontFamily", { length: 100 }).default("Arial").notNull(),
  fontSize: int("fontSize").default(24).notNull(),
  color: varchar("color", { length: 7 }).default("#FFFFFF").notNull(), // hex color
  backgroundColor: varchar("backgroundColor", { length: 7 }), // optional
  alignment: varchar("alignment", { length: 20 }).default("center").notNull(),
  animation: varchar("animation", { length: 50 }), // fade-in, slide-in, etc.
  startTime: int("startTime").notNull(),
  duration: int("duration").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TextOverlay = typeof textOverlays.$inferSelect;
export type InsertTextOverlay = typeof textOverlays.$inferInsert;

// Exports
export const exports = mysqlTable("exports", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  format: varchar("format", { length: 10 }).notNull(), // mp4, mov
  resolution: varchar("resolution", { length: 50 }).notNull(), // HD, 1080p, 4K
  quality: varchar("quality", { length: 20 }).default("high").notNull(),
  fileUrl: text("fileUrl"), // S3 URL of exported video
  fileSize: int("fileSize"), // in bytes
  status: mysqlEnum("status", ["pending", "processing", "completed", "failed"]).default("pending").notNull(),
  error: text("error"), // error message if failed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Export = typeof exports.$inferSelect;
export type InsertExport = typeof exports.$inferInsert;

// AI Processing Jobs
export const aiJobs = mysqlTable("aiJobs", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  type: mysqlEnum("type", ["text-to-video", "auto-captions", "narration", "background-removal"]).notNull(),
  input: text("input"), // JSON string with input parameters
  output: text("output"), // JSON string with output results
  status: mysqlEnum("status", ["pending", "processing", "completed", "failed"]).default("pending").notNull(),
  error: text("error"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type AIJob = typeof aiJobs.$inferSelect;
export type InsertAIJob = typeof aiJobs.$inferInsert;
