import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { SignUpDto } from "../dtos/auth/requests/signup.dto";
import { SignInDto } from "../dtos/auth/requests/signin.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ForgotPasswordDto } from "../dtos/auth/requests/forgotPassword.dto";
import { ResetPasswordDto } from "../dtos/auth/requests/resetPassword.dto";
const router = express.Router();

export function authRoutes(): Router {
  router
    .route("/signup")
    .post(validationMiddleware(SignUpDto), asyncHandler(signup));
  router
    .route("/signin")
    .post(validationMiddleware(SignInDto), asyncHandler(signin));
  router.route("/signout").post(authMiddleware, asyncHandler(signout));
  router
    .route("/forgot-password")
    .post(
      validationMiddleware(ForgotPasswordDto),
      asyncHandler(forgotPassword),
    );
  router
    .route("/reset-password")
    .post(validationMiddleware(ResetPasswordDto), asyncHandler(resetPassword));

  return router;
}
