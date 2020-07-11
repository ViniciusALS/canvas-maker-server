/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import userQueries from '../database/userQueries';
// import connection from '../database/Connection';

export = {

	signUp: async (req: Request, res: Response): Promise<Response> => {

		 const users = await userQueries.allUsers();
		// const [rows, _] = await connection.query('SELECT * FROM userIdentity');

		return res.status(200).json({ saldjflkasjd: users });
	},
}
