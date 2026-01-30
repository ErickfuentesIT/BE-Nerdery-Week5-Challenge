import { Request, Response } from "express";
import { SignUpDto } from "../dtos/auth/requests/signup.dto";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../dtos/auth/requests/signin.dto";

export async function signup(req: Request, res: Response): Promise<void> {
  const signupData: SignUpDto = req.body;
  const result = await AuthService.signup(signupData);
  res.status(201).json(result);
}

export async function signin(req: Request, res: Response): Promise<void> {
  const siginpData: SignInDto = req.body;
  const result = await AuthService.signin(siginpData);
  res.status(200).json(result);
}

export async function signout(req: Request, res: Response): Promise<void> {
  const user = (req as any).user;
  await AuthService.signout(user.id);
  res.status(200).json({ message: "Signed out successfully" });
}

export async function forgotPassword(
  req: Request,
  res: Response,
): Promise<void> {
  const { email } = req.body;
  const resetToken = await AuthService.forgotPassword(email);
  res.status(200).json({
    message: `If an account exists, you will receive an email with a password ${resetToken}`,
  });
}

export async function resetPassword(
  req: Request,
  res: Response,
): Promise<void> {
  const { token, password } = req.body;
  await AuthService.resetPassword(token, password);
  res.status(200).json({
    message:
      "Your password has been successfully reset. You can now sign in with your new credentials.",
  });
}
