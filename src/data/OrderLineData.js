const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 * @param orderLine { null | { OrderLineId: number, Quantity: number, OrderId: number, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { quantity: number, updated_at: Date, created_at: Date, active: boolean, order_line_id: number, order_id: number } }
 */
const mapPrismaType = (orderLine) => (
    orderLine === null ? undefined : {
        order_line_id: orderLine.OrderLineId,
        quantity: orderLine.Quantity,
        order_id: orderLine.OrderId,
        created_at: orderLine.CreatedAt,
        updated_at: orderLine.UpdatedAt,
        active: orderLine.IsActive
    }
);

/**
 *
 * @returns {Promise<({quantity: number, updated_at: Date, created_at: Date, active: boolean, order_line_id: number, order_id: number}|undefined)[]>}
 */
const getAllOrderLines = async () => {
    const orderLines = await prisma.orderLines.findMany();
    return orderLines.map((orderLine) => mapPrismaType(orderLine));
};

/**
 *
 * @param id{number}
 * @returns {Promise<{quantity: number, updated_at: Date, created_at: Date, active: boolean, order_line_id: number, order_id: number}|undefined>}
 */
const getOrderLineById = async (id) => {
    const orderLine = await prisma.orderLines.findFirst({
        where: { OrderLineId: id }
    });

    return mapPrismaType(orderLine);
};

/**
 *
 * @param id{number}
 * @returns {Promise<boolean>}
 */
const deleteOrderLine = async (id) => {
    const orderLine = getOrderLineById(id);

    if (orderLine === undefined) {
        getLogger().warning(`Tried deleting nonexistent orderline ${id}`);
        return false;
    }

    await prisma.orderLines.delete({
        where: { OrderLineId: id }
    });

    return true;
};

module.exports = {
    getAllOrderLines,
    getOrderLineById,
    deleteOrderLine
};