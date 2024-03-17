/**
 * @returns (object)
 */
async function getAll() {
    // TEMP: get from database
    let mockData = { 
        columns: {
            sequenceID: "String", 
            orderDate: "Date",
            netAmount: "Number", 
            taxAmount: "Number",
            totalAmount: "Number",
            paymentStatus: "String"
        },
        data: [
            { sequenceID: 47072, orderDate: "2020-02-14", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000,  paymentStatus: "pending" }, 
            { sequenceID: 47073, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 49121, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 49122, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 47076, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 47072, orderDate: "2020-02-14", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000,  paymentStatus: "pending" }, 
            { sequenceID: 47072, orderDate: "2020-02-14", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000,  paymentStatus: "pending" }, 
            { sequenceID: 47072, orderDate: "2020-02-14", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000,  paymentStatus: "pending" }, 
            { sequenceID: 47073, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 49121, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 49122, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 47076, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" }, 
            { sequenceID: 47073, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 49121, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 49122, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 47076, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 47073, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 49121, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 49122, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 47076, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 47072, orderDate: "2020-02-14", netAmount: 400000,   taxAmount: 80000,    totalAmount: 480000,  paymentStatus: "pending" }, 
            { sequenceID: 47073, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" },
            { sequenceID: 49121, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 49122, orderDate: "2020-02-14", netAmount: 6010800,  taxAmount: 1202200,  totalAmount: 7213000, paymentStatus: "received"},
            { sequenceID: 47076, orderDate: "2020-02-14", netAmount: 1710000,  taxAmount: 342000,   totalAmount: 2052000, paymentStatus: "pending" }, 
        ]
    };
    mockData["results"] = mockData.data.length;

    return mockData;
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
        currency: "EUR",
        netAmount: 123.213,
        taxAmount: 12.12,
        totalAmount: 135.333,
        lastPaymentNotificationDate: new Date().toDateString(),
        customerName: "John Doe",
        customerPhoneNr: 123456789,
        customerAddress: "Geraard de Duivelstraat 5 9000 Gent",
        products: {
            columns: ["product", "ordered", "stock", "unitPrice", "totalPrice", "currency"],
            data: [
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
                { product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76, currency: "EUR" },
            ]
        }
    };
}

module.exports = {
    getAll,
    getById
};
