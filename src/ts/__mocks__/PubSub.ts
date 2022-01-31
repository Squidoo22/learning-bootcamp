const pubSub: any = {};
let handler: Function;

function subscribe(eventName: string, subHandler: Function) {
  handler = subHandler;
}

function publish() {
  handler();
}

pubSub.subscribe = subscribe;
pubSub.publish = publish;

export default pubSub;
