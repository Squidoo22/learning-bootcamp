import "./styles/style.scss";
import GateSystem from "./ts/GateInterface";

console.log("hello, world");

(window as any).gateSystem = new GateSystem();
