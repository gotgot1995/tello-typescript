import IObserver from "../interfaces/IObserver";
import UdpService from "./UdpService";
import AppConfig from "../tools/AppConfig";
import AppEvent from "../domain/events";

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

    public receiveNotification = (event: AppEvent) : void => {
        const udpService = UdpService.getInstance();

        switch(event) {
            case AppEvent.TAKE_OFF:
                console.log("Take-off...");
                udpService.send("takeoff", AppConfig.TELLO_ADDR, AppConfig.TELLO_PORT);
                break;
            case AppEvent.LANDING:
                console.log("Landing...");
                udpService.send("land", AppConfig.TELLO_ADDR, AppConfig.TELLO_PORT);
                break;
            case AppEvent.SHOT_EVENT:
                break;
            case AppEvent.SPIN_LEFT:
                console.log("Spinning left...");
                break;
            case AppEvent.SPIN_RIGHT:
                console.log("Spinning right...");
                break;
            default:
                console.warn("Unknown event", event);
                break;
        }
    }
}

export default RemoteControlService;