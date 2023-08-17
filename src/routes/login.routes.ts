import express from 'express';
import loginMiddleware from '../middlewares/login.middleware';
import usersController from '../controllers/users.controller';

const loginRoute = express.Router();
loginRoute.post('/', loginMiddleware, usersController.login);

export default loginRoute;