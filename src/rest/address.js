const addressService = require("../service/address");
const Joi = require("joi");
const Router = require("@koa/router");
const { validate } = require("../core/validation");
const { requireAuthentication } = require("../core/auth");

const getAllAddresses = async (ctx) => {
    ctx.body = await addressService.getAll();
};

getAllAddresses.validationScheme = null;

const getAddressById = async (ctx) => {
    ctx.body = await addressService.getById(ctx.params.id);
};

getAddressById.validationScheme = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

const getAddressByUsername = async (ctx) => {
    ctx.body = await addressService.getByUsername(ctx.params.username);
};

getAddressByUsername.validationScheme = {
    params: Joi.object({
        username: Joi.string().required(),
    }),
};

const deleteAddress = async (ctx) => {
    await addressService.delete(ctx.params.id);
    ctx.status = 204;
};

deleteAddress.validationScheme = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

module.exports = (app) => {
    const router = new Router({ prefix: "/addresses" });

    router.get(
        "/",
        /*requireAuthentication,*/
        validate(getAllAddresses.validationScheme),
        getAllAddresses
    );
    router.get(
        "/:id",
        /*requireAuthentication,*/
        validate(getAddressById.validationScheme),
        getAddressById
    );
    router.delete(
        "/:id",
        /*requireAuthentication,*/
        validate(deleteAddress.validationScheme),
        deleteAddress
    );
    router.get(
        "/username/:username",
        validate(getAddressByUsername.validationScheme),
        getAddressByUsername
    );

    app.use(router.routes()).use(router.allowedMethods());
};
