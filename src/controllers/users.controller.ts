import { Request, Response } from 'express';
import usersService from '../services/users.service';

const login = async (req: Request, res: Response) => {
  const serviceResponse = await usersService.login(req.body);
  res.status(serviceResponse.status).json(serviceResponse.data);
};

export default { login };