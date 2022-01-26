import "./styles/style.scss";
import GateSystem from "./ts/GateSystem";
import messagesController from "./ts/MessagesController";
console.log("hello, world");

(window as any).gateSystem = new GateSystem();
(window as any).messagesController = messagesController;