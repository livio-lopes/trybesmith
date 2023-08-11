import express from 'express';
import productsController from '../controllers/products.controller';

const productRoute = express.Router();
productRoute.post('/', productsController.create);

export default productRoute;