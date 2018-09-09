import LogitechJoystick from "./domain/logitech";
import RemoteControlService from "./services/RemoteControlService";
import UdpService from "./services/UdpService";

// let attack3 = new LogitechJoystick();

// let observer = new RemoteControlService();

// attack3.registerObserver(observer);

let udp_service = UdpService.getInstance();
udp_service.listen();