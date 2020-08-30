import dotenv from 'dotenv';
import { Request, Response } from 'express';
import UserQueries from '../database/UserQueries';
import bcrypt from 'bcrypt';
import RequestError from '../models/RequestError';
import authController from './AuthController';

dotenv.config({ path: 'secure/.env' });


export default class UserController {

	public static async signUp (req: Request, res: Response): Promise<Response> {

		try {
			const userName: string = req.body.name;
			const userNickname: string = req.body.nickname;
			const userEmail: string = req.body.email;
			const userHashedPassword: string = await bcrypt.hash(
				req.body.password,
				Number(process.env.BCRYPT_SALT_ROUNDS!));

			const userId = await UserQueries.createLocalUser(userName, userNickname, userEmail, userHashedPassword);


			const accessToken = authController.generateAccessToken(userId);
			const refreshToken = await authController.generateRefreshToken(userId);

			return res.status(200).json({ accessToken, refreshToken });
		}
		catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	}


	public static async signIn(req: Request, res: Response): Promise<Response> {

		try {
			const localUser = await UserQueries.findLocalByEmail(req.body.email);

			if (!localUser)
				return res.status(404).json({ 'errors': RequestError.userDoesNotExist });


			const isPasswordRight = await bcrypt.compare(req.body.password, localUser.password);

			if (!isPasswordRight)
				return res.status(401).json({ 'errors': RequestError.incorrectPassword });


			const accessToken = authController.generateAccessToken(localUser.AccountsId);
			const refreshToken = await authController.generateRefreshToken(localUser.AccountsId);

			return res.status(200).json({ accessToken, refreshToken });
		}
		catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	}
}
