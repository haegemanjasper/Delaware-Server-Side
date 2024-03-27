const Router = require("@koa/router");
const installHealthRouter = require("./health");
const installUserRouter = require("./user");
const installNotificationRouter = require("./notification");
const notificationService = require("../service/notification");
const installOrderRouter = require("./order");

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
    installOrderRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
}
