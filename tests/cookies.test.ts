import { describe, expect, it } from "vitest";
import type { Request } from "express";
import { getSessionCookieOptions } from "../server/_core/cookies";

function mockRequest(overrides?: Partial<Request>): Request {
  return {
    protocol: "https",
    hostname: "localhost",
    headers: { host: "localhost" },
    ...overrides,
  } as Request;
}

describe("getSessionCookieOptions", () => {
  it("returns httpOnly, sameSite none, path /", () => {
    const req = mockRequest();
    const opts = getSessionCookieOptions(req);

    expect(opts.httpOnly).toBe(true);
    expect(opts.sameSite).toBe("none");
    expect(opts.path).toBe("/");
  });

  it("sets secure=true for https requests", () => {
    const req = mockRequest({ protocol: "https" });
    const opts = getSessionCookieOptions(req);
    expect(opts.secure).toBe(true);
  });

  it("sets secure=false for http requests", () => {
    const req = mockRequest({ protocol: "http" });
    const opts = getSessionCookieOptions(req);
    expect(opts.secure).toBe(false);
  });

  it("detects https via x-forwarded-proto header", () => {
    const req = mockRequest({
      protocol: "http",
      headers: { "x-forwarded-proto": "https" },
    });
    const opts = getSessionCookieOptions(req);
    expect(opts.secure).toBe(true);
  });

  it("returns undefined domain for localhost", () => {
    const req = mockRequest({ hostname: "localhost" });
    const opts = getSessionCookieOptions(req);
    expect(opts.domain).toBeUndefined();
  });

  it("returns undefined domain for IPv4 address", () => {
    const req = mockRequest({ hostname: "127.0.0.1" });
    const opts = getSessionCookieOptions(req);
    expect(opts.domain).toBeUndefined();
  });

  it("returns undefined domain for IPv6 address", () => {
    const req = mockRequest({ hostname: "::1" });
    const opts = getSessionCookieOptions(req);
    expect(opts.domain).toBeUndefined();
  });

  it("returns undefined domain for simple hostnames (2 parts)", () => {
    const req = mockRequest({ hostname: "example.com" });
    const opts = getSessionCookieOptions(req);
    expect(opts.domain).toBeUndefined();
  });

  it("returns parent domain for subdomains (3+ parts)", () => {
    const req = mockRequest({ hostname: "3000-xxx.manuspre.computer" });
    const opts = getSessionCookieOptions(req);
    expect(opts.domain).toBe(".manuspre.computer");
  });

  it("returns parent domain for deep subdomains", () => {
    const req = mockRequest({ hostname: "a.b.example.com" });
    const opts = getSessionCookieOptions(req);
    expect(opts.domain).toBe(".example.com");
  });
});
