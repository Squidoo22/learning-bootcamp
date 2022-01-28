import GateController from '../src/ts/GateController';
import pubSub from '../src/ts/PubSub';

jest.mock('../src/ts/PubSub');

describe('GateController', () => {
  beforeEach(() => {
    const gateController = new GateController();
  });

  it('Constructor subscribes on event', () => {
    expect(pubSub.subscribe).toBeCalled();
  });
});
