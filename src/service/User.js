const {createUser, deleteUser, getAllUsers, getUserByEmail, getUserByUsername, updateUser} = require("../data/UserData");
const ServiceError = require("../core/serviceError");
const {hash} = require("argon2");
const {getLogger} = require("../core/logging");
const {generateJWT, verifyJWT} = require("../core/jwt");
const {verifyPassword} = require("../core/password");

/**
 * Gets all users, without their password hash.
 * @returns {Promise<{count: number, items: ({vat_nr: string, updated_at: string, phone_nr: string, name: string, created_at: string, active: boolean, email: string, username: string}|undefined)[]}>}
 */
const getAll = async () => {
    const users = await getAllUsers();
    users.map(user => delete user.password_hash);

    return { items: users, count: users.length };
};

/**
 * Gets a user, based on its username. Does not include the password hash.
 * @param username {string} The username.
 * @returns {Promise<{username: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean}>}
 * @throws ServiceError if the username does not resolve to a valid User.
 */
const getByUsername = async (username) => {
    const user = await getUserByUsername(username);

    if (user === undefined) throw ServiceError.notFound(`A user with username '${username}' could not be found`);

    delete user.password_hash;
    return user;
};

/**
 * Creates a new User.
 * @param user { { username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string } }
 * @returns {Promise<{username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean}|undefined>}
 */
const create = async (user) => await createUser(user);

/**
 * Updates a user
 * @param user {{ username?: string, password_hash?: string, email?: string, phone_nr?: string, vat_nr?: string, name?: string } }
 * @returns {Promise<{username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean}|undefined>}
 */
const updateByUsername = async (user) => {
    const user2 = await getByUsername(user.username);
    return await updateUser(user2.username, { ...user });
};

/**
 * Deletes a user
 * @param username {string}
 * @returns {Promise<void>}
 * @throws ServiceError when the username cannot be resolved to a valid user.
 */
const deleteByUsername = async (username) => {
    const success = await deleteUser(username);
    if (!success) throw ServiceError.notFound(`A User with username '${username}' could not be found`);
};

const register = async (user) => {
    const password_hash = await hash(user.password);

    const user2 = await createUser({ password_hash, ...user });

    if (user2 === undefined) {
        getLogger().error("Something went wrong!");
        throw ServiceError.unauthorized("Failed to create user!");
    }

    return await makeLoginData(user2);
};

const makeExposedUser = ({ username, email, phone_nr, vat_nr, name, active }) => ({ username, email, phone_nr, vat_nr, name, active });

const makeLoginData = async (user) => {
    const token = await generateJWT(user);
    return {
        user: makeExposedUser({ ...user }),
        token
    };
};

const login = async (email, password) => {
    const user = await getUserByEmail(email);

    if (user === undefined) throw ServiceError.unauthorized("The given email and/or password is incorrect.");

    const passwordValid = await verifyPassword(password, user.password_hash);

    if (!passwordValid) throw ServiceError.unauthorized("The given email and/or password is incorrect.");

    return await makeLoginData(user);
};

const checkAndParseSession = async (header) => {
    if (header === undefined) throw ServiceError.unauthorized("You need to be signed in.");
    if (!header.startsWith("Bearer ")) throw ServiceError.unauthorized("Invalid authentication token.");

    const token = header.substring(7);

    try {
        const { username } = await verifyJWT(token);
        return { username, token };
    } catch (error) {
        getLogger().error(error.message, { error });
        throw new Error(error.message);
    }
};

module.exports = {
    getAll,
    getByUsername,
    create,
    updateByUsername,
    deleteByUsername,
    register,
    makeExposedUser,
    makeLoginData,
    login,
    checkAndParseSession
};
