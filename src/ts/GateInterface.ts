import { IGateInterface } from "./interfaces/IGateInterface";
import GateSensor from "./GateSensor";
import Gate from "./GateController";

class GateInterface implements IGateInterface {
  public sensor: GateSensor = new GateSensor();
  public gate: Gate = new Gate();

  constructor() {}

  public sendSignalOnGate(): void {
    console.log("%c Send Signal on Gate ", "background: #222; color: #bada55");
    this.gate.gateProcessing();
  }

  public setTimeForAutoClosingGate(time: number): void {
    this.gate.TimeForAutoClosing = time;
  }

  public setTimeForGateAction(time: number): void {
    this.gate.TimeToFinishAction = time;
  }
}

export default GateInterface;
