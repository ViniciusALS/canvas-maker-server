import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import RequestError from '../models/RequestError';
import jwt from 'jsonwebtoken';

dotenv.config({ path: 'secure/.env' });

interface Token {
	userId: number,
	iat: number,
	exp: number,
	iss: string
}

export default class Authentication {

	public static generateAccessToken(userId:number):string {
		return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
			expiresIn: '15m'
		});
	}


	public static generateRefreshToken(userId:number):string {
		const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!);

		TokenQueries.addRefreshToken(userId, refreshToken);

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

		const headerRefreshToken = req.headers.refreshToken;

		if (typeof headerRefreshToken === 'undefined') {
			const errors = RequestError.missingAuthHeader;
			return res.status(403).json({ errors });
		}

		const refreshToken = headerRefreshToken.split(' ')[1];

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (error, authData) => {
			if (error) {
				console.log(error);
				return res.status(403).send();
			}

			const varifiedToken = <Token>authData;

			const userId = varifiedToken.userId;

			const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
				expiresIn: '15m'
			});

			return res.status(200).json({ accessToken });
		});

		return res.sendStatus(500);
	}
}
