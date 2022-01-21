export interface IGate {
  isGateOpen: boolean;
  isGateProcess: boolean;

  signalProcessing(): void;
  restorePreviousStateGate(): void;
}
