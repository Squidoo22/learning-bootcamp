import "./styles/style.scss";
import GateSystem from "./ts/GateSystem";

console.log("hello, world");
const testMessage: string = "TypeScript works";
console.log(testMessage);

(window as any).gateSystem = new GateSystem();
