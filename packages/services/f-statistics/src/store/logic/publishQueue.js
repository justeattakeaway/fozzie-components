import {
    CLEAR_PUBLISH_QUEUE, CLEAR_INTERVAL_TIMER
} from '../mutation-types';

/**
import default from '../../../vite.config';
  * Publishes logs individually using Just Log before clearing the interval and removing logs from state.
  *
  * @param {array} queue - The array of log statistics
  * @param {object} commit - Vuex commit function to trigger mutation
  * @param {object} justLog - Instance of JustLog
  */
const publishQueue = (queue, commit, justLog) => {
    queue.forEach(({ message, payload }) => {
        justLog.info(message, {
            ...payload
        });
    });
    commit(CLEAR_PUBLISH_QUEUE);
    commit(CLEAR_INTERVAL_TIMER);
};

export default publishQueue;
