const payments = [
    {
      PaymentDate: new Date('2024-03-25'),
      PaymentAmount: 100.50,
      PaymentMethod: 1,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      InvoiceId: 1 
    },
    {
      PaymentDate: new Date('2024-03-24'),
      PaymentAmount: 150.75,
      PaymentMethod: 2, 
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      InvoiceId: 2
    }
  ];
  
  module.exports = payments;
  