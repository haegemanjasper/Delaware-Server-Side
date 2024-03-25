const { PrismaClient  } = require('@prisma/client')

const users = require('./usersSeed');
const products = require('./productsSeed');
const productTranslations = require('./productTranslationsSeed');
const payments = require('./paymentsSeed');
const paymentRequests = require('./paymentrequestsSeed');
const orders = require('./ordersSeed');

const prisma = new PrismaClient();

async function seed(){
    try {
        for (const userData of users) {
          await prisma.users.upsert({
            where: { email: userData.Email },
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

        for (const paymentData of payments) {
            await prisma.payments.upsert({
              where: { PaymentId: paymentData.PaymentId },
              update: {},
              create: paymentData,
            });
          }

        for (const paymentRequestData of paymentRequests) {
            await prisma.paymentRequests.upsert({
              where: { PaymentRequestId: paymentRequestData.PaymentRequestId },
              update: {},
              create: paymentRequestData,
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