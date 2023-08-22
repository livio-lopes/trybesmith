const messageError = {
  FIELD_REQUIRED: { message: '"username" and "password" are required' },
  FIELD_INVALID: { message: 'Username or password invalid' },
  NAME_REQUIRED: { message: '"name" is required' },
  NAME_TYPE: { message: '"name" must be a string' },
  NAME_LENGTH: { message: '"name" length must be at least 3 characters long' },
  PRICE_REQUIRED: { message: '"price" is required' },
  PRICE_TYPE: { message: '"price" must be a string' },
  PRICE_LENGTH: { message: '"price" length must be at least 3 characters long' },
  TOKEN_REQUIRED: { message: 'Token not found' },
  TOKEN_INVALID: { message: 'Invalid token' },
  USERID_REQUIRED: { message: '"userId" is required' },
  USERID_NOTFOUND: { message: '"userId" not found' },
  USERID_TYPE: { message: '"userId" must be a number' },
  PRODUCTIDS_REQUIRED: { message: '"productIds" is required' },
  PRODUCTIDS_TYPE: { message: '"productIds" must be an array' },
  PRODUCTIDS_TYPE_ARRAY: { message: '"productIds" must include only numbers' },

};

export default messageError;