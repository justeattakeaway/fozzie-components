import publishQueue from './publishQueue';
import { IS_BATCH_PUBLISHING_ENABLED } from '../../config';
import isQueueLengthExceeded from './isQueueLengthExceeded';

/**
import default from '../../../vite.config';
  * Controls publishing of logs. If not in batch mode or if batch size is met.
  *
  * @param {array} queue - The array of log statistics
  * @param {object} commit - Vuex commit function to trigger mutation
  * @param {object} justLog - Instance of JustLog
  */
const shouldPublishQueuedLogs = ({ queue }, commit, justLog) => {
    if (!IS_BATCH_PUBLISHING_ENABLED || isQueueLengthExceeded(queue)) {
        publishQueue(queue, commit, justLog);
    }
};

export default shouldPublishQueuedLogs;
