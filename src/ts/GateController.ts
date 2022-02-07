import { IGateController } from './interfaces/IGateController';
import pubSub from './PubSub';
import MessagesController from './MessagesController';

class GateController implements IGateController {
  private messagesController = MessagesController.getInstance();
  private isGateOpen = false;
  private isGateProcess = false;
  private isGateInPending = false;
  private timeOnClick: Date | undefined;
  private timeToFinishAction = 10000;
  private timeForAutoClosing = 10000;
  private toogleGateStateTimeoutId: ReturnType<typeof setTimeout> = setTimeout(
    () => {},
    this.timeToFinishAction
  );
  private timeoutAutoClosingId: ReturnType<typeof setTimeout> = setTimeout(
    () => {},
    this.timeForAutoClosing
  );

  get TimeForAutoClosing() {
    return this.timeForAutoClosing;
  }

  set TimeForAutoClosing(val) {
    this.timeForAutoClosing = val;
  }

  get TimeToFinishAction() {
    return this.timeToFinishAction;
  }

  set TimeToFinishAction(val) {
    this.timeToFinishAction = val;
  }

  get isGateOpenOrInProcessOfClosing() {
    return this.isGateOpen;
  }

  constructor() {
    pubSub.subscribe(
      'sensor:movementDetected',
      this.onSensorAlarmReceieve.bind(this)
    );
  }

  public gateProcessing(): void {
    this.messagesController.showNotification('Signal Proccessing');
    clearTimeout(this.timeoutAutoClosingId);

    if (this.isGateInPending) {
      this.messagesController.showNotification(
        'Gate is restore previous state'
      );
      this.isGateProcess = false;
      this.isGateInPending = false;
      this.restoreGatePreviousState();

      return;
    }

    if (this.isGateProcess) {
      this.messagesController.showNotification('Gate is in pending situation');
      if (this.toogleGateStateTimeoutId)
        clearTimeout(this.toogleGateStateTimeoutId);
      this.isGateProcess = false;
      this.isGateInPending = true;

      return;
    }

    this.isGateProcess = true;
    this.timeOnClick = new Date();
    this.toogleGateState();

    const text = this.isGateOpen
      ? 'Gate is start closing'
      : 'Gate is start opening';
    this.messagesController.showNotification(text);
  }

  private restoreGatePreviousState(): void {
    const timeSinceClick = new Date().getTime() - this.timeOnClick!.getTime();
    this.timeToFinishAction = timeSinceClick;
    this.toogleGateState(true);

    const text = this.isGateOpen
      ? 'Gate was closing, but now is start opening'
      : 'Gate was opening, but now is start closing';
    this.messagesController.showNotification(text);
  }

  private toogleGateState(restore?: boolean): void {
    this.toogleGateStateTimeoutId = setTimeout(() => {
      this.isGateProcess = false;
      if (restore) {
        this.timeToFinishAction = 10000;
      } else {
        this.isGateOpen = !this.isGateOpen;

        if (this.isGateOpen) this.gateAutoClosing();

        pubSub.publish('gateController:stateChanged', this.isGateOpen);
      }

      const text = this.isGateOpen ? 'Gate is Open' : 'Gate is closed';
      this.messagesController.showNotification(text);
    }, this.timeToFinishAction);
  }

  public onSensorAlarmReceieve(): void {
    this.messagesController.showNotification('Alarm, movement detected!');
    if (this.isGateProcess && this.isGateOpen) {
      this.restoreGatePreviousState();

      return;
    }
  }

  private gateAutoClosing() {
    this.timeoutAutoClosingId = setTimeout(() => {
      this.messagesController.showNotification('Gate is start autoclosing');
      this.gateProcessing();
    }, this.timeForAutoClosing);
  }
}

export default GateController;
