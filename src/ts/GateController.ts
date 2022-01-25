import { IGateController } from "./interfaces/IGateController";
import pubSub from "./PubSub";

class GateController implements IGateController {
  public isGateOpen = false;
  public isGateProcess = false;
  private isGateInPending = false;
  private timeOnClick: Date | undefined;
  private timeToFinishAction = 10000;
  public timeForAutoClosing = 10000;
  private timeoutActionId: ReturnType<typeof setTimeout> = setTimeout(() => {},
  this.timeToFinishAction);
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

  constructor() {
    pubSub.subscribe(
      "sensor:movementDetected",
      this.onSensorAlarmReceieve.bind(this)
    );
  }

  public gateProcessing(): void {
    console.log("%c Signal Proccessing ", "background: #222; color: #bada55");
    clearTimeout(this.timeoutAutoClosingId);

    if (this.isGateInPending) {
      console.log(
        `%c Gate is restore previous state `,
        "background: #222; color: #bada55"
      );
      this.isGateProcess = false;
      this.isGateInPending = false;
      this.restorePreviousStateGate();

      return;
    }

    if (this.isGateProcess) {
      console.log(
        `%c Gate is in pending situation`,
        "background: #222; color: #bada55"
      );
      if (this.timeoutActionId) clearTimeout(this.timeoutActionId);
      this.isGateProcess = false;
      this.isGateInPending = true;

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

  public restorePreviousStateGate(): void {
    const timeSinceClick = new Date().getTime() - this.timeOnClick!.getTime();
    this.timeToFinishAction = timeSinceClick;
    this.gateAction(true);

    const text = this.isGateOpen
      ? "Gate was closing, but now is start opening"
      : "Gate was opening, but now is start closing";
    console.log(`%c ${text} `, "background: #222; color: #bada55");
  }

  private gateAction(restore?: boolean): void {
    this.timeoutActionId = setTimeout(() => {
      this.isGateProcess = false;
      if (restore) {
        this.timeToFinishAction = 10000;
      } else {
        this.isGateOpen = !this.isGateOpen;

        if (this.isGateOpen) this.gateAutoClosing();
      }

      const text = this.isGateOpen ? "Gate is Open" : "Gate is close";
      console.log(`%c ${text} `, "background: #222; color: #bada55");
    }, this.timeToFinishAction);
  }

  public onSensorAlarmReceieve(): void {
    console.log(
      "%c Alarm, movement detected!",
      "background: #222; color: #bada55"
    );
    if (this.isGateProcess && this.isGateOpen) {
      this.restorePreviousStateGate();

      return;
    }
  }

  private gateAutoClosing() {
    this.timeoutAutoClosingId = setTimeout(() => {
      console.log(
        "%c Gate is start autoclosing",
        "background: #222; color: #bada55"
      );
      this.gateProcessing();
    }, this.timeForAutoClosing);
  }
}

export default GateController;
