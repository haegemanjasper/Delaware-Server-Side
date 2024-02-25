const Router = require("@koa/router");
const installHealthRouter = require("./health"); 
const installUserRouter = require("./user");

/**
 * Installs all routers in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/api",
    });

    installHealthRouter(router);
    installUserRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
}
