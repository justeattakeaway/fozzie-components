import {
    defaultState,
    modifiedState,
    newEvent
} from '@/tests/helpers/setup';
import AnalyticsModule from '@/store/analytics.module';
import {
    UPDATE_PLATFORM_DATA,
    UPDATE_PAGE_DATA,
    UPDATE_EVENTS,
    CLEAR_EVENTS
} from '@/store/mutation-types';

const { actions, mutations } = AnalyticsModule;
const {
    updatePlatformData,
    updatePageData,
    updateEvents,
    clearEvents
} = actions;

describe('Analytics Module ::', () => {
    let state;
    let commit;

    beforeEach(() => {
        // Arrange
        state = Object.assign({}, defaultState); // eslint-disable-line
        commit = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create default state when initialised.', () => {
        // Assert
        expect(AnalyticsModule.state()).toEqual(defaultState);
    });

    describe('actions ::', () => {
        describe('updatePlatformData ::', () => {
            it('should call the `updatePlatformData` mutation', () => {
                // Act
                updatePlatformData({ commit }, modifiedState.platformData);

                // Assert
                expect(commit).toHaveBeenLastCalledWith('updatePlatformData', modifiedState.platformData);
            });
        });

        describe('updatePageData ::', () => {
            it('should call the `updatePageData` mutation', () => {
                // Act
                updatePageData({ commit }, modifiedState.pageData);

                // Assert
                expect(commit).toHaveBeenLastCalledWith('updatePageData', modifiedState.pageData);
            });
        });

        describe('updateEvents ::', () => {
            it('should call the `updateEvents` mutation', () => {
                // Act
                updateEvents({ commit }, newEvent);

                // Assert
                expect(commit).toHaveBeenLastCalledWith('updateEvents', newEvent);
            });
        });

        describe('clearEvents ::', () => {
            it('should call the `clearEvents` mutation', () => {
                // Act
                clearEvents({ commit });

                // Assert
                expect(commit).toHaveBeenLastCalledWith(CLEAR_EVENTS);
            });
        });
    });

    describe('mutations ::', () => {
        describe(`${UPDATE_PLATFORM_DATA} ::`, () => {
            it('should update state with `platformData`', () => {
                // Act
                mutations[UPDATE_PLATFORM_DATA](state, modifiedState.platformData);

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
                mutations[UPDATE_PLATFORM_DATA](currentState, clientsidePlatformData);

                // Assert
                expect(currentState.platformData).toEqual(expected);
            });
        });

        describe(`${UPDATE_PAGE_DATA} ::`, () => {
            it('should update state with `pageData`', () => {
                // Act
                mutations[UPDATE_PAGE_DATA](state, modifiedState.pageData);

                // Assert
                expect(state.pageData).toEqual(modifiedState.pageData);
            });

            it('should not overwrite the serverside pageData when saving the clientside pageData', () => {
                // Arrange
                const currentState = {
                    pageData: {
                        httpStatusCode: 200
                    }
                };
                const clientsidePageData = {
                    name: 'test-name',
                    group: 'test-group',
                    isCached: false,
                    conversationId: '460cc3a8-83f7-4e80-bb46-c8a69967f249',
                    requestId: '6cbe6509-9122-4e66-a90a-cc483c34282e',
                    orientation: 'Landscape',
                    display: 'wide'
                };
                const expected = { ...currentState.pageData, ...clientsidePageData };

                // Act
                mutations[UPDATE_PAGE_DATA](currentState, clientsidePageData);

                // Assert
                expect(currentState.pageData).toEqual(expected);
            });
        });

        describe(`${UPDATE_EVENTS} ::`, () => {
            it('should update state with a new `event`', () => {
                // Arrange
                state.events = [];

                // Act
                mutations[UPDATE_EVENTS](state, newEvent);

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
                mutations[CLEAR_EVENTS](state);

                // Assert
                expect(state.events).toEqual([]);
            });
        });
    });
});
