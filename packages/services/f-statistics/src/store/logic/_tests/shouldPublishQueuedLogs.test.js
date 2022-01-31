/* eslint-disable no-import-assign */
import shouldPublishQueuedLogs from '../shouldPublishQueuedLogs';
import isQueueLengthExceeded from '../isQueueLengthExceeded';
import isQueueByteSizeExceeded from '../isQueueByteSizeExceeded';
import publishQueue from '../publishQueue';
import * as config from '../../../config';
import { log } from '../../../tests/helpers/setup';

jest.mock('../publishQueue', () => jest.fn());
jest.mock('../isQueueLengthExceeded', () => jest.fn());
jest.mock('../isQueueByteSizeExceeded', () => jest.fn());

jest.mock('../../../config', () => ({
    __esModule: true,
    IS_BATCH_PUBLISHING_ENABLED: true,
    BATCH_INTERVAL_TIMER: 0
}));


describe('Statistics Store Logic ::', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('shouldPublishQueuedLogs ::', () => {
        it('should call publishQueue() when batch publishing is not enabled config.IS_BATCH_PUBLISHING_ENABLED', () => {
            // Arrange
            config.IS_BATCH_PUBLISHING_ENABLED = false;
            const queue = Array(1).fill(log);
            // Act
            shouldPublishQueuedLogs({ queue }, {}, {});

            // Assert
            expect(publishQueue).toBeCalled();
        });
        it('should not call publishQueue() when batch publishing is enabled isQueueLengthExceeded and isQueueByteSizeExceeded return false', () => {
            // Arrange
            config.IS_BATCH_PUBLISHING_ENABLED = true;
            isQueueLengthExceeded.mockImplementation(() => false);
            isQueueByteSizeExceeded.mockImplementation(() => false);

            // Act
            shouldPublishQueuedLogs({ queue: [] }, {}, {});

            // Assert
            expect(publishQueue).toHaveBeenCalledTimes(0);
        });
        it('should call publishQueue() when batch publishing is enabled and isQueueLengthExceeded returns true ', () => {
            // Arrange
            config.IS_BATCH_PUBLISHING_ENABLED = true;
            isQueueLengthExceeded.mockImplementation(() => true);
            isQueueByteSizeExceeded.mockImplementation(() => false);

            // Act
            shouldPublishQueuedLogs({ queue: [] }, {}, {});

            // Assert
            expect(publishQueue).toBeCalled();
        });
        it('should call publishQueue() when batch publishing is enabled and isQueueByteSizeExceeded returns true ', () => {
            // Arrange
            config.IS_BATCH_PUBLISHING_ENABLED = true;
            isQueueLengthExceeded.mockImplementation(() => false);
            isQueueByteSizeExceeded.mockImplementation(() => true);

            // Act
            shouldPublishQueuedLogs({ queue: [] }, {}, {});

            // Assert
            expect(publishQueue).toBeCalled();
        });
        it('should call publishQueue() when batch publishing is enabled and isQueueLengthExceeded and isQueueByteSizeExceeded returns true ', () => {
            // Arrange
            config.IS_BATCH_PUBLISHING_ENABLED = true;
            isQueueLengthExceeded.mockImplementation(() => true);
            isQueueByteSizeExceeded.mockImplementation(() => true);

            // Act
            shouldPublishQueuedLogs({ queue: [] }, {}, {});

            // Assert
            expect(publishQueue).toBeCalled();
        });
    });
});
