class MessagesController {
  private static instance: MessagesController;
  public notifications: Array<string> = [];
  public gateStatusInfo: string = 'Gate is close';

  constructor() {}

  public showNotification(text: string): void {
    console.log(`%c ${text} `, 'background: #222; color: #bada55');
    this.notifications.push(
      `${new Date().toJSON().slice(0, 19).split('T').join(' ')} ${text}`
    );
    this.gateStatusInfo = text;
  }

  public showNotificationsHistory(): void {
    this.notifications.forEach((string: string) => console.log(string));
  }

  public static getInstance(): MessagesController {
    if (!MessagesController.instance) {
      MessagesController.instance = new MessagesController();
    }

    return MessagesController.instance;
  }
}

export default MessagesController;
