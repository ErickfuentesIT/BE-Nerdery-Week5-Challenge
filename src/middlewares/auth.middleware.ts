import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "http-errors";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      throw new Unauthorized("Access denied. No token Provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.authToken !== token) {
      throw new Unauthorized(
        "Session expired or invalid. Please sign in again.",
      );
    }

    (req as any).user = user;

    next();
  } catch (error) {
    next(new Unauthorized("Invalid or expired token"));
  }
}
