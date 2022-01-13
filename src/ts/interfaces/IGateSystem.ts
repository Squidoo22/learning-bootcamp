export interface IGateSystem {
  isGateOpen: boolean;
  isGateProcess: boolean;
  defaultTimeToFinish: number;
  timeToFinishAction: Date;

  gateAction(restore?: boolean): void;
}
