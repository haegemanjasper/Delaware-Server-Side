const Joi = require("joi");
const Router = require("@koa/router");
const userService = require("../service/user");
const { validate } = require("../core/validation");

async function login(ctx) {
    const { email, password } = ctx.request.body;
    const token = await userService.login(email, password);
    ctx.body = token;
}
login.validationScheme = {
    body: {
        email: Joi.string().max(255).email(),
        password: Joi.string().min(8).max(255)
    }
}

/**
 * Installs the router that handles requests that involve user data.
 *
 * @param {Router} app - The router prefixed with "/api".
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/users",
    });

    router.post("/login", validate(login.validationScheme), login);
        
    app.use(router.routes()).use(router.allowedMethods());
}
