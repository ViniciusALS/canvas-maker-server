import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import UserQueries from '../database/UserQueries';
import RequestError from './RequestError';


export default class Validation {

	private static async validateRequest(req:Request, res:Response, validations: ValidationChain[]):Promise<boolean> {

		await Promise.all(validations.map(validation => validation.run(req)));

		const errors = RequestError.expressValidatorErrorsMsgCleaner(
			validationResult(req).array());

		if (errors.length > 0) {
			res.status(400).json({ errors });
			return false;
		}

		return true;
	}


	private static getRequestMethod(req: Request, res: Response): string|void {
		const method = req.body.method;

		if (method)
			return method;

		const errors = RequestError.missingMethod;
		res.status(400).json({ errors });
	}


	private static localSigninValidation = [
		body('email').exists().withMessage('Email field missing.')
			.if(body('email').exists())
			.trim().isEmail().normalizeEmail().withMessage('Email format is incorrect.'),

		body('password').exists().withMessage('Password field missing.')
			.if(body('password').exists())
			.isLength({ min: 7 }).withMessage('Password should be at least 7 characters long.')
	];
	public static async signup(req: Request, res: Response, next: NextFunction):Promise<void> {

		const method = Validation.getRequestMethod(req, res);
		if (!method) return;


		let validations: ValidationChain[];

		if (method === 'local') {
			validations = [
				body('name').exists().withMessage('Name field missing.').trim(),

				body('nickname').exists().withMessage('Nickname field missing.').trim(),

				body('email').exists().withMessage('Email field missing.')
					.if(body('email').exists())
					.trim().isEmail()
					.normalizeEmail().withMessage('Email format is incorrect.'),

				body('password').exists().withMessage('Password field missing.')
					.if(body('password').exists())
					.isLength({ min: 7 }).withMessage('Password should be at least 7 characters long.')
			];
		}
		else {
			const errors = RequestError.invalidMethod;
			res.status(400).json({ errors });
			return;
		}


		const isValidRequest = await Validation.validateRequest(req, res, validations);
		if (!isValidRequest)
			return;


		const existingUserAccount = await UserQueries.findAccountByNickOrEmail(req.body.nickname, req.body.email);

		if (existingUserAccount) {

			const forbittenUserErrors = [];

			if (existingUserAccount.nickname === req.body.nickname) {
				forbittenUserErrors.push(RequestError.userNicknameAlreadyExists[0]);
			}

			if (existingUserAccount.email === req.body.email) {
				forbittenUserErrors.push(RequestError.userEmailAlreadyExists[0]);
			}

			res.status(403).json({ errors: forbittenUserErrors });

			return;
		}

		next();
	}


	public static async signin(req: Request, res: Response, next: NextFunction):Promise<void> {

		const method = Validation.getRequestMethod(req, res);
		if (!method) return;

		let validations: ValidationChain[];

		if (method === 'local') {
			validations = Validation.localSigninValidation;
		}
		else {
			const errors = RequestError.invalidMethod;
			res.status(400).json({ errors });
			return;
		}

		const isValidRequest = await Validation.validateRequest(req, res, validations);
		if (!isValidRequest)
			return;

		next();
	}
}

