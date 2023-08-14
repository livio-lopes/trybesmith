const listOrders = [
  {dataValues: 
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
  }},
  {dataValues:
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
  }},
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

const statusCode = { OK:200}

export default { listOrders, statusCode,responseService }