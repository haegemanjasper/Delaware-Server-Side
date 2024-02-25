const config = require("config");
const argon2 = require("argon2");

const ARGON_SALT_LENGTH = config.get("auth.argon.saltLength");
const ARGON_HASH_LENGTH = config.get("auth.argon.hashLength");
const ARGON_TIME_COST = config.get("auth.argon.timeCost");
const ARGON_MEMORY_COST = config.get("auth.argon.memoryCost");

/**
 * Hashes the given password.
 *
 * @param {string} password - The password that will be hashed.
 * @returns {string} - The hashed password.
 */
async function hashPassword(password) {
    const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id,
        saltLength: ARGON_SALT_LENGTH,
        hashLength: ARGON_HASH_LENGTH,
        timeCost: ARGON_TIME_COST,
        memoryCost: ARGON_MEMORY_COST,
    });

    return passwordHash;
}

/**
 * Verifies the given password.
 *
 * @param {string} password - Unhashed password to verify.
 * @param {string} passwordHash - The hash to compare the password to.
 * @returns {boolean} - True if the given password matches the passwordHash.
 */
async function verifyPassword(password, passwordHash) {
    const valid = await argon2.verify(passwordHash, password, {
        type: argon2.argon2id,
        saltLength: ARGON_SALT_LENGTH,
        hashLength: ARGON_HASH_LENGTH,
        timeCost: ARGON_TIME_COST,
        memoryCost: ARGON_MEMORY_COST,
    });

    return valid;
}

module.exports = {
    hashPassword,
    verifyPassword,
};
