/* eslint-disable no-import-assign */
import startBatchPublishTimer from '../startBatchPublishTimer';
import * as config from '../../../config';
import { log } from '../../../tests/helpers/setup';
import {
    SET_INTERVAL_TIMER
} from '../../mutation-types';

jest.mock('../../../config', () => ({
    __esModule: true,
    IS_BATCH_PUBLISHING_ENABLED: true
}));

const commit = jest.fn();
const justLog = jest.fn();

describe('Statistics Store Logic ::', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('startBatchPublishTimer ::', () => {
        it('should call `SET_INTERVAL_TIMER` mutation', () => {
            // Arrange
            const state = { queue: [log], interval: null };

            // Act
            startBatchPublishTimer(state, commit, justLog);

            // Assert
            expect(commit).toHaveBeenCalledTimes(1);
            expect(commit).toHaveBeenCalledWith(SET_INTERVAL_TIMER, expect.any(Function));
        });
        it('should not call `SET_INTERVAL_TIMER` mutation when IS_BATCH_PUBLISHING_ENABLED is false ', () => {
            // Arrange
            config.IS_BATCH_PUBLISHING_ENABLED = false;
            const state = { queue: [log], interval: null };

            // Act
            startBatchPublishTimer(state, commit, justLog);

            // Assert
            expect(commit).toHaveBeenCalledTimes(0);
        });
        it('should not call `SET_INTERVAL_TIMER` mutation when state.interval is defined', () => {
            // Arrange
            config.IS_BATCH_PUBLISHING_ENABLED = false;
            const state = { queue: [log], interval: 1 };

            // Act
            startBatchPublishTimer(state, commit, justLog);

            // Assert
            expect(commit).toHaveBeenCalledTimes(0);
        });
    });
});
