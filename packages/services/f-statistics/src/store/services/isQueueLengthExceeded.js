import { BATCH_QUEUE_SIZE } from '../../config';

/**
* Publishes logs individually using Just Log before clearing the interval and removing logs from state
 *
 * @param {array} queue - The array of log statistics
 * @return {boolean} true if the number of logs in the queue is equal or greater than the config value.
 */
const isQueueLengthExceeded = queue => queue.length >= BATCH_QUEUE_SIZE;

export default isQueueLengthExceeded;
