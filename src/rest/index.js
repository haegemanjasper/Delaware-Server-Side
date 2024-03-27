const Router = require("@koa/router");
const installHealthRouter = require("./health");
const installUserRouter = require("./user");
const installNotificationRouter = require("./notificationpage");
const notificationService = require("../service/notificationpage");

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
    installNotificationRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
};
