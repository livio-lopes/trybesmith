import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../types/User';

const secret: string = process.env.JWT_SECRET || 'secret';

const extracBearerToken = (headerValue: string): string => headerValue.split(' ')[1];

const sign = (payload: User):string => jwt.sign(payload, secret, { algorithm: 'HS256' });

const verify = (token: string):JwtPayload | string | boolean => {
  try {
    if (extracBearerToken(token)) {
      return jwt.verify(extracBearerToken(token), secret);
    }
    return jwt.verify(token, secret);
  } catch (error) {
    return false;
  }
};

export default { sign, verify };