const supertest = require("supertest");
const createServer = require("../src/createServer");

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
    withServer,
};
