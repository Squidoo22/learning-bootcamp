export interface IGateSystem {
  isGateOpen: boolean;
  isGateProcess: boolean;
  defaultTimeToClose: number;
  timeToFinishAction: Date;

  gateAction(restore?: boolean): void;
}
