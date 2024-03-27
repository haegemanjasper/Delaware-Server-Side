const { withServer, login } = require("../supertest.setup");
const {
    test400ValidationFailed,
    test401Unauthorized,
} = require("../common/clientErrors");

describe("Notifications", () => {
    let request;
    let authHeader;

    withServer(({ supertest }) => {
        request = supertest;
    });

    const url = "/api/notifications";

    beforeAll(async () => {
        authHeader = await login(request);
    });

    describe(`GET ${url}`, () => {
        it("should return all notifications with status code 200", async () => {
            const response = await request
                .get(url)
                .set("Authorization", authHeader);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test401Unauthorized(() => request.get(url));
    });

    describe(`GET ${url}/:id`, () => {
        it("should return the requested notification with status code 200", async () => {
            const createResponse = await request
                .post(url)
                .send({
                    message: "Test Notification",
                    userId: "12345",
                })
                .set("Authorization", authHeader);

            const notificationId = createResponse.body.id;

            const response = await request
                .get(`${url}/${notificationId}`)
                .set("Authorization", authHeader);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id", notificationId);
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
