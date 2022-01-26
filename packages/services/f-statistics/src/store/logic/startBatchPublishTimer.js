import publishQueue from './publishQueue';
import { IS_BATCH_PUBLISHING_ENABLED } from '../../config';
import {
    SET_INTERVAL_TIMER
} from '../mutation-types';

/**
import default from '../../../vite.config';
  * Calls mutation to start publish timer if it does not already exist and batch mode is enabled.
  *
  * @param {object} state - The state from the store
  * @param {array} state.queue - The array of log statistics
  * @param {object} state.interval - The timer variable
  * @param {object} commit - Vuex commit function to trigger mutation
  * @param {object} justLog - Instance of JustLog
  */
const startBatchPublishTimer = ({ queue, interval }, commit, justLog) => {
    if (!interval && IS_BATCH_PUBLISHING_ENABLED) {
        commit(SET_INTERVAL_TIMER, () => publishQueue(queue, commit, justLog));
    }
};

export default startBatchPublishTimer;
