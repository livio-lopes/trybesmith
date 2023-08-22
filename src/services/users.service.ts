import UserModel from '../database/models/user.model';
import messageError from '../utils/messageErro';
import statusCode from '../utils/statusCode';
import pw from '../utils/password';
import hash from '../utils/token';
import { UserLogin, User } from '../types/User';
import { Token, Response } from '../types/ResponseService';

const login = async (userLogin:UserLogin):Response<Token> => {
  const { username, password } = userLogin;
  const user = await UserModel.findOne({ where: { username } });
  if (!user || !pw.checkPassword(password, user.dataValues.password)) {
    return ({ status: statusCode.UNAUTHORIZED, data: messageError.FIELD_INVALID });
  }
  const token = hash.sign(user.dataValues);
  return ({ status: statusCode.OK, data: { token } });
};

const userById = async (userId:number):Response<User> => {
  const user = await UserModel.findByPk(userId);
  if (!user) {
    return ({ status: statusCode.NOT_FOUND, data: messageError.USERID_NOTFOUND });
  }
  return ({ status: statusCode.OK, data: user.dataValues });
};

export default {
  login,
  userById,
};