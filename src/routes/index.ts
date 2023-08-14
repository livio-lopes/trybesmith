import express from 'express';
import productRoute from './products.routes';
import orderRoute from './orders.routes';

const routes = express.Router();
routes.use('/products', productRoute);
routes.use('/orders', orderRoute);

export default routes;