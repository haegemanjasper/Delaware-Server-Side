const Joi = require("joi");
const Router = require("@koa/router");
const { requireAuthentication } = require("../core/auth");
const { validate } = require("../core/validation");
const orderService = require("../service/order");

// TODO: check JWT for user role to get the correct data for each user.
async function getAllOrders(ctx) {
    ctx.body = await orderService.getAll(
        ctx.request.query.limit,
        ctx.request.query.offset,
        JSON.parse(decodeURIComponent(ctx.request.query.filter)),
        JSON.parse(decodeURIComponent(ctx.request.query.sort))
    );
}
getAllOrders.validationScheme = {
    query: {
        limit: Joi.number().integer().optional().default(10),
        offset: Joi.number().integer().optional().default(1),
        filter: Joi.string().optional().default("%7B%7D"),
        sort: Joi.string().optional().default("%7B%7D"),
    }
};

async function getOrderById(ctx) {
    ctx.body = await orderService.getById(
        ctx.params.id,
        ctx.request.query.limit,
        ctx.request.query.offset,
        JSON.parse(decodeURIComponent(ctx.request.query.sort)),
        JSON.parse(decodeURIComponent(ctx.request.query.filter))
    );
}
getOrderById.validationScheme = {
    params: {
        id: Joi.number().integer().positive()
    },
    query: {
        limit: Joi.number().integer().optional().default(10),
        offset: Joi.number().integer().optional().default(1),
        filter: Joi.string().optional().default("%7B%7D"),
        sort: Joi.string().optional().default("%7B%7D"),
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

    router.get("/", requireAuthentication, validate(getAllOrders.validationScheme), getAllOrders);
    router.get("/:id", requireAuthentication, validate(getOrderById.validationScheme), getOrderById);
        
    app.use(router.routes()).use(router.allowedMethods());
}
