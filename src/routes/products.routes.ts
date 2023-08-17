import express from 'express';
import productsController from '../controllers/products.controller';
import nameMiddleware from '../middlewares/name.middleware';
import priceMiddleware from '../middlewares/price.middleware';

const productRoute = express.Router();
productRoute.post('/', nameMiddleware, priceMiddleware, productsController.create);
productRoute.get('/', productsController.listProducts);

export default productRoute;