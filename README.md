# 2024-backend-a02

## Startup

1.  Create the `.env` file and add the following:

```
NODE_ENV=development
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
```

2.  Install all dependencies with the `yarn` command.
3.  Start the server in development with `yarn start`.

## API calls

-   **health**
    -   `GET /api/health/ping`
    -   `GET /api/health/version`
-   **user**
    -   `POST /users/login`

## Tests

1.  To run test create the `.env.test` file and add the following:

```
NODE_ENV=test
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
```

2.  Run the test with the `yarn test` or `yarn test:coverage` command.
