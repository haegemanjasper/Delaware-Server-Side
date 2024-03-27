const { withServer } = require("../supertest.setup");
const { test400ValidationFailed, test401Unauthorized } = require("../common/clientErrors");

describe("Users", () => {
    let request;

    withServer(({ supertest }) => {
        request = supertest;
    });

    const url = "/api/users";

    describe(`POST ${url}/login`, () => {
        it("should 200 and return a token", async () => {
            const response = await request.post(`${url}/login`).send({
                email: "Brakkert@example.com",
                password :"hashed_password_1"
            })

            expect(response.status).toBe(200);
            expect(response.body.user).toBeTruthy();
            expect(response.body.user.email).toBe("Brakkert@example.com");
            expect(response.body.token).toBeTruthy();
        });

        describe("invalid email", () => {
            test400ValidationFailed(() =>
                request.post(`${url}/login`).send({
                    email: "notAnEmail",
                    password: "Server2024",
                })
            );
            test400ValidationFailed(() =>
                request.post(`${url}/login`).send({
                    email: "notAnEmail@",
                    password: "Server2024",
                })
            );
            test400ValidationFailed(() =>
                request.post(`${url}/login`).send({
                    email: "notAnEmail@mail",
                    password: "Server2024",
                })
            );
            test400ValidationFailed(() =>
                request.post(`${url}/login`).send({
                    email: "notAnEmail.com",
                    password: "Server2024",
                })
            );
            test400ValidationFailed(() =>
                request.post(`${url}/login`).send({
                    email: "notAnEmail@.com",
                    password: "Server2024",
                })
            );
            test400ValidationFailed(() =>
                request.post(`${url}/login`).send({
                    email: "0".repeat(255) + "@gmail.com",
                    password: "Server2024",
                })
            );
        });

        describe("invalid password", () => {
            test401Unauthorized(() => request.post(`${url}/login`).send({
                email: "Brakkert@example.com",
                password: "toshort"
            }));
            test401Unauthorized(() => request.post(`${url}/login`).send({
                email: "Brakkert@example.com",
                password: "0".repeat(256),
            }));
            test401Unauthorized(() => request.post(`${url}/login`).send({
                email: "Brakkert@example.com",
                password: "wrongPassword",
            }));
        });
    });
});
