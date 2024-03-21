const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

const mapPrismaType = (paymentRequest) => (
    paymentRequest === null ? undefined : {

    }
);

const getAllPaymentsRequests = async () => {
    const paymentRequests = await prisma.paymentRequests.findMany();
    return paymentRequests.map((paymentRequest) => mapPrismaType(paymentRequest));
};

const getPaymentRequestById = async (id) => {
    const paymentRequest = await prisma.paymentRequests.findFirst({
        where: { PaymentRequestId: id }
    });

    return mapPrismaType(paymentRequest);
};

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