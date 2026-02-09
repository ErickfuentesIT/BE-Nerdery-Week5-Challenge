import express, { Router } from "express";
import { authRoutes } from "./routes/auth.route";

const expressRouter = express.Router();

export function router(app: Router): void {
  app.use("/api/v1/auth", authRoutes());
}
