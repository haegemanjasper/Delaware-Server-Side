const users = [
    {
      Username: 'Brakkert',
      PasswordHash: 'hashed_password_1',
      Email: 'Brakkert@example.com',
      PhoneNr: '1234567890',
      VatNr: 'VAT123456',
      Name: 'Robbe Van den Broeck',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      Addresses: [
        {
          street: '123 Street St',
          city: 'Cityville',
          country: 'Countryland',
          postalCode: '12345'
        }
      ],
      Notifications: [
        {
          message: 'Notification 1',
          date: new Date()
        }
      ],
      Orders: [
        {
          orderNumber: 'ORD123',
          totalAmount: 100,
          date: new Date()
        }
      ]
    },
    {
      Username: 'Espera',
      PasswordHash: 'hashed_password_2',
      Email: 'Espera@example.com',
      PhoneNr: '0987654321',
      VatNr: 'VAT654321',
      Name: 'Jasper Haegeman',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      Addresses: [
        {
          street: '456 Avenue Ave',
          city: 'Townsville',
          country: 'Countryland',
          postalCode: '54321'
        }
      ],
      Notifications: [
        {
          message: 'Notification 2',
          date: new Date()
        }
      ],
      Orders: [
        {
          orderNumber: 'ORD456',
          totalAmount: 200,
          date: new Date()
        }
      ]
    }
  ];
  
  module.exports = users;
  