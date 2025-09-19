import { HTTPStatusCode } from "../config/constant";

export interface ValidationType {
  fields: string[];
  constraint: string;
}
interface AppErrorArgs {
  name?: string;
  statusCode: HTTPStatusCode;
  message: string;
  isOperational?: boolean;
}
export class AppError extends Error {
  public override readonly name: string;
  public readonly statusCode: HTTPStatusCode;
  public readonly isOperational: boolean = true;
  public readonly validationErrors?: ValidationType[];
  constructor(agrs: AppErrorArgs) {
    const { name, statusCode, message, isOperational } = agrs;
    super(message);
    this.statusCode = statusCode;
    this.name = name ?? "ApplicationError";

    if (isOperational !== undefined) {
      this.isOperational = isOperational;
    }
    Error.captureStackTrace(this);
  }
  static notFound(message: string): AppError {
    return new AppError({
      name: "NotFoundError",
      message,
      statusCode: HTTPStatusCode.NotFound,
    });
  }
  static internalServerError(message: string): AppError {
    return new AppError({
      name: "InternalServerError",
      message,
      statusCode: HTTPStatusCode.InternalServerError,
    });
  }
}
