import { Router, Response } from 'express';
import UserController from './controllers/UserController';
import Validation from './models/Validation';
import authController from './controllers/AuthContoller';


const routes = Router();

routes.get('/', (_, res:Response) => res.status(204).send());

routes.post('/signup',
	Validation.signup,
	UserController.signUp);

routes.post('/signin',
	Validation.signin,
	UserController.signIn);

routes.get('/refreshToken', authController.refreshToken);

routes.post('/logout');

export default routes;
