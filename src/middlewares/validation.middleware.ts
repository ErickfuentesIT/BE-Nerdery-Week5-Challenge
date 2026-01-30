import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
type Dto<T> = { new (): T };

export function validationMiddleware<T extends object>(
  dtoClass: Dto<T>,
) {
  return async function name(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dto = plainToInstance(dtoClass, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).send({ message: "Validation failed", details: errors });
      return;
    }

    req.body = dto;
    next();
  };
}
