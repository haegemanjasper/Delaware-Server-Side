const notificationService = require("../service/notification");
const Joi = require("joi");
const Router = require("@koa/router");
const { validate } = require("../core/validation");
const { requireAuthentication } = require("../core/auth");

const getAllNotifications = async (ctx) => {
    ctx.body = await notificationService.getAll();
};

getAllNotifications.validationScheme = null;

const getNotificationById = async (ctx) => {
    ctx.body = await notificationService.getById(ctx.params.id);
};

getNotificationById.validationScheme = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

async function createNotification(ctx){
    ctx.body = await notificationService.create(ctx.request.body.date, ctx.request.body.text, ctx.request.body.status, ctx.request.body.username);
    ctx.status = 200;
}

createNotification.validationScheme = {
    body: Joi.object({
        date: Joi.date().required(),
        text: Joi.string().required(),
        username: Joi.string().required(),
        status: Joi.string()
    })
};

const deleteNotification = async (ctx) => {
    await notificationService.deleteById(ctx.params.id);
    ctx.status = 204;
};

deleteNotification.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().required(),
    }),
};

module.exports = (app) => {
    const router = new Router({ prefix: "/notifications" });

    router.get(
        "/",
        /*requireAuthentication,*/
        validate(getAllNotifications.validationScheme),
        getAllNotifications
    );
    router.get(
        "/:id",
        /*requireAuthentication,*/
        validate(getNotificationById.validationScheme),
        getNotificationById
    );
    router.post(
        "/",
        /*requireAuthentication,*/
        validate(createNotification.validationScheme),
        createNotification
    );
    router.delete(
        "/:id",
        /*requireAuthentication,*/
        validate(deleteNotification.validationScheme),
        deleteNotification
    );

    app.use(router.routes()).use(router.allowedMethods());
};
