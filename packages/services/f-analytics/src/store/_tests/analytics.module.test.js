import AnalyticsModule from '../analytics.module';
import {
    defaultState,
    modifieldState,
    newEvent
} from '../../tests/helpers/setup';
import {
    PUSH_PLATFORM_DATA,
    PUSH_EVENT,
    CLEAR_EVENTS
} from '../mutation-types';

const { actions, mutations } = AnalyticsModule;
const { pushPlatformData, pushEvent } = actions;

describe('Analytics Module ::', () => {
    let state;
    let commit;

    beforeEach(() => {
        // Arrange
        state = Object.assign({}, defaultState); // eslint-disable-line
        commit = jest.fn((mutation, mutationPayload) => {
            // Replace the current state with the modified during the test
            // thus allow assertions on the final state
            if (mutation === PUSH_PLATFORM_DATA) {
                state.platformData = { ...state.platformData, ...mutationPayload };
            }
            if (mutation === PUSH_EVENT) {
                state.events = [...state.events, mutationPayload];
            }
            if (mutation === CLEAR_EVENTS) {
                state.events = [];
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create default state when initialised.', () => {
        // Assert
        expect(AnalyticsModule.state()).toEqual(defaultState);
    });

    describe('actions ::', () => {
        describe('pushPlatformData ::', () => {
            it('should call the `pushPlatformData` mutation', () => {
                // Act
                pushPlatformData({ commit, state }, modifieldState.platformData);

                // Assert
                expect(commit).toHaveBeenLastCalledWith('pushPlatformData', modifieldState.platformData);
            });

            it('should push the `platformData` if clientside & dataLayer present', () => {
                // Arrange
                const windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));

                // Act
                pushPlatformData({ commit, state }, modifieldState.platformData);

                // Assert
                expect(windowsPushSpy).toHaveBeenLastCalledWith({ platformData: { ...modifieldState.platformData } });
                expect(state.platformData).toEqual(modifieldState.platformData);
            });

            it('should not push the `platformData` if serverside', () => {
                // Arrange
                const windowsPushSpy = jest.spyOn(window.dataLayer, 'push');
                jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);

                // Act
                pushPlatformData({ commit, state }, modifieldState.platformData);

                // Assert
                expect(windowsPushSpy).not.toHaveBeenCalled();
                expect(state.platformData).toEqual(modifieldState.platformData);
            });

            it('should not push the `platformData` if clientside & dataLayer not present', () => {
                // Arrange
                const windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                const windowSpy = jest.spyOn(global, 'window', 'get');
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: undefined
                }));

                // Act
                pushPlatformData({ commit, state }, modifieldState.platformData);

                // Assert
                expect(windowsPushSpy).not.toHaveBeenCalled();
                expect(state.platformData).toEqual(modifieldState.platformData);
            });
        });

        describe('pushEvent ::', () => {
            it('should call the `pushEvent` mutation', () => {
                // Act
                pushEvent({ commit, state }, newEvent);

                // Assert
                expect(commit).toHaveBeenLastCalledWith('pushEvent', newEvent);
            });

            it('should push the `events` then clear `events` if clientside & dataLayer present', () => {
                // Arrange
                const windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));

                // Act
                pushEvent({ commit, state }, newEvent);

                // Assert
                expect(windowsPushSpy).toHaveBeenLastCalledWith({ ...newEvent });
                expect(commit).toHaveBeenLastCalledWith(CLEAR_EVENTS);
                expect(state.events).toEqual([]);
            });

            it('should wait until clientside to push the server side & client side `events` then clear `events`', () => {
                // Arrange - Serverside
                const windowsPushSpy = jest.spyOn(window.dataLayer, 'push');
                jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);
                const serversideEvent = { ...newEvent, event: 'serverside-event' };

                // Act -1
                pushEvent({ commit, state }, serversideEvent);

                // Assert - 1
                expect(commit).toHaveBeenLastCalledWith('pushEvent', serversideEvent);
                expect(windowsPushSpy).not.toHaveBeenCalled();
                expect(commit).not.toHaveBeenCalledWith(CLEAR_EVENTS);
                expect(state.events).toEqual([{ ...serversideEvent }]);

                // Arrange - Clientside
                const originalWindow = { ...window };
                jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));
                const clientsideEvent = { ...newEvent, event: 'clientside-event' };

                // Act -2
                pushEvent({ commit, state }, clientsideEvent);

                // Assert - 2
                expect(windowsPushSpy).toHaveBeenCalledTimes(2);
                expect(windowsPushSpy).toHaveBeenCalledWith({ ...serversideEvent });
                expect(windowsPushSpy).toHaveBeenCalledWith({ ...clientsideEvent });
                expect(commit).toHaveBeenCalledWith('pushEvent', clientsideEvent);
                expect(commit).toHaveBeenLastCalledWith(CLEAR_EVENTS);
                expect(state.events).toEqual([]);
            });

            it('should not push the `events` nor clear `events` if serverside', () => {
                // Arrange
                const windowsPushSpy = jest.spyOn(window.dataLayer, 'push');
                jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined);

                // Act
                pushEvent({ commit, state }, newEvent);

                // Assert
                expect(windowsPushSpy).not.toHaveBeenCalled();
                expect(state.events).toEqual([newEvent]);
            });

            it('should not push the the `events` nor clear `events` if clientside & dataLayer not present', () => {
                // Arrange
                const windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                const windowSpy = jest.spyOn(global, 'window', 'get');
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: undefined
                }));

                // Act
                pushEvent({ commit, state }, newEvent);

                // Assert
                expect(windowsPushSpy).not.toHaveBeenCalled();
                expect(state.events).toEqual([newEvent]);
            });
        });
    });

    describe('mutations ::', () => {
        describe(`${PUSH_PLATFORM_DATA} ::`, () => {
            it('should update state with `platformData`', () => {
                // Act
                mutations[PUSH_PLATFORM_DATA](state, modifieldState.platformData);

                // Assert
                expect(state).toEqual(modifieldState);
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
                mutations.pushPlatformData(currentState, clientsidePlatformData);

                // Assert
                expect(currentState.platformData).toEqual(expected);
            });
        });

        describe(`${PUSH_EVENT} ::`, () => {
            it('should update state with a new `event`', () => {
                // Act
                mutations[PUSH_EVENT](state, newEvent);

                // Assert
                expect(state.events).toEqual([newEvent]);
            });
        });

        describe(`${CLEAR_EVENTS} ::`, () => {
            it('should clear the state `events`', () => {
                // Arrange
                state.events.push(newEvent);

                // Act
                mutations[CLEAR_EVENTS](state);

                // Assert
                expect(state.events).toEqual([]);
            });
        });
    });
});
