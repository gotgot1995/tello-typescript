interface IObserver {
    receiveNotification<T>(message: T): void
}

export default IObserver;