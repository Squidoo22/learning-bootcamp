export interface IGate {
  isGateOpen: boolean;
  isGateProcess: boolean;

  gateProcessing(): void;
  restorePreviousStateGate(): void;
}
