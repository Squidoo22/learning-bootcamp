import GateController from '../src/ts/GateController';
import GateInterface from '../src/ts/GateInterface';
import messagesController from '../src/ts/MessagesController';

jest.mock('../src/ts/GateController');
jest.mock('../src/ts/MessagesController');

describe('GateInterface', () => {
  let gateInterface: GateInterface;
  let gateController: GateController;

  beforeEach(() => {
    gateController = new GateController();
    gateInterface = new GateInterface(gateController);
  });

  // it('GateController is exist in class properties', () => {
  //   expect(gateInterface).toHaveProperty('gateController');
  //   expect(gateInterface).toBeInstanceOf(GateInterface);
  // });

  it('GateController  timeForAutoClosing changed', () => {
    const time = 5000;
    gateInterface.setTimeForAutoClosingGate(time);

    expect(gateController.TimeForAutoClosing).toBe(time);
  });

  it('GateController timeToFinishAction changed', () => {
    const time = 3000;
    gateInterface.setTimeForGateAction(time);

    expect(gateController.TimeToFinishAction).toBe(time);
  });

  it('GateController send signal on gate should display notification and called gate processing', () => {
    gateInterface.sendSignalOnGate();
    jest.spyOn(gateController, 'gateProcessing');

    expect(messagesController.showNotification).toBeCalledWith(
      'Send Signal on Gate'
    );

    expect(gateController.gateProcessing).toBeCalled();
  });
});
