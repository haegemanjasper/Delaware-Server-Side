import {PrismaClient} from "@prisma/client";
import {getLogger} from "../core/logging";

export const prisma = new PrismaClient();

export const databaseOnline = async () => {
    try {
        await prisma.$connect();
        return true;
    } catch {
        return false;
    }
};

export const disconnect = async () => {
    getLogger().info("Closing database connections");
    await prisma.$disconnect();
    getLogger().info("Closed all database connections.");
};