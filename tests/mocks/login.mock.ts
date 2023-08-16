import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const loginHagar = {
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: bcrypt.hashSync('terrível', SALT_ROUNDS),
}
const validUserName = 'Hagar'
const validPassword = bcrypt.hashSync('terrível', SALT_ROUNDS)
const noUserLogin = { username: '', password: validPassword }
const noPasswordLogin = { username: validUserName, password: '' }
const invalidUserNameLogin = { username: 'Bode', password: validPassword }
const invalidPasswordLogin = { username: validUserName, password: 'bode' }
const validLogin = { username: validUserName, password: validPassword }
const fakeToken = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY4Njc1NDc1Nn0.jqAuJkcLp0RuvrOd4xKxtj_lm3Z3-73gQQ9IVmwE5gA" }
const status = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
}
const errorMessage = {
  REQUIRED_FIELD: { "message": "\"username\" and \"password\" are required" },
  INVALID_LOGIN: { "message": "Username or password invalid" }
}

const responseUnauthorized = {
  status: status.BAD_REQUEST,
  data: errorMessage.INVALID_LOGIN
}

const responseOk = {
  status: status.OK,
  data: fakeToken
}

export default {
  validPassword,
  validUserName,
  noUserLogin,
  noPasswordLogin,
  invalidUserNameLogin,
  invalidPasswordLogin,
  validLogin,
  fakeToken,
  status,
  errorMessage,
  loginHagar,
  responseUnauthorized,
  responseOk
}