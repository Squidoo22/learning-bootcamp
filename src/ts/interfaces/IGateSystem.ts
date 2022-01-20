import GateSensor from "../GateSensor";

export interface IGateSystem {
  sendSignalOnGate(): void;
  sensor: GateSensor;
}
