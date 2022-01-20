import { IGateSystem } from "./interfaces/IGateSystem";
import GateSensor from "./GateSensor";
import pubSub from "./PubSub";

class GateSystem implements IGateSystem {
  private timeToFinishAction = 10000;
  private timeOnClick: Date | undefined;
  private isGateOpen = false;
  private isGateProcess = false;
  private timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {},
  this.timeToFinishAction);
  public sensor: GateSensor = new GateSensor();

  constructor() {
    pubSub.subscribe('sensor:movementDetected', this.onSensorAlarmReceieve.bind(this));
  }

  public sendSignalOnGate(): void {
    console.log("%c Send Signal on Gate ", "background: #222; color: #bada55");
    this.signalProcessing();
  }

  private signalProcessing(): void {
    console.log("%c Signal Proccessing ", "background: #222; color: #bada55");

    if (this.isGateProcess) {
      this.restorePreviousStateGate();

      return;
    }

    this.isGateProcess = true;
    this.timeOnClick = new Date();
    this.gateAction();

    const text = this.isGateOpen
      ? "Gate is start closing"
      : "Gate is start opening";
    console.log(`%c ${text} `, "background: #222; color: #bada55");
  }

  private gateAction(restore?: boolean): void {
    this.timeoutId = setTimeout(() => {
      this.isGateProcess = false;
      if (restore) {
        this.setTimeToFinishAction(10000);
      } else {
        this.isGateOpen = !this.isGateOpen;
      }

      const text = this.isGateOpen ? "Gate is Open" : "Gate is close";
      console.log(`%c ${text} `, "background: #222; color: #bada55");
    }, this.timeToFinishAction);
  }

  private setTimeToFinishAction(time: number): void {
    this.timeToFinishAction = time;
  }

  private restorePreviousStateGate(): void {
    clearTimeout(this.timeoutId);
    const timeSinceClick = new Date().getTime() - this.timeOnClick!.getTime();
    this.setTimeToFinishAction(timeSinceClick);
    this.gateAction(true);

    const text = this.isGateOpen
      ? "Gate was closing, but now is start opening"
      : "Gate was opening, but now is start closing";
    console.log(`%c ${text} `, "background: #222; color: #bada55");
  }

  public onSensorAlarmReceieve(): void {
    console.log("Alarm!", "background: #222; color: #bada55");
    if (this.isGateProcess && this.isGateOpen) {
      this.restorePreviousStateGate();

      return;
    }
  }
}

export default GateSystem;
