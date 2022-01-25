import { IGateSystem } from "./interfaces/IGatesystem";
import GateSensor from "./GateSensor";
import GateController from "./GateController";
import GateInterface from "./GateInterface";

class GateSystem implements IGateSystem {
  public sensor: GateSensor = new GateSensor();
  public controller: GateController = new GateController();
  public interface: GateInterface = new GateInterface(this.controller);
}

export default GateSystem;