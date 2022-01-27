import GateSystem from '../src/ts/GateSystem';

describe('GateSystem', () => {
  const gateSystem = new GateSystem();

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
