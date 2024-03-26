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

const createNotification = async (ctx) => {
    ctx.body = await notificationService.create(ctx.request.body);
    ctx.status = 201;
};

createNotification.validationScheme = {
    body: Joi.object({
        message: Joi.string().required(),
        userId: Joi.string().required(),
    }),
};

const deleteNotification = async (ctx) => {
    await notificationService.delete(ctx.params.id);
    ctx.status = 204; // No Content
};

deleteNotification.validationScheme = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

module.exports = (app) => {
    const router = new Router({ prefix: "/notifications" });

    router.get(
        "/",
        requireAuthentication,
        validate(getAllNotifications.validationScheme),
        getAllNotifications
    );
    router.get(
        "/:id",
        requireAuthentication,
        validate(getNotificationById.validationScheme),
        getNotificationById
    );
    router.post(
        "/",
        requireAuthentication,
        validate(createNotification.validationScheme),
        createNotification
    );
    router.delete(
        "/:id",
        requireAuthentication,
        validate(deleteNotification.validationScheme),
        deleteNotification
    );

    app.use(router.routes()).use(router.allowedMethods());
};
