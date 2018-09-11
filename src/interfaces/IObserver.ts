import AppEvent from "../domain/events";

interface IObserver {
    receiveNotification(event: AppEvent): void
}

export default IObserver;