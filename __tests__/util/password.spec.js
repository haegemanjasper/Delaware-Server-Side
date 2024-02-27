const config = require("config");
const { hashPassword, verifyPassword } = require("../../src/core/password");

describe("Password", () => {
    const password = "$Server*2024@";
    
    it("should hash the password", async () => {
        const hash = await hashPassword(password); 
        expect(hash).not.toBe(password);
    });

    it("should verify the hashed password", async () => {
        const hash = await hashPassword(password);
        expect(await verifyPassword(password, hash)).toBe(true);
    });

    it("should not verify the password", async () => {
        const hash = await hashPassword(password);
        expect(await verifyPassword("wrong_password", hash)).toBe(false);
    });

    it("should not verify the hash", async () => {
        const hash = await hashPassword("wrong_password");
        expect(await verifyPassword(password, hash)).toBe(false);
    })
})
