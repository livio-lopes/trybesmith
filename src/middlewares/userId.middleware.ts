import { Response, Request, NextFunction } from 'express';
import statusCode from '../utils/statusCode';
import messageError from '../utils/messageErro';
// import UserModel from '../database/models/user.model';

const userIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(statusCode.BAD_REQUEST).json(messageError.USERID_REQUIRED);
  }
  if (typeof userId !== 'number') {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(messageError.USERID_TYPE);
  }
  return next();
};

export default userIdMiddleware;