import IObserver from "./IObserver";
import AppEvent from "../domain/events";

interface IObservable {
    registerObserver(observer: IObserver)
    removeObserver(observer: IObserver)
    notify(event: AppEvent)
}

export default IObservable;