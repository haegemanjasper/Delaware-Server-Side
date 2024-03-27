const paymentRequests = [
    {
      PaymentRequestId: 1,
      PaymentRequestDate: new Date('2024-03-25'),
      PaymentRequestAmount: 200.50,
      BankDetails: 'Bank XYZ, Account Number: 1234567890',
      OrderId: 1 
    },
    {
      PaymentRequestId: 2,
      PaymentRequestDate: new Date('2024-03-24'), 
      PaymentRequestAmount: 300.75,
      BankDetails: 'Bank ABC, Account Number: 0987654321',
      OrderId: 2 
    }
  ];
  
  module.exports = paymentRequests;
  