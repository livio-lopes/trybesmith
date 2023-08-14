import { Request, Response } from 'express';
import productsService from '../services/products.service';
import statusCode from '../utlis/statusCode';

const create = async (req: Request, res: Response): Promise<Response> => {
  const { name, price, orderId } = req.body;
  const newProduct = await productsService.create({ name, price, orderId });
  return res.status(statusCode.CREATED).json(newProduct);
};

const listProducts = async (req: Request, res: Response): Promise<Response> => {
  const products = await productsService.listProducts();
  return res.status(statusCode.OK).json(products);
};

export default { create, listProducts };