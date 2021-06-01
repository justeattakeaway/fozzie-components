
class DispatcherEventStream {
    constructor () {
        this.subscribers = {};
    }

    publish (eventName, data) {
        if (Array.isArray(this.subscribers[eventName])) {
            this.subscribers[eventName].forEach(callback => {
                callback(data);
            });
        }
    }

    subscribe (eventName, callback) {
        if (!Array.isArray(this.subscribers[eventName])) {
            this.subscribers[eventName] = [];
        }
        this.subscribers[eventName].push(callback);
    }
}

const eventStream = new DispatcherEventStream();

export default eventStream;
