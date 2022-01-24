import GateSensor from "../GateSensor";

export interface IGateInterface {
  sendSignalOnGate(): void;
  sensor: GateSensor;
}
