export interface IGateController {
  isGateOpen: boolean;
  isGateProcess: boolean;

  gateProcessing(): void;
  restoreGatePreviousState(): void;
}
