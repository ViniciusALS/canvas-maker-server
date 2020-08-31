import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import RequestError from '../models/RequestError';
// import * as fs from 'fs';


export default class AccountController {

	private static profileStorageEngine = multer.diskStorage({

		destination: (req, file, cb) =>
			cb(null, 'public/profiles'),

		filename: (req, file, cb) =>
			cb(null, `${ file.fieldname }-${ Date.now() }${ path.extname(file.originalname) }`)
	});


	private static imageFilter = (_:Request, file:Express.Multer.File, cb:multer.FileFilterCallback) => {

		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/u)) {
			return cb(new Error(RequestError.wrongImageFormat[0]));
		}
		cb(null, true);
	};

	private static profileUpload = multer({
		storage: AccountController.profileStorageEngine,
		fileFilter: AccountController.imageFilter
	}).single('profilePicture');


	public static updateProfilePicture(req: Request, res: Response): void {

		try {
			AccountController.profileUpload(req, res, () => res.sendStatus(200));
		}
		catch (error) {
			console.log(error);
			res.sendStatus(400);
		}
	}
}
