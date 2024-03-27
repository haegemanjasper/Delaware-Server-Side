const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 * @param notification { null | { NotificationId: number, Date: Date, Text: string, Status: string, Username: string, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { date: Date, updated_at: Date, created_at: Date, active: boolean, notification_id: number, text: string, status: string, username: string } }
 */
const mapPrismaType = (notification) => (
    notification === null ? undefined : {
        notification_id: notification.NotificationId,
        date: notification.Date,
        text: notification.Text,
        status: notification.Status,
        username: notification.Username,
        created_at: notification.CreatedAt,
        updated_at: notification.UpdatedAt,
        active: notification.IsActive
    }
);

/**
 *
 * @returns {Promise<({date: Date, updated_at: Date, created_at: Date, active: boolean, notification_id: number, text: string, status: string, username: string}|undefined)[]>}
 */
const getAllNotifications = async () => {
    const notifications = await prisma.notifications.findMany();
    return notifications.map((notification) => mapPrismaType(notification));
};

/**
 *
 * @param id{number}
 * @returns {Promise<{date: Date, updated_at: Date, created_at: Date, active: boolean, notification_id: number, text: string, status: string, username: string}|undefined>}
 */
const getNotificationById = async (id) => {
    const notification = await prisma.notifications.findFirst({
        where: { NotificationId: id }
    });

    return mapPrismaType(notification);
};

/**
 * @param date{Date}
 * @param text{string}
 * @param status{string}
 * @param username{string}
 * @returns {Promise<{date: Date, updated_at: Date, created_at: Date, active: boolean, notification_id: number, text: string, status: string, username: string}|undefined>}
 */
const createNotification = async (date, text, status, username) => {
    const notification = await prisma.notifications.create({
        data: {
            Date: date,
            Text: text,
            Status: status,
            Username: username
        }
    });

    return mapPrismaType(notification);
};

/**
 *
 * @param id{number}
 * @returns {Promise<boolean>}
 */
const deleteNotification = async (id) => {
    const notification = getNotificationById(id);

    if (notification === undefined) {
        getLogger().warning(`Tried deleting nonexistent notification ${id}`);
        return false;
    }

    await prisma.notifications.delete({
        where: { NotificationId: id }
    });

    return true;
};

module.exports = {
    getAllNotifications,
    getNotificationById,
    deleteNotification
};