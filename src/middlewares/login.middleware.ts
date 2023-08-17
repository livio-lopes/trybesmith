import { Response, Request, NextFunction } from 'express';
import statusCode from '../utils/statusCode';
import messageError from '../utils/messageErro';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(statusCode.BAD_REQUEST).json(messageError.FIELD_REQUIRED);
  }
  return next();
};

export default loginMiddleware;