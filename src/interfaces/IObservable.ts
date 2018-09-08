import Observer from "./IObserver";
import AppEvent from "../domain/events/AppEvent";

interface IObservable {
    registerObserver(observer: Observer)
    removeObserver(observer: Observer)
    notify(event: AppEvent)
}

export default IObservable;