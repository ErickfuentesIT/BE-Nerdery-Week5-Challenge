import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
export function httpErrorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message,
      name: error.name,
    });
  }

  if (error instanceof Error) {
    const statusCode = (error as any).statusCode || 500;
    return res.status(statusCode).json({
      message: error.message || "Internal server error",
      name: error.name,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
    name: "UnknownError",
  });
}
