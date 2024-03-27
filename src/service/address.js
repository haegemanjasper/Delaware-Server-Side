const {
    deleteAddress,
    getAllAddresses,
    getAddressById,
    getAddressByUsername,
} = require("../data/AddressData");
const ServiceError = require("../core/serviceError");
const { not } = require("joi");

/**
 * Haalt alle adressen op.
 * @returns {Promise<{count: number, items: ({country: string, updated_at: Date, city: string, street: string, address_id: number, created_at: Date, active: boolean, zip_code: number, username: string}|undefined)[]}>}
 */
const getAll = async () => {
    const addresses = await getAllAddresses();
    return { items: addresses, count: addresses.length };
};

/**
 * Haalt een adres op aan de hand van de ID.
 * @param id {string} De ID van het adres.
 * @returns {Promise<{country: string, updated_at: Date, city: string, street: string, address_id: number, created_at: Date, active: boolean, zip_code: number, username: string}>}
 * @throws ServiceError als het adres niet gevonden kan worden.
 */
const getById = async (id) => {
    const address = await getAddressById(id);
    if (!address)
        throw ServiceError.notFound(`address with ID '${id}' not found`);
    return address;
};

const getByUsername = async (username) => {
    const address = await getAddressByUsername(username);
    if (!address)
        throw ServiceError.notFound(`address with username '${username}' not found`);
    return address;

};

/**
 * Verwijdert een adres.
 * @param id {string} De ID van het adres die verwijderd moet worden.
 * @returns {Promise<void>}
 * @throws ServiceError als het adres niet gevonden kan worden.
 */
const deleteById = async (id) => {
    const success = await deleteAddress(id);
    if (!success)
        throw ServiceError.notFound(`address with ID '${id}' not found`);
};

module.exports = {
    getAll,
    getById,
    deleteById,
    getByUsername
};
