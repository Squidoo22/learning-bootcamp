import { IGateSystem } from "./interfaces/IGateSystem";
const gateBtnRef = document.getElementById("gateSystem")!;

class GateSystem implements IGateSystem {
  defaultTimeToClose = 10000;
  timeToFinishAction = new Date();
  isGateOpen = false;
  isGateProcess = false;
  timeoutId = 0;

  constructor() {}

  signalProcessing(): void {
    if (this.isGateProcess) {
      this.restorePreviousStataGate();

      return;
    }

    this.isGateProcess = true;
    this.renderBtn("In process");

    this.timeToFinishAction = new Date();
    this.gateAction();
  }

  gateAction(restore?: boolean): void {
    this.timeoutId = setTimeout(() => {
      this.isGateProcess = false;
      if (!restore) this.isGateOpen = !this.isGateOpen;
      this.defaultTimeToClose = 10000;

      const textBtn = this.isGateOpen ? "Close" : "Open";
      this.renderBtn(textBtn);
    }, this.defaultTimeToClose);
  }

  restorePreviousStataGate(): void {
    clearTimeout(this.timeoutId);
    const ms = new Date().getTime() - this.timeToFinishAction.getTime();
    this.defaultTimeToClose = ms;
    this.gateAction(true);
  }

  renderBtn(text: string): void {
    gateBtnRef.innerHTML = text;
  }
}

const gateSystem = new GateSystem();

gateBtnRef.addEventListener("click", () => gateSystem.signalProcessing());
