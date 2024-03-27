const { PrismaClient  } = require('@prisma/client')

const getUsers = require('./seeds/usersSeed');
const products = require('./seeds/productsSeed');
const productTranslations = require('./seeds/productTranslationsSeed');
const payments = require('./seeds/paymentsSeed');
const paymentRequests = require('./seeds/paymentrequestsSeed');
const orders = require('./seeds/ordersSeed');
const orderLinesProducts = require('./seeds/orderLinesProductsSeed');
const orderLines = require('./seeds/orderLinesSeed');
const notifications = require('./seeds/notificationsSeed');
const invoices = require('./seeds/invoicesSeed');
const addressesOrders = require('./seeds/addressesOrdersSeed');
const addresses = require('./seeds/addressesSeed');

const prisma = new PrismaClient();

async function seed(){
    const users =  await getUsers();
    try {
        for (const userData of users) {
          await prisma.users.upsert({
            where: { Email: userData.Email },
            update: {},
            create: userData,
          });
        }
    
        for (const productData of products) {
          await prisma.products.upsert({
            where: { ProductId: productData.ProductId },
            update: {},
            create: productData,
          });
        }
    
        for (const translationData of productTranslations) {
          await prisma.productTranslations.upsert({
            where: { ProductTranslationId: translationData.ProductTranslationId },
            update: {},
            create: translationData,
          });
        }

        for (const invoiceData of invoices) {
          await prisma.invoices.upsert({
            where: { InvoiceId: invoiceData.InvoiceId },
            update: {},
            create: invoiceData,
          });
        }  

        for (const paymentData of payments) {
            await prisma.payments.upsert({
              where: { PaymentId: paymentData.PaymentId },
              update: {},
              create: paymentData,
            });
          }

          for (const orderData of orders) {
            await prisma.orders.upsert({
              where: { OrderId: orderData.OrderId },
              update: {},
              create: orderData,
            });
          }   

        for (const paymentRequestData of paymentRequests) {
            await prisma.paymentRequests.upsert({
              where: { PaymentRequestId: paymentRequestData.PaymentRequestId },
              update: {},
              create: paymentRequestData,
            });
          }  
          
        for (const orderLineProductData of orderLinesProducts) {
            await prisma.orderLines_Products.upsert({
              where: { OrderLineId_ProductId: { OrderLineId: orderLineProductData.OrderLineId, ProductId: orderLineProductData.ProductId } },
              update: {},
              create: orderLineProductData,
            });
          }
          
        for (const orderLineData of orderLines) {
            await prisma.orderLines.upsert({
              where: { OrderLineId: orderLineData.OrderLineId },
              update: {},
              create: orderLineData,
            });
          }  

        for (const notificationData of notifications) {
            await prisma.notifications.upsert({
              where: { NotificationId: notificationData.NotificationId },
              update: {},
              create: notificationData,
            });
          } 

        for (const addressData of addresses) {
            await prisma.addresses.upsert({
              where: { AddressId: addressData.AddressId },
              update: {},
              create: addressData,
            });
          }   
          
        for (const addressOrderData of addressesOrders) {
            await prisma.addresses_Orders.upsert({
              where: { AddressId_OrderId: { AddressId: addressOrderData.AddressId, OrderId: addressOrderData.OrderId } },
              update: {},
              create: addressOrderData,
            });
          }

        console.log('Seed data inserted successfully!');
      } catch (error) {
        console.error('Error seeding database:', error);
      } finally {
        await prisma.$disconnect();
      }
}

seed();