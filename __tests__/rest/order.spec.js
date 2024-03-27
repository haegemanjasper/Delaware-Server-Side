const { withServer, login } = require("../supertest.setup");
const { 
    test400ValidationFailed, test401Unauthorized
} = require("../common/clientErrors");

describe("Order", () => {
    let request;
    
    withServer(({
        supertest,
    }) => {
        request = supertest
        });

    const url = "/api/orders";

    beforeAll(async () => {
        authHeader = await login(request, "Brakkert@example.com", "hashed_password_1");
    });

    describe(`GET ${url}`, () => { 
        it("should 200 and return all orders", async () => {
            const response = await request.get(url).set("Authorization", authHeader);
            
            expect(response.status).toBe(200);
        });

        test401Unauthorized(() => request.get(url));
    });

    describe(`GET ${url}/:id`, () => {
        it("should 200 and return the requested order", async () => {
            const response = await request.get(`${url}/1`).set("Authorization", authHeader);
            
            expect(response.status).toBe(200);
        });
 
        test400ValidationFailed(() => request.get(`${url}/-1`).set("Authorization", authHeader));
        test400ValidationFailed(() => request.get(`${url}/not_a_valid_id`).set("Authorization", authHeader));
        test401Unauthorized(() => request.get(`${url}/1`));
    });
});
