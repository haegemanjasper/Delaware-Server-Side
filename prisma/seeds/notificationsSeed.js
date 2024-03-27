const notifications = [
    {
      NotificationId: 1,
      Date: new Date('2024-03-18'), 
      Text: 'Notification 1',
      Status: 'Pending',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      Username: 'Brakkert',
      OrderId: 1 
    },
    {
      NotificationId: 2,
      Date: new Date('2024-03-23'),
      Text: 'Notification 2',
      Status: 'Sent',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsActive: true,
      Username: 'Espera', 
      OrderId: 2 
    }
  ];
  
  module.exports = notifications;
  