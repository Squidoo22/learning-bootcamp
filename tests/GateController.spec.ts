import GateController from '../src/ts/GateController';
import pubSub from '../src/ts/PubSub';
import messagesController from '../src/ts/MessagesController';

jest.mock('../src/ts/PubSub');
jest.mock('../src/ts/MessagesController');

describe('GateController', () => {
  let gateController: GateController;

  beforeEach(() => {
    jest.spyOn(pubSub, 'subscribe');

    gateController = new GateController();
  });

  afterEach(() => {
    gateController = null;
  });

  it('Constructor subscribes on event', () => {
    expect(pubSub.subscribe).toBeCalled();
  });

  it('Response on sensor event', () => {
    pubSub.publish('');
    expect(messagesController.showNotification).toBeCalledWith(
      'Alarm, movement detected!'
    );
  });
});
