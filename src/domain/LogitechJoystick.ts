import * as Joystick from "./joystick";
import IObservable from "../interfaces/IObservable";
import IObserver from "../interfaces/IObserver";
import AppEvent from "./events";

enum AxisCalibration {
    X_AXIS_MIN = -32767,
    X_AXIS_MAX = 32767,
    Y_AXIS_MIN = -32767,
    Y_AXIS_MAX = 32767
}

class LogitechJoystick implements IObservable {
    public static AxisCalibration = { MIN : -32767, MAX : 32767 };

    // My infrastructure properties
    private observers = []
    private joystick;
    private forward = 0;
    private backward = 0;
    private left = 0;
    private right = 0;


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
                    this.notify(AppEvent.SHOT_EVENT);
                    break;
                case 1:
                    this.notify(AppEvent.LANDING);
                    break;
                case 2:
                    this.notify(AppEvent.TAKE_OFF);
                    break;
                case 3:
                    this.notify(AppEvent.SPIN_LEFT);
                    break;
                case 4:
                    this.notify(AppEvent.SPIN_RIGHT);
                    break;
                default:
                    console.log(message);
                    break;
            }
        }
    }

    private handleAxisEvent = (message: any) : void => {
        // do nothing
        const value = message.value;
        const percentage = Math.abs(value / AxisCalibration.X_AXIS_MAX);
        if(message.number === 0) {
            if(value > 0){
                this.right = percentage;
            } else if (value > 0) {
                this.left = percentage;
            }
            console.log(`X axis: ${message.value / AxisCalibration.X_AXIS_MAX * 100}%`);
        } else if (message.number === 1) {
            console.log(`Y axis: ${message.value / AxisCalibration.Y_AXIS_MAX * 100}%`);
        }
        this.notify(AppEvent.AXIS_CHANGED);
    };

    public calibrate = () : Promise<any> => {
        return new Promise((resolve, reject) => {
            
        });
    }
}

export default LogitechJoystick;