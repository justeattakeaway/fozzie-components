import Trak from '@justeat/f-trak';
import AnalyticsModule from '../analytics.module';
import * as mapper from '../../services/mapper';
import { defaultState } from '../../components/_tests/helpers/setup';

import {
    UPDATE_ANALYTICS_STATE,
    UPDATE_CHANGED_FIELDS,
    UPDATE_AUTOFILL
} from '../mutation-types';

const { actions, mutations } = AnalyticsModule;

const {
    updateState,
    updateFieldChanges,
    trackInitialLoad,
    trackFormInteraction
} = actions;

const analyticsState = {
    serviceType: '',
    restaurantId: '',
    basket: {
        id: '',
        total: 0
    },
    isLoggedIn: false,
    changes: [],
    autofill: []
};

const checkoutState = defaultState;

describe('AnalyticsModule', () => {
    let state = AnalyticsModule.state();

    it('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(analyticsState);
    });

    describe('actions ::', () => {
        let commit;
        let dispatch;
        let trackEventSpy;

        const rootState = { checkout: checkoutState };

        beforeEach(() => {
            commit = jest.fn();
            dispatch = jest.fn();
            trackEventSpy = jest.spyOn(Trak, 'event').mockImplementation();
            state = AnalyticsModule.state();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('updateState ::', () => {
            it(`should call ${UPDATE_ANALYTICS_STATE} with necessary checkoutState`, () => {
                // Arrange
                const requiredState = {
                    serviceType: checkoutState.serviceType,
                    restaurantId: checkoutState.restaurantId,
                    basket: checkoutState.basket,
                    isLoggedIn: checkoutState.isLoggedIn
                };

                // Act
                updateState({ rootState, commit }, checkoutState);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_ANALYTICS_STATE, requiredState);
            });

            it(`should call ${UPDATE_AUTOFILL} if 'isLoggedIn' is true`, () => {
                // Arrange
                checkoutState.isLoggedIn = true;

                // Act
                updateState({ rootState, commit }, checkoutState);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_AUTOFILL, checkoutState);
            });
        });

        describe('updateFieldChanges ::', () => {
            it(`should call ${UPDATE_CHANGED_FIELDS} with passed field`, async () => {
                // Arrange
                const field = 'firstName';

                // Act
                updateFieldChanges({ commit }, field);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_CHANGED_FIELDS, field);
            });
        });

        describe('trackInitialLoad ::', () => {
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: state.basket.id,
                        total: state.basket.total
                    },
                    restaurant: {
                        id: state.restaurantId
                    },
                    pageData: {
                        name: 'Checkout 1 Guest',
                        group: 'Checkout'
                    }
                }
            };

            it('should call `event` method of `f-trak`', () => {
                // Act
                trackInitialLoad({ state, dispatch });

                // Assert
                expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
            });

            it.each([
                ['Checkout 1 Overview', true],
                ['Checkout 1 Guest', false]
            ])('should set `pageData.name` to %s if `isLoggedIn` is %s', (expectedName, isLoggedInState) => {
                // Arrange
                state.isLoggedIn = isLoggedInState;
                expectedEvent.custom.pageData.name = expectedName;

                // Act
                trackInitialLoad({ state, dispatch });

                // Assert
                expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
            });

            it('should dispatch `trackFormInteraction` action', () => {
                // Assert
                trackInitialLoad({ state, dispatch });

                // Assert
                expect(dispatch).toHaveBeenCalledWith('trackFormInteraction', { action: 'start' });
            });
        });

        describe('trackFormInteraction ::', () => {
            const payload = {
                action: 'start',
                error: 'postcodeNotCovered'
            };

            const expectedEvent = {
                event: 'Form',
                custom: {
                    form: {
                        name: 'checkout_guest',
                        action: payload.action,
                        error: payload.error,
                        autofill: state.autofill,
                        changes: state.changes
                    }
                }
            };

            it('should call `event` method of `f-trak`', () => {
                // Act
                trackFormInteraction({ state }, payload);

                // Assert
                expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
            });

            it.each([
                ['checkout', true],
                ['checkout_guest', false]
            ])('should set `name` to %s if `isLoggedIn` is %s', (expectedName, isLoggedInState) => {
                // Arrange
                state.isLoggedIn = isLoggedInState;
                expectedEvent.custom.form.name = expectedName;

                // Act
                trackFormInteraction({ state }, payload);

                // Assert
                expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
            });
        });
    });

    describe('mutations ::', () => {
        beforeEach(() => {
            state = AnalyticsModule.state();
        });

        describe(`${UPDATE_ANALYTICS_STATE} ::`, () => {
            it('should update state with passed `checkoutState', () => {
                checkoutState.restaurantId = '11111';

                // Arrange
                const expectedState = {
                    isLoggedIn: checkoutState.isLoggedIn,
                    basket: checkoutState.basket,
                    restaurantId: checkoutState.restaurantId,
                    serviceType: checkoutState.serviceType,
                    changes: [],
                    autofill: []
                };

                // Act
                mutations[UPDATE_ANALYTICS_STATE](state, checkoutState);

                // Assert
                expect(state).toEqual(expectedState);
            });
        });

        describe(`${UPDATE_CHANGED_FIELDS} ::`, () => {
            const field = 'note';
            let mapAnalyticsFieldNamesSpy;

            beforeEach(() => {
                mapAnalyticsFieldNamesSpy = jest.spyOn(mapper, 'mapAnalyticsFieldNames').mockImplementation(() => field);
            });

            it('should call `mapFieldNames', () => {
                // Act
                mutations[UPDATE_CHANGED_FIELDS](state, field);

                // Assert
                expect(mapAnalyticsFieldNamesSpy).toHaveBeenCalledWith(field);
            });

            it('should update state if `changedFields` does not include passed fields', () => {
                // Arrange
                state.changes = [];

                // Act
                mutations[UPDATE_CHANGED_FIELDS](state, field);

                // Assert
                expect(state.changes).toEqual([field]);
            });

            it('should not update state if `changedFields` includes passed fields', () => {
                // Arrange
                state.changes = [field];

                // Act
                mutations[UPDATE_CHANGED_FIELDS](state, field);

                // Assert
                expect(state.changes).toEqual([field]);
            });
        });

        describe(`${UPDATE_AUTOFILL} ::`, () => {
            let payload;
            let mapAnalyticsFieldNamesSpy;

            beforeEach(() => {
                mapAnalyticsFieldNamesSpy = jest.spyOn(mapper, 'mapAnalyticsFieldNames');

                payload = {
                    customer: {},
                    address: {},
                    serviceType: checkoutState.serviceType
                };
            });

            it('should update state `autofill` with `phone` if payload customer contains `mobilePhone`', () => {
                // Arrange
                payload.customer.mobileNumber = '07777777777';

                // Act
                mutations[UPDATE_AUTOFILL](state, payload);

                // Assert
                expect(state.autofill).toEqual(['phone']);
            });

            it('should update state `autofill` with payload address if `serviceType` is delivery', () => {
                // Arrange
                payload.address = {
                    line1: 'Line1'
                };

                const expectedField = 'addressLine1';
                mapAnalyticsFieldNamesSpy.mockImplementation(() => expectedField);

                // Act
                mutations[UPDATE_AUTOFILL](state, payload);

                // Assert
                expect(state.autofill).toEqual([expectedField]);
            });
        });
    });
});
