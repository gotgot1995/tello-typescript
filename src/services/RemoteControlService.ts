import Observer from "../interfaces/IObserver";
import ShotEvent from "../domain/events/ShotEvent";
import SpinLeftEvent from "../domain/events/SpinLeftEvent";
import SpinRightEvent from "../domain/events/SpinRightEvent";
import AppEvent from "../domain/events/AppEvent";

class RemoteControlService implements Observer {
    public receiveNotification(event: AppEvent): void {
        if(event instanceof ShotEvent) {
            console.log("Taking shot...");
        } else if (event instanceof SpinLeftEvent){
            console.log("Spinning left...");
        } else if (event instanceof SpinRightEvent){
            console.log("Spinning right...")
        }
    }
}

export default RemoteControlService;