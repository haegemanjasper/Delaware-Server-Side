const { generateJWT, verifyJWT } = require("../../src/core/jwt");

describe("JWT", () => {
    const user = {
        email: "johndoe@gmail.com",
        roles: ["admin"],
    };

    it("should generate a JWT", async () => {
        const token = await generateJWT(user);
        expect(token.length).not.toBe(0);
    });

    it("should verify the JWT", async () => {
        const token = await generateJWT(user);
        const { email, roles } = await verifyJWT(token);
        expect(email).toBe(user.email);
        expect(roles.length).toBe(1);
        expect(roles[0]).toBe(user.roles[0]);
    });
})
