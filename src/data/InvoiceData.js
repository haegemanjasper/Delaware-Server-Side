const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 * @param invoice { null | { InvoiceId: number, InvoiceDate: Date, InvoiceAmount: number, BankDetails: string, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { invoice_date: Date, updated_at: Date, bank_details: string, invoice_id: number, created_at: Date, active: boolean, invoice_amount: number } }
 */
const mapPrismaType = (invoice) => (
    invoice === null ? undefined : {
        invoice_id: invoice.InvoiceId,
        invoice_date: invoice.InvoiceDate,
        invoice_amount: invoice.InvoiceAmount,
        bank_details: invoice.BankDetails,
        created_at: invoice.CreatedAt,
        updated_at: invoice.UpdatedAt,
        active: invoice.IsActive
    }
);

/**
 * @returns {Promise<({invoice_date: Date, updated_at: Date, bank_details: string, invoice_id: number, created_at: Date, active: boolean, invoice_amount: number}|undefined)[]>}
 */
const getAllInvoices = async () => {
    const invoices = await prisma.invoices.findMany();
    return invoices.map((invoice) => mapPrismaType(invoice));
};

/**
 *
 * @param id{number}
 * @returns {Promise<{invoice_date: Date, updated_at: Date, bank_details: string, invoice_id: number, created_at: Date, active: boolean, invoice_amount: number}|undefined>}
 */
const getInvoiceById = async (id) => {
    const invoice = await prisma.invoices.findFirst({
        where: { InvoiceId: id }
    });

    return mapPrismaType(invoice);
};

/**
 *
 * @param id{number}
 * @returns {Promise<boolean>}
 */
const deleteInvoice = async (id) => {
    const invoice = await getInvoiceById(id);

    if (invoice === undefined) {
        getLogger().warning(`Tried deleting nonexistent invoice ${id}`);
        return false;
    }

    await prisma.invoices.delete({
        where: { InvoiceId: id }
    });

    return true;
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    deleteInvoice
};