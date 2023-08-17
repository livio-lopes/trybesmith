

const productCreated = {
  id: 6,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: 4
}

const newProduct = {
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: 4
}

const productNoName ={
  name: "",
  price: "30 peças de ouro",
  orderId: 4,
}

const productNoPrice ={
  name: "Martelo de Thor",
  price: "",
  orderId: 4
}

const productShortName ={
  name:'ma',
  price: "30 peças de ouro",
  orderId: 4
}

const productShortPrice ={
  name: "Martelo de Thor",
  price: "30",
  orderId: 4
}

const productNameTypeNumber ={
  name: 123,
  price: "30 peças de ouro",
  orderId: 4
}

const productPriceTypeNumber ={
  name: "Martelo de Thor",
  price: 30,
  orderId: 4
}
const listProducts = [
  {
    id: 1,
    name: "Pedra Filosofal",
    price: "20 gold",
    orderId: 2
  },
  {
    id: 2,
    name: "Lança do Destino",
    price: "100 diamond",
    orderId: 1
  }
]

const statusCode = {
  "OK": 200,
  "CREATED": 201,
  "BAD_REQUEST": 400,
  "UNPROCESSABLE_ENTITY": 422,
}

const messageError = {
  NAME_REQUIRED: { message: '"name" is required' },
  NAME_TYPE: { message: '"name" must be a string' },
  NAME_LENGTH: { message: '"name" length must be at least 3 characters long' },
  PRICE_REQUIRED: { message: '"price" is required' },
  PRICE_TYPE: { message: '"price" must be a string' },
  PRICE_LENGTH: { message: '"price" length must be at least 3 characters long' },
}

export default {
  productCreated,
  newProduct,
  statusCode,
  listProducts,
  productNoName,
  productNoPrice,
  productShortName,
  productShortPrice,
  productNameTypeNumber,
  productPriceTypeNumber,
  messageError,
}