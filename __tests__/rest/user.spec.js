const { withServer } = require("../supertest.setup");
const { test400ValidationFailed } = require("../common/clientErrors");

describe("Users", () => {
    let request;
    
    withServer(({
        supertest,
    }) => {
        request = supertest
        });

    const url = "/api/users";

    describe(`POST ${url}/login`, () => {
        it("should 200 and return a token", async () => {
            const response = await request.post(`${url}/login`).send({
                email: "johndoe@gmail.com",
                password :"Server2024"
            })

            expect(response.status).toBe(200);
            expect(response.body.user).toBeTruthy();
            expect(response.body.user.email).toBe("johndoe@gmail.com");
            expect(response.body.token).toBeTruthy();
        });

        describe("invalid email", () => {
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "notAnEmail",
                password :"Server2024"
            }));
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "notAnEmail@",
                password :"Server2024"
            }));
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "notAnEmail@mail",
                password :"Server2024"
            }));
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "notAnEmail.com",
                password :"Server2024"
            }));
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "notAnEmail@.com",
                password :"Server2024"
            }));
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "0".repeat(255) + "@gmail.com",
                password :"Server2024"
            }));
        });

        describe("invalid password", () => {
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "johndoe@gmail.com",
                password :"toshort"
            }));
            test400ValidationFailed(() => request.post(`${url}/login`).send({
                email: "johndoe@gmail.com",
                password :"0".repeat(256),
            }));

            it("should 401 when wrong password", async () => {
                const response = await request.post(`${url}/login`).send({
                    email: "johndoe@gmail.com",
                    password :"wrongPassword",
                }) 

                expect(response.status).toBe(401);
                expect(response.body.code).toBe("UNAUTHORIZED");
                expect(response.body.message).toBe("The given email and password do not match");
            });
        });
    });
});
