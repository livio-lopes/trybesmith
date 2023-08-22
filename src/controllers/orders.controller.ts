import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import statusCode from '../utils/statusCode';
import userService from '../services/users.service';

const listOrders = async (req: Request, res: Response): Promise<Response> => { 
  const orders = await ordersService.listOrders();
  return res.status(statusCode.OK).json(orders);
};

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const newOrder = req.body;
  const { status, data } = await userService.userById(newOrder.userId);
  if (status === statusCode.NOT_FOUND) {
    return res.status(status).json(data);
  }
  const { userId } = await ordersService.createOrder(newOrder);
  return res.status(statusCode.CREATED).json({ userId, productIds: newOrder.productIds });
};

export default { listOrders, createOrder };