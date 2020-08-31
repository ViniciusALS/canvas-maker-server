import { ValidationError } from 'express-validator';


export default class RequestError {

	static expressValidatorErrorsMsgCleaner(results: ValidationError[]):string[] {
		return results.map(error => error.msg);
	}

	static get missingMethod():string[] {
		return ['Method field is missing.'];
	}

	static get invalidMethod():string[] {
		return ['Method field is invalid.'];
	}

	static get userNicknameAlreadyExists():string[] {
		return ['A user already exists with this nickname.'];
	}

	static get userEmailAlreadyExists(): string[] {
		return ['A user already exists with this email.'];
	}

	static get userDoesNotExist(): string[] {
		return ['A user with this email does not exist.'];
	}

	static get incorrectPassword(): string[] {
		return ['Incorrect password.'];
	}

	static get missingAuthHeader(): string[] {
		return ['Authorization field is missing on the header.'];
	}

	static get tokenExpired(): string[] {
		return ['Your access token expired.'];
	}

	static get failedImageUpload(): string[] {
		return ['For some reason the uploading of your image failed.'];
	}

	static get wrongImageFormat(): string[] {
		return ['Only image files are allowed.'];
	}
}
