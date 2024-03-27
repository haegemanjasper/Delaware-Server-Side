const {
    createNotification,
    deleteNotification,
    getAllNotifications,
    getNotificationById,
} = require("../data/NotificationData");
const ServiceError = require("../core/serviceError");
const { not } = require("joi");

const notificationCallbacks = [];

const startListeningForNotifications = (callback) => {
    notificationCallbacks.push(callback);
};

const sendNotificationToUsers = (notification) => {
    notificationCallbacks.forEach((callback) => callback(notification));
};

/**
 * Haalt alle notificaties op.
 * @returns {Promise<{count: number, items: ({id: string, message: string, userId: string, createdAt: string, updatedAt: string}|undefined)[]}>}
 */
const getAll = async () => {
    const notifications = await getAllNotifications();
    return { items: notifications, count: notifications.length };
};

/**
 * Haalt een notificatie op aan de hand van de ID.
 * @param id {string} De ID van de notificatie.
 * @returns {Promise<{id: string, message: string, userId: string, createdAt: string, updatedAt: string}>}
 * @throws ServiceError als de notificatie niet gevonden kan worden.
 */
const getById = async (id) => {
    const notification = await getNotificationById(id);
    if (!notification)
        throw ServiceError.notFound(`Notification with ID '${id}' not found`);
    return notification;
};

/**
 * Creëert een nieuwe notificatie.
 * @param notification {object} De notificatiegegevens.
 * @returns {Promise<{id: string, message: string, userId: string, createdAt: string, updatedAt: string}>}
 */
const create = async (notification) => {
    return await createNotification(notification);
};

/**
 * Verwijdert een notificatie.
 * @param id {string} De ID van de notificatie die verwijderd moet worden.
 * @returns {Promise<void>}
 * @throws ServiceError als de notificatie niet gevonden kan worden.
 */
const deleteById = async (id) => {
    const success = await deleteNotification(id);
    if (!success)
        throw ServiceError.notFound(`Notification with ID '${id}' not found`);
};

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    startListeningForNotifications,
    sendNotificationToUsers,
};
