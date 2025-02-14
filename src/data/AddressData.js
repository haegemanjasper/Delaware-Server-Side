const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 * Maps a Prisma address type to a type that makes a bit more sense to work with.
 * @param address { null | { AddressId: number, Street: string, ZipCode: number, City: string, Country: string, Username: string, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { country: string, updated_at: Date, city: string, street: string, address_id: number, created_at: Date, active: boolean, zip_code: number, username: string } }
 */
const mapPrismaType = (address) => (
    address === null ? undefined : {
        address_id: address.AddressId,
        street: address.Street,
        zip_code: address.ZipCode,
        city: address.City,
        country: address.Country,
        username: address.Username,
        created_at: address.CreatedAt,
        updated_at: address.UpdatedAt,
        active: address.IsActive
    }
);

/**
 * @returns {Promise<({country: string, updated_at: Date, city: string, street: string, address_id: number, created_at: Date, active: boolean, zip_code: number, username: string}|undefined)[]>}
 */
const getAllAddresses = async () => {
    const addresses = await prisma.addresses.findMany({});
    return addresses.map((address) => mapPrismaType(address));
};

const getAddressById = async (id) => {
    addressId = parseInt(id);
    const address = await prisma.addresses.findFirst({
        where: { AddressId: addressId }
    });

    return mapPrismaType(address);
};

const getAddressByUsername = async (username) => {
    const address = await prisma.addresses.findFirst({
        where: { Username: username }
    });

    return mapPrismaType(address);
};

/**
 * @param id { number }
 * @returns {Promise<boolean>}
 */
const deleteAddress = async (id) => {
    const address = await getAddressById(id);

    if (address === undefined) {
        getLogger().warning(`Tried deleting nonexistent address ${id}`);
        return false;
    }

    await prisma.addresses.delete({
        where: { AddressId: id }
    });

    return true;
};

module.exports = {
    getAllAddresses,
    getAddressById,
    deleteAddress,
    getAddressByUsername
};