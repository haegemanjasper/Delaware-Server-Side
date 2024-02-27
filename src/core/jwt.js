const config = require("config"); 
const jwt = require("jsonwebtoken");

const JWT_AUDIENCE = config.get("auth.jwt.audience"); 
const JWT_SECRET = config.get("auth.jwt.secret");
const JWT_ISSUER = config.get("auth.jwt.issuer");
const JWT_EXPIRATION_INTERVAL = config.get("auth.jwt.expirationInterval");

/**
 * Generates a jsonwebtoken for the given user.
 *
 * @param {object} user - The user for with to generate the token.
 * @returns {Promise} - Rejects if there is an error signing the token.
 * Resolve returns the signed token.
 */
function generateJWT(user) {
    const tokenData = {
        email: user.email,
        roles: user.roles,
    };

    const signOptions = {
        expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 1000),
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        subject: "auth",
    };

    return new Promise((resolve, reject) => {
        jwt.sign(tokenData, JWT_SECRET, signOptions, (err, token) => {
            if (err) {
                console.log("Error while signing new token:", err.message);
                return reject(err);
            }
            return resolve(token);
        });
    });
}

/**
 * Verifies the given jsonwebtoken.
 *
 * @param {object} authToken - The token to verify. 
 * @returns {Promise} - Rejects if the token is invalid.
 * Resolves returns a decoded token.
 */
function verifyJWT(authToken) {
    const verifyOptions = {
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        subject: "auth",
    };

    return new Promise((resolve, reject) => {
        jwt.verify(authToken, JWT_SECRET, verifyOptions, (err, decodedToken) => {
            if (err || !decodedToken) {
                console.log("Error while verifying token:", err.message);
                return reject(err || new Error("Token could not be parsed"));
            }
            return resolve(decodedToken);
        });
    });
}

module.exports = {
    generateJWT,
    verifyJWT,
};
