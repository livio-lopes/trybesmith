import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'secret';
const sign = (payload: any):string => jwt.sign(payload, secret, { algorithm: 'HS256' });
const verify = (token: string):any => jwt.verify(token, secret);
export default { sign, verify };