import * as Joystick from "./joystick";
import Observable from "../interfaces/IObservable";
import Observer from "../interfaces/IObserver";
import AppEvent from "./events/AppEvent";
import ShotEvent from "./events/ShotEvent";
import SpinLeftEvent from "./events/SpinLeftEvent";
import SpinRightEvent from "./events/SpinRightEvent";

class LogitechJoystick implements Observable {
    // My infrastructure properties
    private observers = []
    private joystick;

    public constructor(){
        this.joystick = new Joystick(0);
        this.joystick.on('button', this.handleButtonEvent);
        this.joystick.on('axis', this.handleAxisEvent);
    }

    public registerObserver = (observer: Observer) => {
        this.observers.push(observer);
    }

    public removeObserver = (observer: Observer) => {
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

    public shot = (value: number) => {
        if(value === 1)
            this.notify(new ShotEvent());
    }

    public spinLeft = (value: number) => {
        if(value === 1)
            this.notify(new SpinLeftEvent());
    }

    public spinRight = (value: number) => {
        if(value === 1)
            this.notify(new SpinRightEvent());
    }

    private handleButtonEvent = (message: any) => {
        if(message.number !== undefined){
            switch(message.number){
                // shoot button
                case 0:
                    this.shot(message.value);
                    break;
                case 3:
                    this.spinLeft(message.value);
                    break;
                case 4:
                    this.spinRight(message.value);
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