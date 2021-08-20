import analyticsModule from '../analytics.module';
import {
    defaultState,
    modifiedState,
    newEvent
} from '../../tests/helpers/setup';
import {
    UPDATE_PLATFORM_DATA,
    UPDATE_EVENTS,
    CLEAR_EVENTS
} from '../mutation-types';

describe('Analytics Module ::', () => {
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
        expect(analyticsModule.state()).toEqual(defaultState);
    });

    describe('actions ::', () => {
        describe('updatePlatformData ::', () => {
            it('should call the `updatePlatformData` mutation', () => {
                // Act
                analyticsModule.actions.updatePlatformData({ commit }, modifiedState.platformData);

                // Assert
                expect(commit).toHaveBeenLastCalledWith('updatePlatformData', modifiedState.platformData);
            });
        });

        describe('updateEvents ::', () => {
            it('should call the `updateEvents` mutation', () => {
                // Act
                analyticsModule.actions.updateEvents({ commit }, newEvent);

                // Assert
                expect(commit).toHaveBeenLastCalledWith('updateEvents', newEvent);
            });
        });

        describe('clearEvents ::', () => {
            it('should call the `clearEvents` mutation', () => {
                // Act
                analyticsModule.actions.clearEvents({ commit });

                // Assert
                expect(commit).toHaveBeenLastCalledWith(CLEAR_EVENTS);
            });
        });
    });

    describe('mutations ::', () => {
        describe(`${UPDATE_PLATFORM_DATA} ::`, () => {
            it('should update state with `platformData`', () => {
                // Act
                analyticsModule.mutations[UPDATE_PLATFORM_DATA](state, modifiedState.platformData);

                // Assert
                expect(state.platformData).toEqual(modifiedState.platformData);
            });

            it('should not overwrite the serverside platformData when saving the clientside platformData', () => {
                // Arrange
                const currentState = {
                    platformData: {
                        environment: 'test-environment',
                        jeUserPercentage: 88,
                        version: '9.8.7.6',
                        instancePosition: '999'
                    }
                };
                const clientsidePlatformData = {
                    name: 'test-name',
                    appType: 'test-appType',
                    applicationId: 9,
                    userAgent: 'test-userAgent',
                    branding: 'test-branding',
                    country: 'zu',
                    language: 'ze',
                    currency: 'zud'
                };
                const expected = { ...currentState.platformData, ...clientsidePlatformData };

                // Act
                analyticsModule.mutations[UPDATE_PLATFORM_DATA](currentState, clientsidePlatformData);

                // Assert
                expect(currentState.platformData).toEqual(expected);
            });
        });

        describe(`${UPDATE_EVENTS} ::`, () => {
            it('should update state with a new `event`', () => {
                // Arrange
                state.events = [];

                // Act
                analyticsModule.mutations[UPDATE_EVENTS](state, newEvent);

                // Assert
                expect(state.events).toEqual([newEvent]);
            });
        });

        describe(`${CLEAR_EVENTS} ::`, () => {
            it('should clear the state `events`', () => {
                // Arrange
                state.events = [];
                state.events.push(newEvent);

                // Act
                analyticsModule.mutations[CLEAR_EVENTS](state);

                // Assert
                expect(state.events).toEqual([]);
            });
        });
    });
});
