import statisticsModule from '../statistics.module';
import {
    ADD_LOG, CLEAR_LOGS
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
    let commit;

    beforeEach(() => {
        // Arrange
        state = { ...defaultState };
        commit = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create default state when initialised.', () => {
        // Assert
        const actualState = statisticsModule.state();
        expect(actualState).toEqual(defaultState);
    });

    describe('actions ::', () => {
        describe('addLog ::', () => {
            it('should call the `ADD_LOG` mutation', () => {
                // Act
                statisticsModule.actions.addLog({ commit }, log);

                // Assert
                expect(commit).toHaveBeenLastCalledWith(ADD_LOG, log);
            });
        });

        describe('clearLogs ::', () => {
            it('should call the `CLEAR_LOGS` mutation', () => {
                // Act
                statisticsModule.actions.clearLogs({ commit });

                // Assert
                expect(commit).toHaveBeenLastCalledWith(CLEAR_LOGS);
            });
        });
    });

    describe('mutations ::', () => {
        describe(`${ADD_LOG} ::`, () => {
            it('should update state.queue with a new `log`', () => {
                // Arrange
                state.queue = [];

                // Act
                statisticsModule.mutations[ADD_LOG](state, log);

                // Assert
                expect(state.logs).toEqual([log]);
            });
            it('should add to exisiting state.queue', () => {
                // Arrange
                state.queue = [log];
                const expected = Array(2).fill(log);
                // Act
                statisticsModule.mutations[ADD_LOG](state, log);

                // Assert
                expect(state.logs.length).toEqual(2);
                expect(state.logs).toEqual(expected);
            });
        });
        describe(`${CLEAR_LOGS} ::`, () => {
            it('should clear state.queue', () => {
                // Arrange
                state.queue = Array(3).fill(log);

                // Act
                statisticsModule.mutations[CLEAR_LOGS](state);

                // Assert
                expect(state.logs.length).toEqual(0);
                expect(state.logs).toEqual([]);
            });
        });
    });
});
