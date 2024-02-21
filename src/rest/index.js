const Router = require("@koa/router");
const installHealthRouter = require("./health"); 

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

    app.use(router.routes()).use(router.allowedMethods());
}
