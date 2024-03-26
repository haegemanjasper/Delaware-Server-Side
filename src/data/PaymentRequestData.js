const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 *
 * @param paymentRequest { null | { PaymentRequestId: number, PaymentRequestDate: Date, PaymentRequestAmount: number, BankDetails: string, OrderId: number, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { payment_request_amount: number, bank_details: string, payment_request_date: Date, payment_request_id: number, order_id: number, created_at: Date, updated_at: Date, active: boolean } }
 */
const mapPrismaType = (paymentRequest) => (
    paymentRequest === null ? undefined : {
        payment_request_id: paymentRequest.PaymentRequestId,
        payment_request_date: paymentRequest.PaymentRequestDate,
        payment_request_amount: paymentRequest.PaymentRequestAmount,
        bank_details: paymentRequest.BankDetails,
        order_id: paymentRequest.OrderId,
        created_at: paymentRequest.CreatedAt,
        updated_at: paymentRequest.UpdatedAt,
        active: paymentRequest.IsActive
    }
);

/**
 *
 * @returns {Promise<({payment_request_amount: number, bank_details: string, payment_request_date: Date, payment_request_id: number, order_id: number, created_at: Date, updated_at: Date, active: boolean}|undefined)[]>}
 */
const getAllPaymentsRequests = async () => {
    const paymentRequests = await prisma.paymentRequests.findMany();
    return paymentRequests.map((paymentRequest) => mapPrismaType(paymentRequest));
};

/**
 *
 * @param id{number}
 * @returns {Promise<{payment_request_amount: number, bank_details: string, payment_request_date: Date, payment_request_id: number, order_id: number, created_at: Date, updated_at: Date, active: boolean}|undefined>}
 */
const getPaymentRequestById = async (id) => {
    const paymentRequest = await prisma.paymentRequests.findFirst({
        where: { PaymentRequestId: id }
    });

    return mapPrismaType(paymentRequest);
};

/**
 *
 * @param id{number}
 * @returns {Promise<boolean>}
 */
const deletePaymentRequest = async (id) => {
    const paymentRequest = getPaymentRequestById(id);

    if (paymentRequest === undefined) {
        getLogger().warning(`Tried deleting nonexistent payment request ${id}`);
        return false;
    }

    await prisma.paymentRequests.delete({
        where: { PaymentRequestId: id }
    });

    return true;
};

module.exports = {
    getAllPaymentsRequests,
    getPaymentRequestById,
    deletePaymentRequest
};