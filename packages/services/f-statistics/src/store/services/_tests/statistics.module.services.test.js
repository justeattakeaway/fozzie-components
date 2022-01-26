import isQueueLengthExceeded from '../isQueueLengthExceeded';
import shouldPublishQueuedLogs from '../shouldPublishQueuedLogs';
// import startBatchPublishTimer from '../startBatchPublishTimer;';
import publishQueue from '../publishQueue';
import * as config from '../../../config';
import { log } from '../../../tests/helpers/setup';

jest.mock('../../../config', () => ({
    __esModule: true,
    IS_BATCH_PUBLISHING_ENABLED: true,
    BATCH_QUEUE_SIZE: 5,
    BATCH_INTERVAL_TIMER: 0
}));

jest.mock('../publishQueue', () => jest.fn());

describe('Statistics Utils ::', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('isQueueLengthExceeded ::', () => {
        it('should return false if queue is less than config.BATCH_QUEUE_SIZE', () => {
            // Arrange
            const queue = Array(3).fill(log);

            // Act
            const result = isQueueLengthExceeded(queue);

            // Assert
            expect(result).toBeFalsy();
        });
        it('should return true if queue is equal to config.BATCH_QUEUE_SIZE', () => {
            // Arrange
            const queue = Array(5).fill(log);

            // Act
            const result = isQueueLengthExceeded(queue);

            // Assert
            expect(result).toBeTruthy();
        });
        it('should return true if queue is greater than config.BATCH_QUEUE_SIZE', () => {
            // Arrange
            const queue = Array(6).fill(log);

            // Act
            const result = isQueueLengthExceeded(queue);

            // Assert
            expect(result).toBeTruthy();
        });
    });


    describe('shouldPublishQueuedLogs ::', () => {
        it('should call publishQueue() when batch publishing is not enabled config.IS_BATCH_PUBLISHING_ENABLED', () => {
            // Arrange
            // eslint-disable-next-line no-import-assign
            config.IS_BATCH_PUBLISHING_ENABLED = false;
            const queue = Array(1).fill(log);
            // Act
            shouldPublishQueuedLogs({ queue }, {}, {});

            // Assert
            expect(publishQueue).toBeCalled();
        });
        it('should not call publishQueue() when batch publishing is enabled and the queue is empty', () => {
            // Arrange
            // eslint-disable-next-line no-import-assign
            config.IS_BATCH_PUBLISHING_ENABLED = true;
            const queue = [];
            // Act
            shouldPublishQueuedLogs({ queue }, {}, {});

            // Assert
            expect(publishQueue).toHaveBeenCalledTimes(0);
        });
        it('should not publishQueue() when batch publishing is enabled and the queue is equal to config.BATCH_QUEUE_SIZE ', () => {
            // Arrange
            // eslint-disable-next-line no-import-assign
            config.IS_BATCH_PUBLISHING_ENABLED = true;
            const queue = Array(5).fill(log);
            // Act
            shouldPublishQueuedLogs({ queue }, {}, {});

            // Assert
            expect(publishQueue).toBeCalled();
        });
    });

    describe('startBatchPublishTimer ::', () => {

    });
});
