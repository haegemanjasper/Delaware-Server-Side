const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 * Maps a Prisma order type to a type that makes a bit more sense to work with.
 * @param order { null | { OrderId: number, OrderDate: Date, DeliveryDate: Date, Status: string, PaymentStatus: string, OrderReference: string, NetAmount: number, TaxAmount: number, TotalAmount: number, Currency: string, InvoiceId: number, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { tax_amount: number, order_reference: string, payment_status: string, created_at: Date, active: boolean, order_date: Date, delivery_date: Date, updated_at: Date, total_amount: number, invoice_id: number, currency: string, net_amount: number, order_id: number, status: string } }
 */
const mapPrismaType = (order) => (
    order === null ? undefined : {
        order_id: order.OrderId,
        order_date: order.OrderDate,
        delivery_date: order.DeliveryDate,
        status: order.Status,
        payment_status: order.PaymentStatus,
        order_reference: order.OrderReference,
        net_amount: order.NetAmount,
        tax_amount: order.TaxAmount,
        total_amount: order.TotalAmount,
        currency: order.Currency,
        invoice_id: order.InvoiceId,
        created_at: order.CreatedAt,
        updated_at: order.UpdatedAt,
        active: order.IsActive
    }
);

/**
 * @returns {Promise<({tax_amount: number, order_reference: string, payment_status: string, created_at: Date, active: boolean, order_date: Date, delivery_date: Date, updated_at: Date, total_amount: number, invoice_id: number, currency: string, net_amount: number, order_id: number, status: string}|undefined)[]>}
 */
const getAllOrders = async () => {
    const orders = await prisma.orders.findMany();
    return orders.map((order) => mapPrismaType(order));
};

/**
 * @param id{number}
 * @returns {Promise<{tax_amount: number, order_reference: string, payment_status: string, created_at: Date, active: boolean, order_date: Date, delivery_date: Date, updated_at: Date, total_amount: number, invoice_id: number, currency: string, net_amount: number, order_id: number, status: string}|undefined>}
 */
const getOrderById = async (id) => {
    const order = await prisma.orders.findFirst({
        where: { OrderId: id }
    });

    return mapPrismaType(order);
};

/**
 * @param id{number}
 * @returns {Promise<boolean>}
 */
const deleteOrder = async (id) => {
    const order = await getOrderById(id);

    if (order === undefined) {
        getLogger().warning(`Tried deleting nonexistent order ${id}`);
        return false;
    }

    await prisma.orders.delete({
        where: { OrderId: id }
    });

    return true;
};

module.exports = {
    getAllOrders,
    getOrderById,
    deleteOrder
};