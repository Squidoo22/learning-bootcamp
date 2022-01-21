import { IGateSystem } from "./interfaces/IGateSystem";
import GateSensor from "./GateSensor";
import Gate from "./Gate";

class GateSystem implements IGateSystem {
  public sensor: GateSensor = new GateSensor();
  public gate: Gate = new Gate();

  constructor() {}

  public sendSignalOnGate(): void {
    console.log("%c Send Signal on Gate ", "background: #222; color: #bada55");
    this.gate.gateProcessing();
  }

  private setTimeForAutoClosingGate(time: number): void {
    this.gate.TimeForAutoClosing = time;
  }
}

export default GateSystem;
