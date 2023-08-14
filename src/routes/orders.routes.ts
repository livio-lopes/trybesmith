import express from 'express';
import ordersController from '../controllers/orders.controller';

const orderRoute = express.Router();
orderRoute.get('/', ordersController.listOrders); 

export default orderRoute;