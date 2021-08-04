export default class AnalyticService {
    constructor (store, options) {
        this.namespace = options.namespace;
        this.store = store;
    }

    // eslint-disable-next-line class-methods-use-this
    push (event) {
        // TODO; // eslint-disable-line
        return event;
    }
}
