import express from 'express';
import productRoute from './products.routes';
import orderRoute from './orders.routes';
import loginRoute from './login.routes';

const routes = express.Router();
routes.use('/products', productRoute);
routes.use('/orders', orderRoute);
routes.use('/login', loginRoute);

export default routes;