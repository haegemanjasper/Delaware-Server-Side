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
      Role: "Klant"
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
      Role: "Leverancier"
    },
    {
      Username: 'Zurha',
      PasswordHash: 'hashed_password_3',
      Email: 'Zurha@example.com',
      PhoneNr: '567891234',
      VatNr: 'VAT567891',
      Name: 'Friso De Backer',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      Role: "Administrator"
    }
  ];
  
  module.exports = users;
  