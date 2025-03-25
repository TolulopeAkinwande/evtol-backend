// import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import { CustomError } from '../utils/customError.error';

// const errorMiddleWare: ErrorRequestHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): Response | void => {
//   const status: number = error.status || 500;
//   const message: string = error.message || 'Something went wrong';

//   res.status(status).json({ error: true, message });
// };

// export default errorMiddleWare;