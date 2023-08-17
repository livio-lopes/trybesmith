import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../types/User';

const secret: string = process.env.JWT_SECRET || 'secret';
const sign = (payload: User):string => jwt.sign(payload, secret, { algorithm: 'HS256' });
const verify = (token: string):JwtPayload | string => jwt.verify(token, secret);
export default { sign, verify };