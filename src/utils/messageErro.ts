const messageError = {
  FIELD_REQUIRED: { message: '"username" and "password" are required' },
  FIELD_INVALID: { message: 'Username or password invalid' },
  NAME_REQUIRED: { message: '"name" is required' },
  NAME_TYPE: { message: '"name" must be a string' },
  NAME_LENGTH: { message: '"name" length must be at least 3 characters long' },
  PRICE_REQUIRED: { message: '"price" is required' },
  PRICE_TYPE: { message: '"price" must be a string' },
  PRICE_LENGTH: { message: '"price" length must be at least 3 characters long' },
};

export default messageError;