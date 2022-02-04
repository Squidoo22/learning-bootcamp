import MessagesController from '../src/ts/MessagesController';

describe('MessagesController', () => {
  const messagesController = MessagesController.getInstance();
  const testMessage = 'test';
  console.log = jest.fn();

  it('Property notifications exists', () => {
    expect(messagesController).toHaveProperty('notifications');
  });

  it('Method showNotification works properly', () => {
    messagesController.showNotification(testMessage);
    expect(console.log).toBeCalledWith(
      `%c ${testMessage} `,
      'background: #222; color: #bada55'
    );
  });

  it('Method showNotificationsHistory works properly', () => {
    messagesController.showNotificationsHistory();
    expect(console.log).toBeCalledWith(
      `${new Date().toJSON().slice(0, 19).split('T').join(' ')} ${testMessage}`
    );
  });
});
