/* eslint-disable camelcase */
import defaultOptions from './defaultOptions';
import statisticsModule from './store/statistics.module';
import { IS_BATCH_PUBLISHING_ENABLED, BATCH_QUEUE_SIZE, BATCH_INTERVAL_TIMER } from './config';

export default class StatisticsClient {
    #configuration;
    #justLogInstance;
    #basePayload;
    #store;
    #batchIntervalTimer;

    constructor (justLogInstance, options = {}, basePayload = {}, store) {
        this.#configuration = {
            ...defaultOptions,
            ...options
        };
        this.#basePayload = this.#makeBasePayload(basePayload);
        this.#justLogInstance = justLogInstance;
        this.#store = store;
        this.#store.registerModule(this.#configuration.namespace, statisticsModule, { preserveState: !!store.state[`${this.#configuration.namespace}`] });

        if (IS_BATCH_PUBLISHING_ENABLED) {
            this.#startBatchTimer();
        }
    }

    #makeBasePayload (basePayload) {
        return {
            ...basePayload,
            je_feature: 'f-statistics',
            je_logType: 'client-stats',
            je_feature_for: this.#configuration?.featureName || 'Unspecified',
            je_environment: this.#configuration?.environment || 'Unspecified'
        };
    }

    #startBatchTimer () {
        if (BATCH_INTERVAL_TIMER > 0) {
            clearInterval(this.#batchIntervalTimer);
            this.#batchIntervalTimer = setInterval(this.#batchTimerComplete.bind(this), BATCH_INTERVAL_TIMER);
        }
    }

    #makeLog (message, statisticPayload) {
        return {
            message,
            payload: {
                ...statisticPayload,
                ...this.#basePayload
            }
        };
    }

    get #publishQueue () {
        return this.#store.state[`${this.#configuration.namespace}`].publishQueue;
    }

    #batchTimerComplete () {
        console.log(`#batchIntervalTimer complete queue length: ${this.#publishQueue.length}`);
        this.#processQueue();
    }

    get #isQueueLengthPassed () {
        return this.#publishQueue.length >= BATCH_QUEUE_SIZE;
    }

    // eslint-disable-next-line class-methods-use-this
    get #isQueueByteSizeExceeded () {
        return false;
    }

    #checkQueue () {
        if (this.#isQueueLengthPassed || this.#isQueueByteSizeExceeded) {
            this.#startBatchTimer();
            this.#processQueue();
        }
    }

    #processQueue () {
        const logs = this.#publishQueue.splice(0, BATCH_QUEUE_SIZE);
        logs.forEach(log => this.logSingleMessage(log));
    }


    publish (message, statisticPayload) {
        const log = this.#makeLog(message, statisticPayload);

        if (IS_BATCH_PUBLISHING_ENABLED) {
            console.log('Added to publishQueue');
            this.#store.dispatch(`${this.#configuration.namespace}/addToPublishQueue`, log);
            console.log(this.#publishQueue);
            this.#checkQueue();
            return;
        }

        this.logSingleMessage(log);
    }

    logSingleMessage ({ message, payload }) {
        this.#justLogInstance.info(message, {
            ...payload
        });
    }
}
