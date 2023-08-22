import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

const user = {
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: bcrypt.hashSync('terrível', SALT_ROUNDS),
}
const listOrders = [
  {
    dataValues:
    {
      "id": 1,
      "userId": 1,
      "productIds": [
        {
          "id": 1
        },
        {
          "id": 2
        }
      ]
    }
  },
  {
    dataValues:
    {
      "id": 2,
      "userId": 3,
      "productIds": [
        {
          "id": 3
        },
        {
          "id": 4
        }
      ]
    }
  },
]

const responseService = [
  {
    "id": 1,
    "userId": 1,
    "productIds": [
      1,
      2
    ]
  },
  {
    "id": 2,
    "userId": 3,
    "productIds": [
      3,
      4
    ]
  },
]

const createOrderValid = {
  "productIds": [1, 2],
  "userId": 1
}

const responseServiceCreate = {
  "id": 4,
  "userId": 1,
}

const userNotFoundResponse = {
  status: 404,
  data: { "message": "\"userId\" not found" }
}

const userResponse = {
  status:200,
  data: user
}

const invalidProductIdsType = {
  "productIds": { invalid: 'invalid' },
  "userId": 1
}

const invalidProductIdsEmpty ={
  "productIds": [],
  "userId": 1
}

const invalidProductIdsTypeArray = {
  "productIds": ['invalid'],
  "userId": 1
}

const noProductsIds = {
  "productIds": undefined,
  "userId": 1
}

const noUserId = {
  "productIds": [1, 2],
  "userId": undefined
}
const invalidUserIdType = {
  "productIds": [1, 2],
  "userId": 'invalid'
}

const invalidUserIdNotFound = {
  "productIds": [1, 2],
  "userId": 545
}

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsInZvY2F0aW9uIjoiR3VlcnJlaXJvIiwibGV2ZWwiOjEwLCJwYXNzd29yZCI6IiQyYSQxMCQ3MDF5Y0Vha00yY2FhMHFVd3MvQ3dPQ0kyTS5rUHppaHBsRFJwSy9vOWxVUmVjUVdPSU0uSyIsImlhdCI6MTY5MjYyNTkyNn0.iMXb-7cfGjIY0WKyRvwUZNfXlxMSVTMyk8rPS6Gx0dU'

const statusCode = { OK: 200, 
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
 }

 const messageErro ={
  TOKEN_REQUIRED: { "message": "Token not found" },
  TOKEN_INVALID: { "message": "Invalid token" },
  USER_REQUIRED: { "message": "\"userId\" is required" },
  USER_INVALID: { "message": "\"userId\" must be a number" },
  USER_NOT_FOUND: { "message": "\"userId\" not found" },
  PRODUCT_REQUIRED: { "message": "\"productIds\" is required" },
  PRODUCT_INVALID: { "message": "\"productIds\" must be an array" },
  PRODUCT_INVALID_TYPE: { "message": "\"productIds\" must include only numbers" },
 }

export default {
  listOrders,
  statusCode,
  responseService,
  createOrderValid,
  invalidProductIdsType,
  invalidProductIdsTypeArray,
  noProductsIds,
  noUserId,
  invalidUserIdType,
  invalidUserIdNotFound,
  messageErro,
  responseServiceCreate,
  user,
  validToken,
  invalidProductIdsEmpty,
  userNotFoundResponse,
  userResponse
}