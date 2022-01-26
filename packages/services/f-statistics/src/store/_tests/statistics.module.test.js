import statisticsModule from '../statistics.module';
import {
    ADD_TO_PUBLISH_QUEUE, CLEAR_PUBLISH_QUEUE, SET_INTERVAL_TIMER, CLEAR_INTERVAL_TIMER
} from '../mutation-types';
import {
    defaultState,
    log
} from '../../tests/helpers/setup';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'clearInterval');

describe('Statistics Module ::', () => {
    let state;
    // let commit;

    beforeEach(() => {
        // Arrange
        state = { ...defaultState };
        // commit = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create default state when initialised.', () => {
        // Assert
        const actualState = statisticsModule.state();
        expect(actualState).toEqual(defaultState);
    });

    describe('actions ::', () => { });

    describe('mutations ::', () => {
        describe(`${ADD_TO_PUBLISH_QUEUE} ::`, () => {
            it('should update state.queue with a new `log`', () => {
                // Arrange
                state.queue = [];

                // Act
                statisticsModule.mutations[ADD_TO_PUBLISH_QUEUE](state, log);

                // Assert
                expect(state.queue).toEqual([log]);
            });
            it('should add to exisiting state.queue', () => {
                // Arrange
                state.queue = [log];
                const expected = [log, log];
                // Act
                statisticsModule.mutations[ADD_TO_PUBLISH_QUEUE](state, log);

                // Assert
                expect(state.queue.length).toEqual(2);
                expect(state.queue).toEqual(expected);
            });
        });
        describe(`${CLEAR_PUBLISH_QUEUE} ::`, () => {
            it('should clear state.queue', () => {
                // Arrange
                state.queue = [log, log, log];

                // Act
                statisticsModule.mutations[CLEAR_PUBLISH_QUEUE](state);

                // Assert
                expect(state.queue.length).toEqual(0);
                expect(state.queue).toEqual([]);
            });
        });
        describe(`${SET_INTERVAL_TIMER} ::`, () => {
            it('should call setInterval and assign top state.interval', () => {
                state.interval = null;

                // Act
                statisticsModule.mutations[SET_INTERVAL_TIMER](state);

                // Assert
                expect(state.interval).toEqual(1);
                expect(setInterval).toHaveBeenCalled();
            });
        });
        describe(`${CLEAR_INTERVAL_TIMER} ::`, () => {
            it('should clear state.interval', () => {
                // Arrange
                state.interval = 1;

                // Act
                statisticsModule.mutations[CLEAR_INTERVAL_TIMER](state);

                // Assert
                expect(state.interval).toEqual(null);
            });
            it('should call clearInterval to cancel the time', () => {
                // Arrange
                state.interval = {};

                // Act
                statisticsModule.mutations[CLEAR_INTERVAL_TIMER](state);

                // Assert
                expect(clearInterval).toHaveBeenCalled();
            });
        });
    });
});
