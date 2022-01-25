export interface IGateInterface {
  sendSignalOnGate(): void;
  setTimeForAutoClosingGate(time: number): void;
  setTimeForGateAction(time: number): void
}
