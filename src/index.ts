import LogitechJoystick from "./domain/LogitechJoystick";
import RemoteControlService from "./services/RemoteControlService";
import UdpService from "./services/UdpService";
import AppConfig from "./tools/AppConfig";

// let tello_port = 8889;

// let udp_service = UdpService.getInstance();
// udp_service.listen();
// udp_service.send("command", AppConfig.TELLO_ADDR, AppConfig.TELLO_PORT);

// let remote_service = RemoteControlService.getInstance();

let attack3 = new LogitechJoystick();

// attack3.registerObserver(remote_service);