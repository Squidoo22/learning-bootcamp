import GateSystem from "../GateSystem";

export interface IGateSensor {
  gateSystem: GateSystem;
  sendAlarm(): void;
}
