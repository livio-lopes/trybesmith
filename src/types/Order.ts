export type Order = {
  id: number;
  userId: number;
  productIds?: number[];
};

export type OrderWithProducts = {
  dataValues:{
    id: number;
    userId: number;
    productIds?: { id: number }[];
  } };

export type OrderInput = {
  userId: number;
  productIds: number[];
};