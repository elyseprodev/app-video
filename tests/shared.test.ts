import { describe, expect, it } from "vitest";
import { HttpError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from "../shared/_core/errors";
import { COOKIE_NAME, ONE_YEAR_MS, AXIOS_TIMEOUT_MS, UNAUTHED_ERR_MSG, NOT_ADMIN_ERR_MSG } from "../shared/const";
import { cn } from "../lib/utils";

describe("HttpError", () => {
  it("creates error with status code and message", () => {
    const error = new HttpError(418, "I'm a teapot");
    expect(error.statusCode).toBe(418);
    expect(error.message).toBe("I'm a teapot");
    expect(error.name).toBe("HttpError");
  });
});

describe("Error constructors", () => {
  it("BadRequestError", () => {
    const e = BadRequestError("bad input");
    expect(e).toBeInstanceOf(HttpError);
    expect(e.statusCode).toBe(400);
  });

  it("UnauthorizedError", () => {
    const e = UnauthorizedError("unauthorized");
    expect(e.statusCode).toBe(401);
  });

  it("ForbiddenError", () => {
    const e = ForbiddenError("forbidden");
    expect(e.statusCode).toBe(403);
  });

  it("NotFoundError", () => {
    const e = NotFoundError("not found");
    expect(e.statusCode).toBe(404);
  });
});

describe("Constants", () => {
  it("COOKIE_NAME is defined", () => {
    expect(COOKIE_NAME).toBe("app_session_id");
  });

  it("ONE_YEAR_MS is approximately 1 year", () => {
    expect(ONE_YEAR_MS).toBe(31536000000);
  });

  it("AXIOS_TIMEOUT_MS is 30s", () => {
    expect(AXIOS_TIMEOUT_MS).toBe(30000);
  });

  it("UNAUTHED_ERR_MSG has code 10001", () => {
    expect(UNAUTHED_ERR_MSG).toContain("10001");
  });

  it("NOT_ADMIN_ERR_MSG has code 10002", () => {
    expect(NOT_ADMIN_ERR_MSG).toContain("10002");
  });
});

describe("cn utility", () => {
  it("joins class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("merges tailwind classes", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("handles undefined values", () => {
    expect(cn("px-4", undefined)).toBe("px-4");
  });
});
