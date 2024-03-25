const orders = [
    {
      OrderDate: new Date('2024-03-20'),
      DeliveryDate: new Date('2024-03-22'), 
      Status: 'Pending',
      PaymentStatus: 'Pending',
      OrderReference: 'ORD123456', 
      NetAmount: 100.00,
      TaxAmount: 10.00,
      TotalAmount: 110.00,
      Currency: 'EUR',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      Username: 'Brakkert', 
      InvoiceId: 1 // Example invoice ID
    },
    {
      OrderDate: new Date('2024-03-15'), 
      DeliveryDate: new Date('2024-03-16'), 
      Status: 'Completed',
      PaymentStatus: 'Paid',
      OrderReference: 'ORD789012', 
      NetAmount: 150.00,
      TaxAmount: 15.00,
      TotalAmount: 165.00,
      Currency: 'EUR',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      Username: 'Espera', 
      InvoiceId: 2 
    }
  ];
  
  module.exports = orders;
  