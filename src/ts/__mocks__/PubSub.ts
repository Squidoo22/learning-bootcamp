import pubSub from '../PubSub';

let handler: Function;

function subscribe(eventName: string, subHandler: Function) {
  handler = subHandler;
}

function callHandler() {
  handler();
}

pubSub.subscribe = subscribe;
pubSub.callHandler = callHandler;

export default pubSub;
