import * as Joystick from "./joystick";
import IObservable from "../interfaces/IObservable";
import IObserver from "../interfaces/IObserver";
import AppEvent from "./events/AppEvent";
import ShotEvent from "./events/ShotEvent";
import SpinLeftEvent from "./events/SpinLeftEvent";
import SpinRightEvent from "./events/SpinRightEvent";
import LandingEvent from "./events/LandingEvent";
import TakeOffEvent from "./events/TakeOffEvent";

class LogitechJoystick implements IObservable {
    // My infrastructure properties
    private observers = []
    private joystick;

    public constructor(){
        this.joystick = new Joystick(0);
        this.joystick.on('button', this.handleButtonEvent);
        this.joystick.on('axis', this.handleAxisEvent);
    }

    public registerObserver = (observer: IObserver) => {
        this.observers.push(observer);
    }

    public removeObserver = (observer: IObserver) => {
        for(let i = 0; i < this.observers.length; i++){
            if(this.observers[i] === observer) {
                this.observers.splice(i,1);
            }
        }
    }

    public notify = (event: AppEvent) => {
        for(let i = 0; i < this.observers.length; i++){
            this.observers[i].receiveNotification(event);
        }
    }

    private handleButtonEvent = (message: any) => {
        if(message.number !== undefined && message.value === 1){
            switch(message.number){
                // shoot button
                case 0:
                    this.notify(new ShotEvent());
                    break;
                case 1:
                    this.notify(new LandingEvent());
                    break;
                case 2:
                    this.notify(new TakeOffEvent());
                    break;
                case 3:
                    this.notify(new SpinLeftEvent());
                    break;
                case 4:
                    this.notify(new SpinRightEvent());
                    break;
                default:
                    console.log(message);
                    break;
            }
        }
    }

    private handleAxisEvent(message: object){
        // do nothing
    };
}

export default LogitechJoystick;