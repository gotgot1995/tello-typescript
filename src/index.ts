import LogitechJoystick from "./domain/logitech";
import RemoteControl from "./domain/RemoteControl";

let attack3 = new LogitechJoystick();

let observer = new RemoteControl();

attack3.registerObserver(observer);