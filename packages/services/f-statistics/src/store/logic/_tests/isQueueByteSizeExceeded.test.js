import isQueueByteSizeExceeded from '../isQueueByteSizeExceeded';
import { log } from '../../../tests/helpers/setup';
// eslint-disable-next-line no-unused-vars
import * as config from '../../../config';

jest.mock('../../../config', () => ({
    __esModule: true,
    IS_BATCH_PUBLISHING_ENABLED: true,
    BATCH_QUEUE_SIZE: 50,
    BATCH_INTERVAL_TIMER: 0,
    BATCH_QUEUE_MAX_BYTES: 1000
}));
describe('Statistics Store Logic ::', () => {
    describe('isQueueByteSizeExceeded ::', () => {
        it('should return false if queue byte size is less than config.isQueueByteSizeExceeded', () => {
            // Arrange
            const queue = Array(3).fill(log);

            // Act
            const result = isQueueByteSizeExceeded(queue);

            // Assert
            expect(result).toBeFalsy();
        });
        it('should return true if queue is equal to config.isQueueByteSizeExceeded', () => {
            // Arrange
            const queue = Array(15).fill(log);

            // Act
            const result = isQueueByteSizeExceeded(queue);

            // Assert
            expect(result).toBeTruthy();
        });
    });
});
