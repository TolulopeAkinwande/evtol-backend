import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { Request, RequestHandler } from 'express';
import {CustomError} from '../utils/customError.error';
import { sanitize } from 'class-sanitizer';

export const getAllConstraints = (errors: ValidationError[]): Record<string, string>[] => {
  const constraints = [];
  for (const error of errors) {
    if (error.constraints) {
      constraints.push(error.constraints);
    }
    if (error.children) {
      constraints.push(...getAllConstraints(error.children));
    }
  }
  return constraints;
};

const dtoValidationMiddleware = (
  dto: any,
  path: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = false
): RequestHandler => {
  return (req: Request, res, next) => {
    const dtoObject = plainToInstance(dto, req[path]);
    validate(dtoObject, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const constraints = getAllConstraints(errors);
        const errorStr = constraints
          .map((c) => Object.values(c))
          .flat()
          .join(', ');
        next(new CustomError(400, errorStr));
      } else {
        sanitize(dtoObject);
        req[path] = dtoObject;
        next();
      }
    });
  };
};

export default dtoValidationMiddleware;