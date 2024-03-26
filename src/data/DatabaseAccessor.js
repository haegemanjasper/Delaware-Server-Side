const {PrismaClient} = require("@prisma/client");
const {getLogger} = require("../core/logging");

const prisma = new PrismaClient();

const databaseOnline = async () => {
    try {
        await prisma.$connect();
        return true;
    } catch {
        return false;
    }
};

const disconnect = async () => {
    getLogger().info("Closing database connections");
    await prisma.$disconnect();
    getLogger().info("Closed all database connections.");
};

module.exports = {
    prisma,
    databaseOnline,
    disconnect
};