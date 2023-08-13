import ProductModel, 
{ ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';

const create = async (product: ProductInputtableTypes): Promise<ProductInputtableTypes> => {
  const newProduct = await ProductModel.create(product);
  return newProduct.dataValues;
};

const listProducts = async (): Promise<ProductSequelizeModel[]> => {
  const products = await ProductModel.findAll();
  return products;
};

export default {
  create,
  listProducts,
};