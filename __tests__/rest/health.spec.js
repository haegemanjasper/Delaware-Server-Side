const config = require("config");
const packageJson = require("../../package.json");
const { withServer, login } = require("../supertest.setup");

describe("Health", () => {
    let request;
    
    withServer(({
        supertest,
    }) => {
        request = supertest
        });

    const url = "/api/health";

    beforeAll(async () => {
        defaultAuthHeader = await login(request);
    });

    describe(`GET ${url}ping`, () => {
        it("should 200 and return pong", async () => {
            const response = await request.get(`${url}/ping`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ pong: true });
        });

    });

    describe(`GET ${url}/version`, () => {
        it("should 200 and return version data", async () => {
            const response = await request.get(`${url}/version`).set("Authorization", defaultAuthHeader);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                env: config.get("env"),
                version: packageJson.version,
                name: packageJson.name
            });
        });
    });
})
