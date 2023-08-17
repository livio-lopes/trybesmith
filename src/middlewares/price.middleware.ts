import { Request, Response, NextFunction } from 'express';
import statusCode from '../utils/statusCode';
import messageError from '../utils/messageErro';

const priceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { price } = req.body;
  if (!price) {
    return res.status(statusCode.BAD_REQUEST).json(messageError.PRICE_REQUIRED);
  }
  if (typeof price !== 'string') {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(messageError.PRICE_TYPE);
  }
  if (price.length < 3) {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(messageError.PRICE_LENGTH);
  }
  return next();
};

export default priceMiddleware;