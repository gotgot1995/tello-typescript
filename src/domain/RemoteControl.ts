import Observer from "../interfaces/IObserver";
import ShotEvent from "./events/ShotEvent";
import SpinLeftEvent from "./events/SpinLeftEvent";
import SpinRightEvent from "./events/SpinRightEvent";

class RemoteControl implements Observer {
    public receiveNotification(event: any): void {
        if(event instanceof ShotEvent) {
            console.log("Taking shot...");
        } else if (event instanceof SpinLeftEvent){
            console.log("Spinning left...");
        } else if (event instanceof SpinRightEvent){
            console.log("Spinning right...")
        }
    }
}

export default RemoteControl;