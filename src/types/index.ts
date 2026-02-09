// src/types/index.ts
import { Request } from "express";

export interface UserPayload {
  Id: number;
  Email: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}
