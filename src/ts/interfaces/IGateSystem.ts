import GateSensor from "../GateSensor";
import GateInterface from "../GateInterface";
import GateController from "../GateController";

export interface IGateSystem {
  sensor: GateSensor;
  interface: GateInterface;
  controller: GateController;
}