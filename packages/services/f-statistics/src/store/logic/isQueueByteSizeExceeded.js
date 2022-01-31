import { BATCH_QUEUE_MAX_BYTES } from '../../config';

/**
* Compares queue array byte size using Blob against config value. Returns true if the Blob.size is equal or greater than config.BATCH_QUEUE_MAX_BYTES
 *
 * @param {array} queue - The array of log statistics
 * @return {boolean} true if the number of logs in the queue is equal or greater than the config value.
 */
const isQueueByteSizeExceeded = queue => {
    const queueByteSize = new Blob([JSON.stringify([...queue])]).size;
    return queueByteSize >= BATCH_QUEUE_MAX_BYTES;
};

export default isQueueByteSizeExceeded;
