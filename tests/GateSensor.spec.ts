import GateSensor from '../src/ts/GateSensor';
import pubSub from '../src/ts/PubSub';
import GateController from '../src/ts/GateController';

jest.mock('../src/ts/PubSub');
jest.mock('../src/ts/GateController');

describe('GateSensor', () => {
  it('method sendAlarm should be called', () => {
    const gateSensor = new GateSensor();
    const mockedFunc = jest.fn();
    pubSub.subscribe('sensor:movementDetected', mockedFunc);

    jest.spyOn(gateSensor, 'sendAlarm');
    jest.spyOn(pubSub, 'publish');

    gateSensor.sendAlarm();

    expect(gateSensor.sendAlarm).toBeCalled();
    expect(pubSub.publish).toBeCalled();
  });
});
