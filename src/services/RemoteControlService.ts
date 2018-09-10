import AppEvent from "../domain/events/AppEvent";
import ShotEvent from "../domain/events/ShotEvent";
import SpinLeftEvent from "../domain/events/SpinLeftEvent";
import SpinRightEvent from "../domain/events/SpinRightEvent";
import IObserver from "../interfaces/IObserver";
import UdpService from "./UdpService";
import TakeOffEvent from "../domain/events/TakeOffEvent";
import LandingEvent from "../domain/events/LandingEvent";
import AppConfig from "../tools/AppConfig";

class RemoteControlService implements IObserver {
    private static instance;

    private constructor(){
        if (RemoteControlService.instance) {
            throw new Error("Error - use Singleton.getInstance()");
        }
    }

    public static getInstance = () : RemoteControlService => {
        return RemoteControlService.instance || new RemoteControlService();
    }

    public receiveNotification = (event: AppEvent): void => {
        if(event instanceof ShotEvent) {
            console.log("Taking shot...");
        } else if (event instanceof SpinLeftEvent){
            console.log("Spinning left...");
        } else if (event instanceof SpinRightEvent){
            console.log("Spinning right...")
        } else if (event instanceof TakeOffEvent) {
            console.log("Take-off...");
            const udp_service = UdpService.getInstance();
            udp_service.send("takeoff", AppConfig.TELLO_ADDR, AppConfig.TELLO_PORT);
        } else if (event instanceof LandingEvent) {
            console.log("Landing...");
            const udp_service = UdpService.getInstance();
            udp_service.send("land", AppConfig.TELLO_ADDR, AppConfig.TELLO_PORT);
        }
    }
}

export default RemoteControlService;