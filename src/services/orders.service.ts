import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order, OrderWithProducts } from '../types/Order';

const listOrders = async ():Promise<Order[]> => {
  const orders = await OrderModel.findAll(
    { include: [
      { model: ProductModel,
        as: 'productIds',
        attributes: { exclude: ['name', 'price', 'orderId'] } },
    ] },  
  ) as unknown as OrderWithProducts[];
  const ordersWithProductsIds = orders.map((order) => {
    const productIds = order.dataValues.productIds?.map((product) => product.id || 0);
    return { ...order.dataValues, productIds };
  });

  return ordersWithProductsIds;
};

export default { listOrders };