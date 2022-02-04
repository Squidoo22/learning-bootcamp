import GateController from './GateController';
import { IGateInterface } from './interfaces/IGateInterface';
import messagesController from './MessagesController';

class GateInterface implements IGateInterface {
  private gateController: GateController;

  constructor(controller: GateController) {
    this.gateController = controller;
  }

  public sendSignalOnGate(): void {
    messagesController.showNotification('Send Signal on Gate');
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
