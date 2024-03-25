const invoices = [
    {
      InvoiceDate: new Date('2024-03-18'), 
      InvoiceAmount: 500.00,
      BankDetails: 'Bank ABC, Account Number: 1234567890',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true
    },
    {
      InvoiceDate: new Date('2024-03-19'), 
      InvoiceAmount: 750.00,
      BankDetails: 'Bank XYZ, Account Number: 0987654321',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true
    }
  ];
  
  module.exports = invoices;
  