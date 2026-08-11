import type { Request, Response, NextFunction } from "express";
import { CastError } from "mongoose";
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: CastError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

export { notFound, errorHandler };
