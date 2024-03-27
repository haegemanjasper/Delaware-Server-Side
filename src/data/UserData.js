const {prisma} = require("./DatabaseAccessor");
const {getLogger} = require("../core/logging");

/**
 * Maps a Prisma user type to a type that makes a bit more sense to work with.
 * @param user { any | null | { Username: string, PasswordHash: string, Email: string, PhoneNr: string, VatNr: String, Name: String, CreatedAt: string, UpdatedAt: string, IsActive: boolean, Role: string } }
 * @returns {undefined|{vat_nr, updated_at, phone_nr, password_hash, name, created_at, active, email, username, role}}
 */
const mapPrismaType = (user) => (
    user === null ? undefined : {
        username: user.Username,
        password_hash: user.PasswordHash,
        email: user.Email,
        phone_nr: user.PhoneNr,
        vat_nr: user.VatNr,
        name: user.Name,
        created_at: user.CreatedAt,
        updated_at: user.UpdatedAt,
        active: user.IsActive,
        role: user.Role
    }
);

/**
 * Gets all Users.
 * @returns {Promise<({vat_nr: string, updated_at: string, phone_nr: string, password_hash: string, name: string, created_at: string, active: boolean, email: string, username: string, role: string}|undefined)[]>}
 */
const getAllUsers = async () => {
    const users = await prisma.users.findMany();
    return users.map((user)=> mapPrismaType(user));
};

/**
 * Gets a user based on its username
 * @param username {string} The username.
 * @returns { Promise<undefined | { username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean, role: string }>}
 */
const getUserByUsername = async (username) => {
    const user = await prisma.users.findFirst({
        where: { Username: username }
    });

    return mapPrismaType(user);
};

/**
 * Gets a user based on its email address
 * @param email {string} The email address.
 * @returns { Promise<undefined | { username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean, role: string }>}
 */
const getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: { Email: email }
    });

    return mapPrismaType(user);
};

/**
 * Gets a user based on its VAT number
 * @param vat {string} The VAT number.
 * @returns { Promise<undefined | { username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean, role: string }>}
 */
const getUserByVat = async (vat) => {
    const user = await prisma.users.findFirst({
        where: { VatNr: vat }
    });

    return mapPrismaType(user);
};

/**
 * Creates a new User.
 * @param username {string}
 * @param password_hash {string}
 * @param email {string}
 * @param phone_nr {string}
 * @param vat_nr {string}
 * @param name {string}
 * @param role {string}
 * @returns { Promise<undefined | { username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean, role: string }>}
 */
const createUser = async ({ username, password_hash, email, phone_nr, vat_nr, name }) => {
    const user = await prisma.users.create({
        data: {
            Username: username,
            PasswordHash: password_hash,
            Email: email,
            PhoneNr: phone_nr,
            VatNr: vat_nr,
            Name: name
        }
    });

    getLogger().info(`Created a new User, username ${username}`);
    return mapPrismaType(user);
};

/**
 * Updates a user.
 * @param username {string}
 * @param password_hash {string}
 * @param email {string}
 * @param phone_nr {string}
 * @param vat_nr {string}
 * @param name {string}
 * @param role {string}
 * @returns { Promise<undefined | { username: string, password_hash: string, email: string, phone_nr: string, vat_nr: string, name: string, created_at: string, updated_at: string, active: boolean, role: string }>}
 */
const updateUser = async (username, { password_hash, email, phone_nr, vat_nr, name }) => {
    const user = await getUserByUsername(username);

    if (user === undefined) {
        getLogger().error(new Error("A valid user must be specified!"));
        return undefined;
    }

    const updateData = {
        where: { Username: user.username },
        data: {
            PasswordHash: password_hash ?? user.password_hash,
            Email: email ?? user.email,
            PhoneNr: phone_nr ?? user.phone_nr,
            VatNr: vat_nr ?? user.vat_nr,
            Name: name ?? user.name
        }
    };

    const updated = await prisma.users.update(updateData);
    return mapPrismaType(updated);
};

/**
 * Deletes a user based on its username
 * @param username The username.
 * @returns {Promise<boolean>}
 */
const deleteUser = async (username) => {
    const user = await getUserByUsername(username);

    if (user === undefined) {
        getLogger().warning(`Tried deleting nonexistent user ${username}`);
        return false;
    }

    await prisma.users.delete({
        where: { Username: username }
    });
};

module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserByEmail,
    getUserByVat,
    createUser,
    updateUser,
    deleteUser
};