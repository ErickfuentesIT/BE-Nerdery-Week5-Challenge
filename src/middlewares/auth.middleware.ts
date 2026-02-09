import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "http-errors";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { AuthRequest } from "src/types";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
    throw new Unauthorized("Session expired or invalid. Please sign in again.");
  }

  (req as AuthRequest).user = { Id: user.id, Email: user.email };
  next();
}
