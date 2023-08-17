import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;
const hashPassword = (password:string):string => bcrypt.hashSync(password, SALT_ROUNDS);
const checkPassword = (password:string, hash:string):boolean =>
  bcrypt.compareSync(password, hash);
export default { hashPassword, checkPassword };