import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import RequestError from '../models/RequestError';
import TokenQueries from '../database/TokensQueries';
import jwt from 'jsonwebtoken';

dotenv.config({ path: 'secure/.env' });

interface Token {
	userId: number,
	iat: number,
	exp: number,
	iss: string
}

export default class AuthController {

	public static generateAccessToken(userId:number):string {
		return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
			expiresIn: process.env.ACCESS_TOKEN_LIFE_TIME!
		});
	}


	public static async generateRefreshToken(userId:number):Promise<string> {
		const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!);

		await TokenQueries.addRefreshToken(userId, refreshToken);

		return refreshToken;
	}


	public static getAccessToken(req: Request, res: Response, next: NextFunction): void {

		const bearesHeader = req.headers.authorization;

		if (typeof bearesHeader === 'undefined') {
			const errors = RequestError.missingAuthHeader;
			res.status(403).json({ errors });
			return;
		}

		const token = bearesHeader.split(' ')[1];

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error, authData) => {
			if (error) {

				if (error.message === 'jwt expired') {
					res.status(403).send({ errors: RequestError.tokenExpired });
				}
				else {
					console.log(error);
					res.status(403).send();
				}

				return;
			}

			const varifiedToken = <Token>authData;

			req.id = varifiedToken.userId;

			next();
		});
	}


	public static refreshToken(req: Request, res: Response): Response {


		const refreshToken = req.header('refreshToken');

		if (typeof refreshToken === 'undefined') {
			const errors = RequestError.missingAuthHeader;
			return res.status(403).json({ errors });
		}


		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (error, authData) => {
			if (error) {
				console.log(error);
				return res.status(403).send();
			}

			const verifiedToken = <Token>authData;

			const accessToken = AuthController.generateAccessToken(verifiedToken.userId);

			return res.status(200).json({ accessToken });
		});

		return res.sendStatus(500);
	}

	public static logout(req: Request, res: Response): Response {
		let AccountsId = 0;

		try {
			const accessToken = req.header('authorization');
			const refreshToken = req.header('refreshToken');

			if (typeof refreshToken === 'undefined' || typeof accessToken === 'undefined') {
				const errors = RequestError.missingAuthHeader;
				return res.status(403).json({ errors });
			}


			jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (error, authData) => {
				if (error)
					throw error;

				const token = <Token>authData!;

				AccountsId = token.userId;
			});

			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (error, authData) => {
				if (error)
					throw error;

				const token = <Token>authData!;

				if (token.userId !== AccountsId)
					throw new Error('Refresh token userId and access token userId don`t match.');

				await TokenQueries.removeRefreshToken(AccountsId, refreshToken);
			});
		}
		catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}

		return res.sendStatus(200);
	}
}
