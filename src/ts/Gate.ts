import { IGate } from "./interfaces/IGate";
class Gate implements IGate {
  public isGateOpen = false;
  public isGateProcess = false;
  private timeOnClick: Date | undefined;
  private timeToFinishAction = 10000;
  private timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {},
  this.timeToFinishAction);
  public timeForAutoClosing = 10000;

  public gateProcessing(): void {
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

  public restorePreviousStateGate(): void {
    clearTimeout(this.timeoutId);
    const timeSinceClick = new Date().getTime() - this.timeOnClick!.getTime();
    this.setTimeToFinishAction(timeSinceClick);
    this.gateAction(true);

    const text = this.isGateOpen
      ? "Gate was closing, but now is start opening"
      : "Gate was opening, but now is start closing";
    console.log(`%c ${text} `, "background: #222; color: #bada55");
  }

  private gateAction(restore?: boolean): void {
    this.timeoutId = setTimeout(() => {
      this.isGateProcess = false;
      if (restore) {
        this.setTimeToFinishAction(10000);
      } else {
        this.isGateOpen = !this.isGateOpen;

        if (this.isGateOpen) this.gateAutoClosing();
      }

      const text = this.isGateOpen ? "Gate is Open" : "Gate is close";
      console.log(`%c ${text} `, "background: #222; color: #bada55");
    }, this.timeToFinishAction);
  }

  private gateAutoClosing() {
    setTimeout(() => {
      console.log(
        "%c Gate is start autoclosing",
        "background: #222; color: #bada55"
      );
      this.gateProcessing();
    }, this.timeForAutoClosing);
  }

  private setTimeToFinishAction(time: number): void {
    this.timeToFinishAction = time;
  }
}

export default Gate;
