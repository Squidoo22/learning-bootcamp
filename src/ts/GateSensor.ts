import { IGateSensor } from "./interfaces/IGateSensor";
import pubSub from "./PubSub";

class GateSensor implements IGateSensor {
  public sendAlarm(): void {
    pubSub.publish('sensor:movementDetected');
  }
}

export default GateSensor;
