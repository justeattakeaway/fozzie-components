import isQueueLengthExceeded from '../isQueueLengthExceeded';
import { log } from '../../../tests/helpers/setup';
// eslint-disable-next-line no-unused-vars
import * as config from '../../../config';

jest.mock('../../../config', () => ({
    __esModule: true,
    IS_BATCH_PUBLISHING_ENABLED: true,
    BATCH_QUEUE_SIZE: 5,
    BATCH_INTERVAL_TIMER: 0
}));
describe('Statistics Store Logic ::', () => {
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
});
