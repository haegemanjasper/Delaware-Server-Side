/**
 * @returns (object)
 */
async function getAll(limit, offset, filter, sort) {
    // TEMP: get from database
    let mockData = { 
        columns: {
            sequenceID: "String", 
            orderDate: "Date",
            net: "Number", 
            VAT: "Number",
            total: "Number",
            paymentStatus: "String"
        },
        data: [
            { id: 1,  sequenceID: 47072, orderDate: "2020-02-14", net: 400000,   VAT: 80000,    total: 480000,  paymentStatus: "pending" }, 
            { id: 2,  sequenceID: 47073, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 3,  sequenceID: 49121, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 4,  sequenceID: 49122, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 5,  sequenceID: 47076, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 6,  sequenceID: 47072, orderDate: "2020-02-14", net: 400000,   VAT: 80000,    total: 480000,  paymentStatus: "pending" }, 
            { id: 7,  sequenceID: 47072, orderDate: "2020-02-14", net: 400000,   VAT: 80000,    total: 480000,  paymentStatus: "pending" }, 
            { id: 8,  sequenceID: 47072, orderDate: "2020-02-14", net: 400000,   VAT: 80000,    total: 480000,  paymentStatus: "pending" }, 
            { id: 9,  sequenceID: 47073, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 10, sequenceID: 49121, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 11, sequenceID: 49122, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 12, sequenceID: 47076, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" }, 
            { id: 13, sequenceID: 47073, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 14, sequenceID: 49121, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 15, sequenceID: 49122, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 16, sequenceID: 47076, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 17, sequenceID: 47073, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 18, sequenceID: 49121, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 19, sequenceID: 49122, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 20, sequenceID: 47076, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 21, sequenceID: 47072, orderDate: "2020-02-14", net: 400000,   VAT: 80000,    total: 480000,  paymentStatus: "pending" }, 
            { id: 22, sequenceID: 47073, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" },
            { id: 23, sequenceID: 49121, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 24, sequenceID: 49122, orderDate: "2020-02-14", net: 6010800,  VAT: 1202200,  total: 7213000, paymentStatus: "received"},
            { id: 25, sequenceID: 47076, orderDate: "2020-02-14", net: 1710000,  VAT: 342000,   total: 2052000, paymentStatus: "pending" }, 
        ]
    };
    mockData["results"] = mockData.data.length;

    return mockData;
}

/**
 * @param (object) - The requested order id.
 * @returns (object) - 
 */
async function getById(id, limit, offset, filter, sort) {
    // TEMP: get from database
    let mockData = {
        sequenceID: 47076,
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
            columns: {
                product: "String",
                ordered: "Number", 
                stock: "Number", 
                unitPrice: "Number", 
                totalPrice: "Number"
            },
            data: [
                { id: 1,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 2,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 3,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 4,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 5,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 6,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 7,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 8,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 9,  product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 10, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 11, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 12, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 13, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 14, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 15, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 16, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 17, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 18, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 19, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 20, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 21, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 22, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 23, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 24, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
                { id: 25, product: "placeholder", ordered: 12, stock: 45, unitPrice: 74.23, totalPrice: 890.76 },
            ]
        }
    };
    mockData["products"]["results"] = mockData.products.data.length;
    return mockData;
}

module.exports = {
    getAll,
    getById
};
