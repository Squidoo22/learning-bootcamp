import { IGateSystem } from "./interfaces/IGateSystem";
import GateSensor from "./GateSensor";
import pubSub from "./PubSub";
import Gate from "./Gate";

class GateSystem implements IGateSystem {
  public sensor: GateSensor = new GateSensor();
  public gate: Gate = new Gate();

  constructor() {
    pubSub.subscribe(
      "sensor:movementDetected",
      this.onSensorAlarmReceieve.bind(this)
    );
  }

  public sendSignalOnGate(): void {
    console.log("%c Send Signal on Gate ", "background: #222; color: #bada55");
    this.gate.gateProcessing();
  }

  public onSensorAlarmReceieve(): void {
    console.log(
      "%c Alarm, movement detected!",
      "background: #222; color: #bada55"
    );
    if (this.gate.isGateProcess && this.gate.isGateOpen) {
      this.gate.restorePreviousStateGate();

      return;
    }
  }

  private setTimeForAutoClosingGate(time: number): void {
    this.gate.timeForAutoClosing = time;
  }
}

export default GateSystem;
