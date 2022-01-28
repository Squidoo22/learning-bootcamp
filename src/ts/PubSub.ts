interface Subscription {
  handler: Function;
}

interface Subscriptions {
  [key: string]: Array<Subscription>;
}

class PubSub {
  private subscribtions: Subscriptions = {};
  callHandler: () => void;

  public subscribe(eventName: string, handler: Function): void {
    if (this.subscribtions[eventName]) {
      if (this.isAlreadySubscribed(eventName, handler)) {
        console.log(`You already have this subscription`);
      } else {
        this.subscribtions[eventName].push({ handler });
      }
    } else {
      this.subscribtions[eventName] = [{ handler }];
    }
  }

  public unsubscribe(eventName: string, handler: Function): void {
    const subscriptionIndex = this.subscribtions[eventName].findIndex(
      (subscription: any) =>
        this.checkIfHandlerExist(subscription.handler, handler)
    );

    if (this.isAlreadySubscribed(eventName, handler)) {
      this.subscribtions[eventName].splice(subscriptionIndex, 1);
    } else {
      console.log(`You don't have such subscription`);
    }
  }

  public publish(eventName: string, ...params: any): void {
    this.subscribtions[eventName].forEach((subscription: any) =>
      subscription.handler(...params)
    );
  }

  private isAlreadySubscribed(eventName: string, handler: Function): boolean {
    const subscriptionIndex = this.subscribtions[eventName]
      ? this.subscribtions[eventName].findIndex((subscription: any) =>
          this.checkIfHandlerExist(subscription.handler, handler)
        )
      : -1;

    return subscriptionIndex >= 0;
  }

  private checkIfHandlerExist(
    initHandler: Function,
    newHandler: Function
  ): boolean {
    return initHandler.toString() === newHandler.toString();
  }
}

const pubSub = new PubSub();

export default pubSub;
