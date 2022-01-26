class MessagesController {
  private notifications: Array<string> = [];

  constructor(){}

  public showNotification(text: string): void {
    console.log(`%c ${text} `, "background: #222; color: #bada55");
    this.notifications.push(`${new Date().toJSON().slice(0,19).split('T').join(' ')} ${text}`)
  }

  public showNotificationsHistory(): void {
    this.notifications.forEach((string : string) => console.log(string));
  }
}

const messagesController = new MessagesController();

export default messagesController;