const { hashPassword, verifyPassword } = require("../core/password");
const { generateJWT, verifyJWT } = require("../core/jwt");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

/**
 * @param (object) - The user object that is stored in the database.
 * @returns (object) - Object that contains the fields that the user is allowed to view.
 */
function makeExposedUser({ email }) {
    return { email };
}

/**
 * @param (string) - Request header.
 * @returns (object) - Object that contains the users data and JWT.
 */
async function checkAndParseSession(authHeader) {
    if (!authHeader) {
        throw ServiceError.unauthorized("You need to be signed in");
    } 

    if (!authHeader.startsWith("Bearer ")) {
        throw ServiceError.unauthorized("Invalid authentication token");
    }

    const authToken = authHeader.substring(7);
    try {
        const { email, roles } = await verifyJWT(authToken); 

        // TODO: return the users data from the database.
        return { email, roles, authToken };
    } catch (error) {
        getLogger().error(error.message, { error });
        throw ServiceError.unauthorized(error.message);
    }
}

/**
 * @param (object) user - The user object that is stored in the database.
 * @returns (object) - Contains the users data and JWT.
 */
async function makeLoginData(user) {
    const token = await generateJWT(user);
    return { user: makeExposedUser(user), token };
}

/**
 * @param (string) email
 * @param (string) password
 * @returns (object) - Contains the users data and JWT.
 */
async function login(email, password) {
    // TODO: Get this information from the database.
    const user = {
        email: "johndoe@gmail.com",
        passwordHash: await hashPassword("Server2024")
    };

    if (!user | !await verifyPassword(password, user.passwordHash)) {
        throw ServiceError.unauthorized("The given email and password do not match");
    }
    
    return await makeLoginData(user);
}

module.exports = {
    checkAndParseSession,
    login,
};
