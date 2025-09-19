import { type Request, type Response, type NextFunction } from "express";
import asyncHandler from "../../middleware/async-middleware";
import { goodResponse } from "../../lib/response";

export default class AuthController {
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(goodResponse("Hello from Auth"));
    }
  );

  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(goodResponse("Hello from Auth"));
    }
  );

  me = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(goodResponse("Hello from Auth"));
    }
  );
}