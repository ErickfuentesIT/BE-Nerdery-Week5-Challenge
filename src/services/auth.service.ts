import { SignUpDto } from "../dtos/auth/requests/signup.dto";
import { plainToInstance } from "class-transformer";
import { UserDto } from "../dtos/auth/responses/user.dto";
import { BadRequest, Conflict, Unauthorized } from "http-errors";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import { SignInDto } from "../dtos/auth/requests/signin.dto";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export class AuthService {
  static async signup(body: SignUpDto): Promise<UserDto> {
    const exists = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (exists) {
      throw new Conflict("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
        role: "USER",
      },
    });

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  static async signin(body: SignInDto): Promise<{
    user: UserDto;
    token: string;
  }> {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new Unauthorized("Invalid email or password");
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }, // Token expires in 1 day
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { authToken: token },
    });

    return {
      user: plainToInstance(UserDto, user, { excludeExtraneousValues: true }),
      token,
    };
  }

  static async signout(userId: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { authToken: null },
    });
  }

  static async forgotPassword(email: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const tokenExpiration = new Date(Date.now() + 600000); // One Time Token expires in 10 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: tokenExpiration,
      },
    });

    return resetToken;
  }

  static async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequest("Token is invalid or has expired");

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        authToken: null,
      },
    });
  }
}
