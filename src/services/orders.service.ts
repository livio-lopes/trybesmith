import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order, OrderWithProducts, OrderInput } from '../types/Order';

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

const createOrder = async (order: OrderInput):Promise<Order> => {
  const orderCreated = await OrderModel.create(order);
  await ProductModel.update(
    { orderId: orderCreated.dataValues.id }, 
    { where: { id: order.productIds } },
  );

  return orderCreated.dataValues;
};

export default { listOrders, createOrder };