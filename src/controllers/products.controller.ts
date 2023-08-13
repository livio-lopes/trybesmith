import { Request, Response } from 'express';
import productsService from '../services/products.service';
import statusCode from '../utlis/statusCode';

const create = async (req: Request, res: Response): Promise<void> => {
  const { name, price, orderId } = req.body;
  const newProduct = await productsService.create({ name, price, orderId });
  res.status(statusCode.CREATED).json(newProduct);
};

const listProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await productsService.listProducts();
  res.status(statusCode.OK).json(products);
};

export default { create, listProducts };