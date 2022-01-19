import { IGateSensor } from "./interfaces/IGateSensor";
import GateSystem from "./GateSystem";

class GateSensor implements IGateSensor {
  public gateSystem: GateSystem;

  constructor(gateSystem: GateSystem) {
    this.gateSystem = gateSystem;
  }

  public sendAlarm(): void {
    this.gateSystem.onSensorAlarmReceieve();
  }
}

(window as any).GateSensor = GateSensor;
export default GateSensor;
