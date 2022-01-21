import { IGateSystem } from "./interfaces/IGateSystem";
import GateSensor from "./GateSensor";
import pubSub from "./PubSub";
import Gate from "./Gate";

class GateSystem implements IGateSystem {
  private timeForAutoClosing: 10000;
  public sensor: GateSensor = new GateSensor();
  public gate: Gate = new Gate();

  constructor() {
    pubSub.subscribe(
      "sensor:movementDetected",
      this.onSensorAlarmReceieve.bind(this)
    );
    pubSub.subscribe("gate:autoClosing", () => {
      setTimeout(() => {
        this.gateAutoClosing();
      }, this.timeForAutoClosing);
    });
  }

  public sendSignalOnGate(): void {
    console.log("%c Send Signal on Gate ", "background: #222; color: #bada55");
    this.gate.signalProcessing();
  }

  public onSensorAlarmReceieve(): void {
    console.log("Alarm!", "background: #222; color: #bada55");
    if (this.gate.isGateProcess && this.gate.isGateOpen) {
      this.gate.restorePreviousStateGate();

      return;
    }
  }

  private gateAutoClosing() {
    console.log("autoClosing");
    this.gate.signalProcessing();
  }
}

export default GateSystem;
