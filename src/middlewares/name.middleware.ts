import { Request, Response, NextFunction } from 'express';
import statusCode from '../utils/statusCode';
import messageError from '../utils/messageErro';

const nameMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    return res.status(statusCode.BAD_REQUEST).json(messageError.NAME_REQUIRED);
  }
  if (typeof name !== 'string') {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(messageError.NAME_TYPE);
  }
  if (name.length < 3) {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(messageError.NAME_LENGTH);
  }
  return next();
};

export default nameMiddleware;