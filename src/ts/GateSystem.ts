import { IGateSystem } from "./interfaces/IGateSystem";

class GateSystem implements IGateSystem {
  private defaultTimeToFinish = 10000;
  private timeToFinishAction = new Date();
  private isGateOpen = false;
  private isGateProcess = false;
  private timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {},
  this.defaultTimeToFinish);

  constructor() {}

  public sendSignalOnGate(): void {
    console.log("%c Send Signal on Gate ", "background: #222; color: #bada55");
    this.signalProcessing();
  }

  private signalProcessing(): void {
    console.log("%c Signal Proccessing ", "background: #222; color: #bada55");

    if (this.isGateProcess) {
      this.restorePreviousStataGate();

      return;
    }

    this.isGateProcess = true;
    this.timeToFinishAction = new Date();
    this.gateAction();

    const text = this.isGateOpen
      ? "Gate is start closing"
      : "Gate is start opening";
    console.log(`%c ${text} `, "background: #222; color: #bada55");
  }

  private gateAction(restore?: boolean): void {
    this.timeoutId = setTimeout(() => {
      this.isGateProcess = false;
      if (!restore) this.isGateOpen = !this.isGateOpen;
      this.defaultTimeToFinish = 10000;

      const text = this.isGateOpen ? "Gate is Open" : "Gate is close";
      console.log(`%c ${text} `, "background: #222; color: #bada55");
    }, this.defaultTimeToFinish);
  }

  private restorePreviousStataGate(): void {
    clearTimeout(this.timeoutId);
    const ms = new Date().getTime() - this.timeToFinishAction.getTime();
    this.defaultTimeToFinish = ms;
    this.gateAction(true);

    const text = this.isGateOpen
      ? "Gate was closing, but now is start opening"
      : "Gate was opening, but now is start closing";
    console.log(`%c ${text} `, "background: #222; color: #bada55");
  }
}

(window as any).GateSystem = GateSystem;

export default GateSystem;
