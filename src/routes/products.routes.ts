import express from 'express';
import productsController from '../controllers/products.controller';

const productRoute = express.Router();
productRoute.post('/', productsController.create);
productRoute.get('/', productsController.listProducts);

export default productRoute;