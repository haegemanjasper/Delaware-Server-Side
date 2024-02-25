const userService = require("../service/user");

/**
 * Checks if the request has a valid header.
 */
async function requireAuthentication(ctx, next) {
    const { authorization } = ctx.headers;
    const { authToken, ...session } = await userService.checkAndParseSession(authorization);

    ctx.state.session = session;
    ctx.state.authToken = authToken;

    return next();
}

module.exports = {
    requireAuthentication,
};
