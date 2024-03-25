const products = [
    {
      Price: 10.99,
      Stock: 100,
      UnitOfMeasurement: 'unit',
      ProductCategory: 1,
      ProductAvailability: 'available',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      ProductTranslations: [
        {
          language: 'en',
          name: 'Iphone 12',
          description: 'Description of Product'
        },
        {
          language: 'nl',
          name: 'Iphone 12',
          description: 'Beschrijving van product'
        }
      ]
    },
    {
      Price: 15.99,
      Stock: 50,
      UnitOfMeasurement: 'unit',
      ProductCategory: 2,
      ProductAvailability: 'available',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      ProductTranslations: [
        {
          language: 'en',
          name: 'Playstation 5',
          description: 'Description of Product 2'
        },
        {
          language: 'nl',
          name: 'Playstation 5',
          description: 'Beschrijving van product'
        }
      ]
    }
  ];
  
  module.exports = products;
  