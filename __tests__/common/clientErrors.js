function test400ValidationFailed(requestFactory) {
    it("should 400 and return code VALIDATION_FAILED", async () => {
        const response = await requestFactory();

        expect(response.status).toBe(400);
        expect(response.body.code).toBe("VALIDATION_FAILED");
    });
}

function test401Unauthorized(requestFactory) {
    it("should 401 when no authorization token provided", async () => {
        const response = await requestFactory();

        expect(response.statusCode).toBe(401);
        expect(response.body.code).toBe("UNAUTHORIZED");
        expect(response.body.message).toBe("You need to be signed in");
    });

    it("should 401 when invalid authorization token provided", async () => {
        const response = await requestFactory().set("Authorization", "INVALID TOKEN");

        expect(response.statusCode).toBe(401);
        expect(response.body.code).toBe("UNAUTHORIZED");
        expect(response.body.message).toBe("Invalid authentication token");
    });
}

module.exports = {
    test400ValidationFailed,
    test401Unauthorized
};
