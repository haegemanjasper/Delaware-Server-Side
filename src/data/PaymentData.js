const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 * Maps a Prisma payment to a type that makes a bit more sense to work with.
 * @param payment { PaymentId: number, PaymentDate: Date, PaymentAmount: number, PaymentMethod: number, InvoiceId: number, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean }
 * @returns { undefined | { updated_at: Date, payment_id: number, payment_amount: number, invoice_id: number, created_at: Date, active: boolean, payment_date: Date, payment_method: number } }
 */
const mapPrismaType = (payment) => (
    payment === null ? undefined : {
        payment_id: payment.PaymentId,
        payment_date: payment.PaymentDate,
        payment_amount: payment.PaymentAmount,
        payment_method: payment.PaymentMethod,
        invoice_id: payment.InvoiceId,
        created_at: payment.CreatedAt,
        updated_at: payment.UpdatedAt,
        active: payment.IsActive
    }
);

/**
 * @returns {Promise<({updated_at: Date, payment_id: number, payment_amount: number, invoice_id: number, created_at: Date, active: boolean, payment_date: Date, payment_method: number}|undefined)[]>}
 */
const getAllPayments = async () => {
    const payments = await prisma.payments.findMany();
    return payments.map((payment) => mapPrismaType(payment));
};

/**
 *
 * @param id {number}
 * @returns {Promise<{updated_at: Date, payment_id: number, payment_amount: number, invoice_id: number, created_at: Date, active: boolean, payment_date: Date, payment_method: number}|undefined>}
 */
const getPaymentById = async (id) => {
    const payment = await prisma.payments.findFirst({
        where: { PaymentId: id }
    });

    return mapPrismaType(payment);
};

/**
 *
 * @param id{number}
 * @returns {Promise<boolean>}
 */
const deletePayment = async (id) => {
    const payment = await getPaymentById(id);

    if (payment === undefined) {
        getLogger().warning(`Tried deleting nonexistent payment ${id}`);
        return false;
    }

    await prisma.payments.delete({
        where: { PaymentId: id }
    });

    return true;
};

module.exports = {
    getAllPayments,
    getPaymentById,
    deletePayment
};