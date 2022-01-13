import { IGateSystem } from "./interfaces/IGateSystem";

class GateSystem implements IGateSystem {
  defaultTimeToFinish = 10000;
  timeToFinishAction = new Date();
  isGateOpen = false;
  isGateProcess = false;
  timeoutId = 0;

  constructor() {}

  signalProcessing(): void {
    console.log("signalProcessing");
    if (this.isGateProcess) {
      this.restorePreviousStataGate();

      return;
    }

    this.isGateProcess = true;

    this.timeToFinishAction = new Date();
    this.gateAction();
  }

  gateAction(restore?: boolean): void {
    this.timeoutId = setTimeout(() => {
      console.log("gateAction");
      this.isGateProcess = false;
      if (!restore) this.isGateOpen = !this.isGateOpen;
      this.defaultTimeToFinish = 10000;

    }, this.defaultTimeToFinish);
  }

  restorePreviousStataGate(): void {
    clearTimeout(this.timeoutId);
    const ms = new Date().getTime() - this.timeToFinishAction.getTime();
    this.defaultTimeToFinish = ms;
    this.gateAction(true);
  }
}

const gateSystem = new GateSystem();
gateSystem.signalProcessing();

// console.log(gateSystem);
export default GateSystem;