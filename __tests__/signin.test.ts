import request from 'supertest';
import app from '../src/app';
import faker from 'faker';


describe('Checks POST request on api/signin route:', () => {

	it('Responds 400 to missing method on request body.', done => {

		const requestBody = {
			'name': faker.name.findName(),
			'email': faker.internet.email(),
			'password': faker.internet.password()
		};

		request(app)
			.post('/api/signin')
			.send(requestBody)
			.expect('Content-Type', /json/u)
			.expect(400, {
				'errors': ['Method field is missing.']
			}, done);
	});


	it('Responds 400 to invalid method on request body.', done => {

		const requestBody = {
			'method': faker.random.word(),
			'email': faker.internet.email(),
			'password': faker.internet.password()
		};

		request(app)
			.post('/api/signin')
			.send(requestBody)
			.expect('Content-Type', /json/u)
			.expect(400, {
				'errors': ['Method field is invalid.']
			}, done);
	});


	describe('Check for signin using the local method.', () => {

		it('Responds 200 to correct request body.', done => {

			const signinRequestBody = {
				'method': 'local',
				'email': 'test@test.com',
				'password': 'password'
			};

			request(app)
				.post('/api/signin')
				.send(signinRequestBody)
				.expect(/\{"accessToken":\s*"(.)+\.(.)+\.(.)+",\s*"refreshToken":\s*"(.)+\.(.)+\.(.)+"\}/u)
				.expect(200, done);
		});


		it('Responds 400 to missing email on request body.', done => {

			const signinRequestBody = {
				'method': 'local',
				'password': 'password'
			};

			request(app)
				.post('/api/signin')
				.send(signinRequestBody)
				.expect('Content-Type', /json/u)
				.expect(400, {
					'errors': ['Email field missing.']
				}, done);
		});


		it('Responds 400 to missing password on request body.', done => {

			const signinRequestBody = {
				'method': 'local',
				'email': 'test@test.com'
			};

			request(app)
				.post('/api/signin')
				.send(signinRequestBody)
				.expect('Content-Type', /json/u)
				.expect(400, {
					'errors': ['Password field missing.']
				}, done);
		});


		it('Responds 404 to unexisting email account on request body.', done => {

			const signinRequestBody = {
				'method': 'local',
				'email': faker.internet.email(),
				'password': faker.internet.password()
			};

			request(app)
				.post('/api/signin')
				.send(signinRequestBody)
				.expect('Content-Type', /json/u)
				.expect(404, {
					'errors': ['A user with this email does not exist.']
				}, done);
		});


		it('Responds 401 to wrong password on request body.', done => {

			const signinRequestBody = {
				'method': 'local',
				'email': 'test@test.com',
				'password': faker.internet.password()
			};

			request(app)
				.post('/api/signin')
				.send(signinRequestBody)
				.expect('Content-Type', /json/u)
				.expect(401, {
					'errors': ['Incorrect password.']
				}, done);
		});
	});
});
