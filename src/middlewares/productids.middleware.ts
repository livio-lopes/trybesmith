import { Response, Request, NextFunction } from 'express';
import statusCode from '../utils/statusCode';
import messageError from '../utils/messageErro';

const productIdsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { productIds } = req.body;
  if (!productIds) {
    return res.status(statusCode.BAD_REQUEST).json(messageError.PRODUCTIDS_REQUIRED);
  }
  if (!Array.isArray(productIds)) {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(messageError.PRODUCTIDS_TYPE);
  }
  const arrayNumbers = productIds.every((id) => typeof id === 'number');
  if (!arrayNumbers || productIds.length === 0) {
    return res.status(statusCode.UNPROCESSABLE_ENTITY).json(messageError.PRODUCTIDS_TYPE_ARRAY);
  }
  return next();
};

export default productIdsMiddleware;