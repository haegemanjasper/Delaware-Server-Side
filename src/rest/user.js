import * as userService from "../service/User";
import * as Joi from "joi";
import Router from "@koa/router";
import {validate} from "../core/validation";
import {requireAuthentication} from "../core/auth";

const getAllUsers = async (ctx) => {
    ctx.body = await userService.getAll();
};

getAllUsers.validationScheme = null;


const getUserByUsername = async (ctx) => {
    ctx.body = await userService.getByUsername(ctx.params.username);
};

getUserByUsername.validationScheme = {
    params: Joi.object({
        username: Joi.string().min(3).max(20)
    })
};


const updateUser = async (ctx) => {
    ctx.body = await userService.updateByUsername({ username: ctx.params.username, ...ctx.request.body });
};

updateUser.validationScheme = {
    params: Joi.object({
        username: Joi.string().min(3).max(20)
    }),
    body: Joi.object({
        email: Joi.string().email().max(50).optional(),
        password_hash: Joi.string().length(64).optional(),
        phone_nr: Joi.string().min(10).max(16).optional(),
        vat_nr: Joi.string().min(10).max(16).optional(),
        name: Joi.string().min(3).max(30).optional(),
        active: Joi.boolean().optional()
    })
};


const deleteUser = async (username) => {
    await userService.deleteByUsername(ctx.params.id);
};

deleteUser.validationScheme = {
    params: Joi.object({
        username: Joi.string().min(3).max(20)
    })
};


const register = async (ctx) => {
    ctx.body = await userService.register(ctx.request.body);
    ctx.status = 200;
};

register.validationScheme = {
    body: Joi.object({
        username: Joi.string().min(3).max(20),
        password: Joi.string().min(8),
        email: Joi.string().email()
    })
};


const login = async (ctx) => {
    const { email, password } = ctx.request.body;
    ctx.body = await userService.login(email, password);
};

login.validationScheme = {
    body: Joi.object({
        email: Joi.string().email(),
        password: Joi.string()
    })
};


export default (app) => {
    const router = new Router({ prefix: "/users" });

    router.post("/register", validate(register.validationScheme), register);
    router.post("/login", validate(login.validationScheme), login);

    router.get("/", requireAuthentication, validate(getAllUsers.validationScheme), getAllUsers);
    router.get("/:id", requireAuthentication, validate(getUserByUsername.validationScheme), getUserByUsername);
    router.put("/:id", requireAuthentication, validate(updateUser.validationScheme), updateUser);
    router.delete("/:id", requireAuthentication, validate(deleteUser.validationScheme), deleteUser);

    app.use(router.routes()).use(router.allowedMethods());
};