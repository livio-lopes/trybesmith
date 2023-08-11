import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';

const create = async (product: ProductInputtableTypes): Promise<ProductInputtableTypes> => {
  const newProduct = await ProductModel.create(product);
  return newProduct.dataValues;
};

export default {
  create,
};