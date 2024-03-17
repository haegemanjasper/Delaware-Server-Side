const Joi = require("joi");
const Router = require("@koa/router");
const { requireAuthentication } = require("../core/auth");
const { validate } = require("../core/validation");
const orderService = require("../service/order");

// TODO: check JWT for user role to get the correct data for each user.
async function getAllOrders(ctx) {
    const query = ctx.request.query;
    console.log(query);
    if (query.sort)
        console.log(JSON.parse(decodeURIComponent(query.sort)));
    if (query.filter)
        console.log(JSON.parse(decodeURIComponent(query.filter)));
    ctx.body = await orderService.getAll();
}
getAllOrders.validationScheme = {
    query: {
        limit: Joi.optional(),
        offset: Joi.optional(),
        filter: Joi.optional(),
        sort: Joi.optional(),
    }
};

async function getOrderById(ctx) {
    ctx.body = await orderService.getById(ctx.params.id);
}
getOrderById.validationScheme = {
    params: {
        id: Joi.number().integer().positive()
    }
};

/**
 * Installs the router that handles requests that involve order data.
 *
 * @param {Router} app - The router prefixed with "/api".
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/orders",
    });

    // TODO: uncomment requireAuthentication once login is fully set up.
    router.get("/", /*requireAuthentication,*/ validate(getAllOrders.validationScheme), getAllOrders);
    router.get("/:id", /*requireAuthentication,*/ validate(getOrderById.validationScheme), getOrderById);
        
    app.use(router.routes()).use(router.allowedMethods());
}
