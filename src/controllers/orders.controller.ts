import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import statusCode from '../utils/statusCode';

const listOrders = async (req: Request, res: Response): Promise<Response> => { 
  const orders = await ordersService.listOrders();
  return res.status(statusCode.OK).json(orders);
};

export default { listOrders };