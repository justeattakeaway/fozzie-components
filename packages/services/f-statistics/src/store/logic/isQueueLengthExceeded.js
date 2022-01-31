import { BATCH_QUEUE_SIZE } from '../../config';

/**
* Compares queue array length against config value. Returns true if the number of items is equal or greater than config.BATCH_QUEUE_SIZE
 *
 * @param {array} queue - The array of log statistics
 * @return {boolean} true if the number of logs in the queue is equal or greater than the config value.
 */
const isQueueLengthExceeded = queue => queue.length >= BATCH_QUEUE_SIZE;

export default isQueueLengthExceeded;
