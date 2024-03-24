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
-   **order**
    -   `GET /orders?limit=&offset=&filter={}&sort={}`
    -   `GET /orders/:id?limit=&offset=&filter={}&sort={}`

## Query params

-   **limit**: The amount of resources that the response contains.
-   **offset**: The start index of the resource.
-   **filter**:
-   **sort**: Encoded URI containing a JSON string. The key point to a column and the value to the sorting order (asc, desc).
    Columns with no coresponding key are not sorted.

## Tests

1.  To run test create the `.env.test` file and add the following:

```
NODE_ENV=test
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
```

2.  Run the test with the `yarn test` or `yarn test:coverage` command.

