import "./styles/style.scss";
import GateInterface from "./ts/GateInterface";

console.log("hello, world");

(window as any).gateInterface = new GateInterface();
