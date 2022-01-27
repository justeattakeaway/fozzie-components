import { log } from '../../../tests/helpers/setup';
import publishQueue from '../publishQueue';
import {
    CLEAR_PUBLISH_QUEUE, CLEAR_INTERVAL_TIMER
} from '../../mutation-types';

const commit = jest.fn();
const justLog = {
    info: jest.fn()
};

describe('Statistics Store Logic ::', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('publishQueue ::', () => {
        it('should call Just Log passing the log message and payload', () => {
            // Act
            const queue = [log];
            publishQueue(queue, commit, justLog);

            // Assert
            expect(justLog.info).toHaveBeenCalledWith(log.message, { ...log.payload });
        });
        it('should call Just Log for each log in the queue', () => {
            // Act
            const queue = Array(5).fill(log);
            publishQueue(queue, commit, justLog);

            // Assert
            expect(justLog.info).toHaveBeenCalledTimes(5);
        });
        it('should call the `CLEAR_PUBLISH_QUEUE` mutation', () => {
            // Act
            const queue = [log];
            publishQueue(queue, commit, justLog);

            // Assert
            expect(commit).toHaveBeenCalledWith(CLEAR_PUBLISH_QUEUE);
        });
        it('should call the `CLEAR_INTERVAL_TIMER` mutation', () => {
            // Act
            const queue = [log];
            publishQueue(queue, commit, justLog);

            // Assert
            expect(commit).toHaveBeenCalledWith(CLEAR_INTERVAL_TIMER);
        });
    });
});
