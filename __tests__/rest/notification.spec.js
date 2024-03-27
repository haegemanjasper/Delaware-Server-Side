const { withServer, login } = require("../supertest.setup");
const request = require("supertest");
const notificationService = require("../../src/service/notification");
const {
    test400ValidationFailed,
    test401Unauthorized,
} = require("../common/clientErrors");

describe("Notifications", () => {
    let request;

    withServer(({ supertest }) => {
        request = supertest;
    });

    beforeAll(async () => {
        authHeader = await login(request);
    });

    const url = "/api/notifications";

    describe(`GET ${url}`, () => {
        it("should return all notifications with status code 200", async () => {
            const response = await request
                .get(url)
                .set("Authorization", authHeader);

            expect(response.status).toBe(200);
        });

        test401Unauthorized(() => request.get(url));
    });

    describe(`GET ${url}/:id`, () => {
        it("should 200 and return the requested notification", async () => {
            const response = await request
                .get(`${url}/1`)
                .set("Authorization", authHeader);

            expect(response.status).toBe(200);
        });

        test400ValidationFailed(() =>
            request.get(`${url}/-1`).set("Authorization", authHeader)
        );
        test400ValidationFailed(() =>
            request
                .get(`${url}/not_a_valid_id`)
                .set("Authorization", authHeader)
        );
        test401Unauthorized(() => request.get(`${url}/1`));
    });
});
