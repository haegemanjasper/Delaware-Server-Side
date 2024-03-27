const { getProductsByQuery } = require("../data/ProductData");
const { getOrdersByQuery, getOrderById } = require("../data/OrderData");
const ServiceError = require("../core/serviceError");

function parseFilterParams(filter) {
    Object.keys(filter).forEach(key => {
        if (typeof filter[key] === "object") {
            let bounds = {};
            if (filter[key]["min"])
                bounds.gte = Number(filter[key]["min"]);
            if (filter[key]["max"])
                bounds.lte = Number(filter[key]["max"])

            return filter[key] = bounds;
        }
        return filter[key] = {
            contains: filter[key]
        };
    });
    return filter;
}

function parseSortingParams(sort) {
    return Object.entries(sort).map(([key, value]) => ({
        [key]: value
    }));
}

/**
 * @returns (object)
 */
async function getAll(limit, offset, filter, sort) {
    const data = await getOrdersByQuery(Number(limit), Number(offset) - 1, parseFilterParams(filter), parseSortingParams(sort));
    if (!data.orders) {
        throw ServiceError.notFound(`No orders found`);
    } 
    let formatedOrders = {
        columns: {
            OrderId: "Number",
            OrderDate: "Date",
            NetAmount: "Number",
            TaxAmount: "Number",
            TotalAmount: "Number",
            PaymentStatus: "String"
        },
        results: data.count
    };
    formatedOrders.data = data.orders.map((order) => {
        const date = new Date(order.order_date);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();

        return {
            id: order.order_id,
            OrderId: order.order_id,
            OrderDate: `${dd}/${mm}/${yyyy}`,
            NetAmount: order.net_amount,
            TaxAmount: order.tax_amount,
            TotalAmount: order.total_amount,
            PaymentStatus: order.payment_status
        }
    });

    return formatedOrders;
}

/**
 * @param (object) - The requested order id.
 * @returns (object) - 
 */
async function getById(id, limit, offset, filter, sort) {
    const orderData = await getOrderById(id);
    if (!orderData) {
        throw ServiceError.notFound(`No order with id: ${id} found`, id);
    }
    // TODO: Should get products by OrderId, also missing columns in database.
    const productData = await getProductsByQuery(Number(limit), Number(offset) - 1, parseFilterParams(filter), parseSortingParams(sort));

    // TODO: Send the correct data based on the users role. With we still don't have...
    const formatedOrder = {
        OrderId: orderData.order_id,
        OrderDate: orderData.order_date,
        DeliveryAddress: "placeholder",
        OrderStatus: orderData.status,
        PaymentStatus: orderData.payment_status,
        NetAmount: orderData.net_amount,
        TaxAmount: orderData.tax_amount,
        TotalAmount: orderData.total_amount,
        LastPaymentNotificationDate: "placeholder",
        CustomerName: "placeholder",
        CustomerPhoneNr: "placeholder",
        CustomerAddress: "placeholder",
        SupplierName: "placeholder",
        SupplierAddress: "placeholder",
        SupplierVatNr: "placeholder",
        SupplierAccountNr: "placeholder",
        StructuredCommunication: "placeholder",
        products: {
            columns: {
                
            },
            data: [

            ],
            results: productData.count,
        },
    }

    return formatedOrder;

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
        supplierName: "Jane Doe",
        supplierAddress: "Geraard de Duivelstraat 5 9000 Gent",
        supplierVatNr: 123456789,
        supplierAccountNr: 123456789,
        structuredCommunication: "+++090/9337/55493++",
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
