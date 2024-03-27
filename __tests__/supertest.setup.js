const supertest = require("supertest");
const createServer = require("../src/createServer");

async function login(supertest, email, password) {
    const response = await supertest.post("/api/users/login").send({ email, password });

    if (response.statusCode !== 200) {
        throw new Error(response.body.message || "Unkown error occured");
    }

    return ` Bearer ${response.body.token}`;
}

function withServer(setter) {
    let server;

    beforeAll(async () => {
        server = await createServer();
        setter({
            supertest: supertest(server.getApp().callback()),
        });
    });

    afterAll(async () => {
        await server.stop();
    });
}

module.exports = {
    login,
    withServer,
};
