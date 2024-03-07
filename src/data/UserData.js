import {prisma} from "./DatabaseAccessor";
import {getLogger} from "../core/logging";

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
        active: user.IsActive
    }
);

export const getAllUsers = async () => {
    const users = await prisma.users.findMany();
    return users.map((user)=> mapPrismaType(user));
};

export const getUserByUsername = async (username) => {
    const user = await prisma.users.findFirst({
        where: { Username: username }
    });

    return mapPrismaType(user);
};

export const getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: { Email: email }
    });

    return mapPrismaType(user);
};

export const getUserByVat = async (vat) => {
    const user = await prisma.users.findFirst({
        where: { VatNr: vat }
    });
};

export const createUser = async ({ username, password_hash, email, phone_nr, vat_nr, name }) => {
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

export const updateUser = async (username, { password_hash, email, phone_nr, vat_nr, name }) => {
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

export const deleteUser = async (username) => {
    const user = await getUserByUsername(username);

    if (user === undefined) {
        getLogger().warning(`Tried deleting nonexistent user ${username}`);
        return false;
    }

    await prisma.users.delete({
        where: { Username: username }
    });
};