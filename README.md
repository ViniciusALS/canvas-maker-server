<p align="right">
	<img src="https://img.shields.io/github/license/ViniciusALS/canvas-maker-server" alt="license badge">
  <img src="https://img.shields.io/github/last-commit/ViniciusALS/canvas-maker-server" alt="last commit badge">
</p>

## ![Canvas Maker](./.github/resources/logo.png)

Canvas Maker is an online tool to help entrepreneurs design their canval and start developing their company.

</br>

> # Personal Notes
>
> I started this project for two reasons. The first one being that I wanted to practice building an entire application from scratch. I had never done anything on this level and I wanted to challenge myself. 
> The other reason why I started this project was that I wanted to have this tool for a while and it didn`t exist, Canvas is a business model to help entrepreneurs materialize their ideas and I could never find a good online tool for it. 
> To build this project, I had to learn many new technologies that I had not had the time to use so far like typescript, how to do unit and integration tests using jest.js and how to deal with user authentication and authorization. 
> The project is not done yet but I am excited to finish and any help is welcomed.


# Server

This repository contains all files related to the Canvas Maker server. If you are looking for the front end aplication for Canvas Maker click [here](#).
<!-- TODO: Link to front end repository. -->

<!-- ## Security

We take your security very seriously. That is why it is very important to us to make clear what measures we are taking and how we are dealing with user`s data. To see what safety measurements we are taking visit out [wiki page on safety](#). -->
<!-- TODO: Create security wiki page -->

## Requirements

Canvas Maker`s server require the following software to work:

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing)


## Running and Developing This Project

- Clone this repository.
- Run `npm install` to install all dependencies.
- Run `npm build` to compile project into the public folder.

Or

- Run `npm run dev` to start the local server and develop.
- Use `http://localhost:3000` to interact with server.
- Run `npm test` to test any modification with jest.
- Run `npm run coverage` to check the code coverage of your tests.


## Built With

This project was build using the following technologies. You can check their individual documentations by going to:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [typescript](https://www.typescriptlang.org/) - JavaScript that scales.
- [express.js](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [express validator](https://express-validator.github.io/docs/) - express.js middlewares that wraps validator and sanitizer functions.
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.


## Developing Tools Used

This project was build using the following devoloping technologies. You can check their individual documentations by going to:

- [eslint](https://eslint.org/docs/user-guide/getting-started) - Find and fix problems in your JavaScript code.
- [ts-node](https://www.npmjs.com/package/ts-node) - TypeScript execution environment and REPL for node.js
- [nodemon](https://www.npmjs.com/package/nodemon) - Simple monitor script for use during development of a node.js app.
- [jest](https://jestjs.io/docs/en/getting-started) - Delightful JavaScript Testing.
- [supertest](https://www.npmjs.com/package/supertest) - SuperAgent driven library for testing HTTP servers.

<!--
## Usage

### Database Structure

You can check the project`s database structure by going to the [database wiki page](https://github.com/ViniciusALS/canvas-maker-server/wiki/Database-Structure). -->

<!--
## How to contribute

Before anything, take a look on the project`s [code of conduct](./github/CODE_OF_CONDUCT.md). -->
<!-- TODO: Create how to contribute guide lines page -->
<!-- TODO: Create styling guidelines documentation page -->

## License

This project is licensed under a [Apache License 2.0](./LICENSE).
A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.