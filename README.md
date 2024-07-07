## Description

Backend part for Snake Game

## Technologies

-   NestJS, TypeORM, postgreSQL, Typescript, AWS S3, JWT, bcrypt, passport, sendGrid

## Features

-   role based authentication with JWT strategy and bcrypt for password hash
-   restore and update password with email token notification
-   email confirmation for registration


## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file. See in .env.example in root directory

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Author

Dmytro Kotykhin
-   [Github](https://github.com/DKotykhin)
-   [Web](https://dmytro-kotykhin.pp.ua)
-   [LinkedIn](https://www.linkedin.com/in/dmytro-kotykhin-4683151b)
