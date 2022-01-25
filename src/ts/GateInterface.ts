import GateController from "./GateController";
import { IGateInterface } from "./interfaces/IGateInterface";

class GateInterface implements IGateInterface {
  private gateController: GateController;

  constructor(controller: GateController) {
    this.gateController = controller;
  }

  public sendSignalOnGate(): void {
    console.log("%c Send Signal on Gate ", "background: #222; color: #bada55");
    this.gateController.gateProcessing();
  }

  public setTimeForAutoClosingGate(time: number): void {
    this.gateController.TimeForAutoClosing = time;
  }

  public setTimeForGateAction(time: number): void {
    this.gateController.TimeToFinishAction = time;
  }
}

export default GateInterface;
