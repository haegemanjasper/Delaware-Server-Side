/**
 * @returns (object)
 */
async function getAll() {
    // TEMP: get from database
    return { 
        columns: ["orderID", "orderDate", "netAmount", "taxAmount", "totalAmount", "currency", "paymentStatus"],
        data: [
            { orderID: 47072, orderDate: "2020-02-14 08:05:01.0000000", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000 , currency: "EUR", paymentStatus: "pending" }, 
            { orderID: 47073, orderDate: "2020-02-14 08:05:09.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 49121, orderDate: "2020-02-14 15:58:15.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 49122, orderDate: "2020-02-14 15:58:20.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 47076, orderDate: "2020-02-14 08:05:26.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 47072, orderDate: "2020-02-14 08:05:01.0000000", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000 , currency: "EUR", paymentStatus: "pending" }, 
            { orderID: 47072, orderDate: "2020-02-14 08:05:01.0000000", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000 , currency: "EUR", paymentStatus: "pending" }, 
            { orderID: 47072, orderDate: "2020-02-14 08:05:01.0000000", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000 , currency: "EUR", paymentStatus: "pending" }, 
            { orderID: 47073, orderDate: "2020-02-14 08:05:09.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 49121, orderDate: "2020-02-14 15:58:15.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 49122, orderDate: "2020-02-14 15:58:20.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 47076, orderDate: "2020-02-14 08:05:26.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" }, 
            { orderID: 47073, orderDate: "2020-02-14 08:05:09.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 49121, orderDate: "2020-02-14 15:58:15.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 49122, orderDate: "2020-02-14 15:58:20.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 47076, orderDate: "2020-02-14 08:05:26.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 47073, orderDate: "2020-02-14 08:05:09.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 49121, orderDate: "2020-02-14 15:58:15.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 49122, orderDate: "2020-02-14 15:58:20.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 47076, orderDate: "2020-02-14 08:05:26.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 47072, orderDate: "2020-02-14 08:05:01.0000000", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000 , currency: "EUR", paymentStatus: "pending" }, 
            { orderID: 47073, orderDate: "2020-02-14 08:05:09.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" },
            { orderID: 49121, orderDate: "2020-02-14 15:58:15.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 49122, orderDate: "2020-02-14 15:58:20.0000000", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, currency: "EUR", paymentStatus: "received"},
            { orderID: 47076, orderDate: "2020-02-14 08:05:26.0000000", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, currency: "EUR", paymentStatus: "pending" }, 
        ]};
}

/**
 * @param (object) - The requested order id.
 * @returns (object) - 
 */
async function getById(id) {
    // TEMP: get from database
    return {
        orderDate: new Date().toDateString(),
        deliveryAddress: "Geraard de Duivelstraat 5 9000 Gent",
        orderStatus: "received",
        paymentStatus: "pending",
        netAmount: 123.213,
        taxAmount: 12.12,
        totalAmount: 135.333,
        lastPaymentNotificationDate: new Date().toDateString(),
        customerName: "John Doe",
        customerPhoneNr: 123456789,
        customerAddress: "Geraard de Duivelstraat 5 9000 Gent",
        products: {
            columns: ["product", "ordered", "stock", "unitPrice", "totalPrice"],
            data: [
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
            ]
        }
    };
}

module.exports = {
    getAll,
    getById
};
