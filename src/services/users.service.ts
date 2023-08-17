import UserModel from '../database/models/user.model';
import messageError from '../utils/messageErro';
import statusCode from '../utils/statusCode';
import pw from '../utils/password';
import hash from '../utils/token';
import { UserLogin } from '../types/User';
import { ResponseService, Erro, Token } from '../types/ResponseService';

const login = async (userLogin:UserLogin):Promise<ResponseService<Erro | Token>> => {
  const { username, password } = userLogin;
  const user = await UserModel.findOne({ where: { username } });
  if (!user || !pw.checkPassword(password, user.dataValues.password)) {
    return ({ status: statusCode.UNAUTHORIZED, data: messageError.FIELD_INVALID });
  }
  const token = hash.sign(user.dataValues);
  return ({ status: statusCode.OK, data: { token } });
};

export default {
  login,
};