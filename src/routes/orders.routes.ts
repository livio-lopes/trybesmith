import express from 'express';
import ordersController from '../controllers/orders.controller';
import authMiddleware from '../middlewares/auth.middleware';
import productIdsMiddleware from '../middlewares/productids.middleware';
import userIdMiddleware from '../middlewares/userId.middleware';

const orderRoute = express.Router();
orderRoute.get('/', ordersController.listOrders); 
orderRoute.post(
  '/', 
  authMiddleware,
  productIdsMiddleware, 
  userIdMiddleware, 
  ordersController.createOrder,
);

export default orderRoute;