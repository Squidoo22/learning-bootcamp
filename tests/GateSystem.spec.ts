import GateSystem from '../src/ts/GateSystem';
import GateSensor from '../src/ts/GateSensor';
import GateController from '../src/ts/GateController';
import GateInterface from '../src/ts/GateInterface';

jest.mock('../src/ts/GateSensor');
jest.mock('../src/ts/GateController');
jest.mock('../src/ts/GateInterface');

describe('GateSystem', () => {
  let gateSystem: Object;

  beforeEach(() => {
    const controller = new GateController();

    gateSystem = {
      sensor: new GateSensor(),
      controller: controller,
      interface: new GateInterface(controller),
    };
  });

  it('Property sensor exists', () => {
    expect(gateSystem).toHaveProperty('sensor');
  });

  it('Property controller exists', () => {
    expect(gateSystem).toHaveProperty('controller');
  });

  it('Property interface exists', () => {
    expect(gateSystem).toHaveProperty('interface');
  });
});
