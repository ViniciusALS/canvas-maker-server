import { Router, Response } from 'express';
import UserController from './controllers/UserController';
import Validation from './models/Validation';
import authController from './controllers/AuthController';


const routes = Router();

routes.get('/', (_, res:Response) => res.status(204).send());

routes.post('/signup',
	Validation.signup,
	UserController.signUp);

routes.post('/signin',
	Validation.signin,
	UserController.signIn);

routes.get('/refreshToken', authController.refreshToken);

routes.post('/logout', authController.logout);


routes.post('/updatePhoto');


export default routes;
