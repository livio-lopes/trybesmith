import { Response, Request, NextFunction } from 'express';
import statusCode from '../utils/statusCode';
import messageError from '../utils/messageErro';
import token from '../utils/token';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers.authorization;
  // console.log(headerToken);
  if (!headerToken) {
    return res.status(statusCode.UNAUTHORIZED).json(messageError.TOKEN_REQUIRED);
  }
  // console.log(token.verify(headerToken));
  if (!token.verify(headerToken)) {
    return res.status(statusCode.UNAUTHORIZED).json(messageError.TOKEN_INVALID);
  }
  return next();
};

export default authMiddleware;