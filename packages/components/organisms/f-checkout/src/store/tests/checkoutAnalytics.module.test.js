import CheckoutAnalyticsModule from '../checkoutAnalytics.module';
import * as mapper from '../../services/mapper';
import { defaultCheckoutState, defaultAnalyticsState } from '../../components/_tests/helpers/setup';
import { VUEX_CHECKOUT_MODULE, HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../../constants';

import {
    UPDATE_AUTOFILL,
    UPDATE_CHANGED_FIELD
} from '../mutation-types';

const { actions, mutations } = CheckoutAnalyticsModule;

const {
    trackFormErrors,
    trackFormInteraction,
    trackInitialLoad,
    updateAutofill,
    updateChangedField,
    trackDuplicateOrderWarnDialog,
    trackLowValueOrderExperiment
} = actions;

Object.defineProperty(global, 'window', {
    value: {
        dataLayer: []
    }
});

describe('CheckoutAnalyticsModule', () => {
    let state = CheckoutAnalyticsModule.state();

    it('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(defaultAnalyticsState);
    });

    describe('actions ::', () => {
        let commit;
        let dispatch;
        const rootState = { [VUEX_CHECKOUT_MODULE]: defaultCheckoutState };

        beforeEach(() => {
            commit = jest.fn();
            dispatch = jest.fn();
            state = CheckoutAnalyticsModule.state();
            window.dataLayer = [];
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('updateAutofill ::', () => {
            let autofillFields = [];

            let mapAnalyticsNamesSpy;
            let field;

            let checkoutState = {
                ...defaultCheckoutState,
                customer: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobileNumber: ''
                },
                address: {
                    line1: '',
                    line2: '',
                    city: '',
                    postcode: ''
                }
            };

            beforeEach(() => {
                mapAnalyticsNamesSpy = jest.spyOn(mapper, 'mapAnalyticsNames');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when `checkoutState` contains customer phone number', () => {
                beforeEach(() => {
                    checkoutState = {
                        ...checkoutState,
                        customer: {
                            firstName: '',
                            lastName: '',
                            email: '',
                            mobileNumber: '+447111111111'
                        }
                    };

                    field = ['phone'];
                    autofillFields = field;
                    mapAnalyticsNamesSpy.mockImplementation(() => field);
                });

                it(`should call ${UPDATE_AUTOFILL} with correct correct field`, () => {
                    // Act
                    updateAutofill({ commit }, checkoutState);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_AUTOFILL, autofillFields);
                });

                it('should call `mapAnalyticsNames` with correct field', () => {
                    // Act
                    updateAutofill({ commit }, checkoutState);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_AUTOFILL, autofillFields);
                });
            });

            describe('when `checkoutState` contains customer address', () => {
                beforeEach(() => {
                    checkoutState = {
                        ...checkoutState,
                        address: {
                            line1: '1 Bristol Road',
                            line2: '',
                            city: '',
                            postcode: ''
                        }
                    };

                    field = ['addressLine1'];
                    autofillFields = field;
                    mapAnalyticsNamesSpy.mockImplementation(() => field);
                });

                it(`should call ${UPDATE_AUTOFILL} with correct field`, () => {
                    // Act
                    updateAutofill({ commit }, checkoutState);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_AUTOFILL, autofillFields);
                });

                it('should call `mapAnalyticsNames` with correct field', () => {
                    // Act
                    updateAutofill({ commit }, checkoutState);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_AUTOFILL, autofillFields);
                });
            });
        });

        describe('updateChangedField ::', () => {
            const field = 'firstName';
            let mapAnalyticsNameSpy;

            beforeEach(() => {
                mapAnalyticsNameSpy = jest.spyOn(mapper, 'mapAnalyticsName').mockImplementation(() => field);
            });

            it('should call `mapAnalyticsName` with passed field', () => {
                // Act
                updateChangedField({ commit }, field);

                // Assert
                expect(mapAnalyticsNameSpy).toHaveBeenCalledWith(field);
            });

            it(`should call ${UPDATE_CHANGED_FIELD} with passed field`, () => {
                // Act
                updateChangedField({ commit }, field);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_CHANGED_FIELD, field);
            });
        });

        describe('trackInitialLoad ::', () => {
            let expectedEvent;

            beforeEach(() => {
                expectedEvent = {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: rootState[VUEX_CHECKOUT_MODULE].basket.id,
                        total: rootState[VUEX_CHECKOUT_MODULE].basket.total
                    },
                    restaurant: {
                        id: rootState[VUEX_CHECKOUT_MODULE].restaurant.id,
                        seoName: rootState[VUEX_CHECKOUT_MODULE].restaurant.seoName
                    },
                    pageData: {
                        name: 'Checkout 1 Guest',
                        group: 'Checkout'
                    },
                    menu: {
                        type: rootState[VUEX_CHECKOUT_MODULE].serviceType
                    }
                };
            });

            it('should `push` expected event to `dataLayer`', () => {
                // Act
                trackInitialLoad({ rootState, dispatch });

                // Assert
                expect(window.dataLayer[0]).toEqual(expectedEvent);
            });

            describe('when user `isLoggedIn` is true', () => {
                it('should set `name` to `Checkout 1 Overview`', () => {
                    // Arrange
                    const expectedName = 'Checkout 1 Overview';

                    rootState[VUEX_CHECKOUT_MODULE].isLoggedIn = true;
                    expectedEvent.pageData.name = expectedName;

                    // Act
                    trackInitialLoad({ rootState, dispatch });

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });
            });

            describe('when user `isLoggedIn` is false', () => {
                it('should set `name` to `Checkout 1 Guest`', () => {
                    // Arrange
                    const expectedName = 'Checkout 1 Guest';

                    rootState[VUEX_CHECKOUT_MODULE].isLoggedIn = false;
                    expectedEvent.pageData.name = expectedName;

                    // Act
                    trackInitialLoad({ rootState, dispatch });

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });
            });

            it('should dispatch `trackFormInteraction` with `start` action', () => {
                // Assert
                trackInitialLoad({ rootState, dispatch });

                // Assert
                expect(dispatch).toHaveBeenCalledWith('trackFormInteraction', { action: 'start' });
            });
        });

        describe('trackFormInteraction ::', () => {
            let mapAnalyticsNamesSpy;
            let payload;
            let expectedEvent;

            beforeEach(() => {
                payload = {
                    action: 'start',
                    error: null
                };
                expectedEvent = {
                    event: 'Form',
                    form: {
                        name: 'checkout_guest',
                        action: payload.action,
                        error: null,
                        autofill: state.autofill,
                        changes: state.changedFields.toString()
                    }
                };
                mapAnalyticsNamesSpy = jest.spyOn(mapper, 'mapAnalyticsNames');
                window.dataLayer = [];
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            describe('when an error is provided', () => {
                beforeEach(() => {
                    payload.error = 'postcodeNotDefined';
                    mapAnalyticsNamesSpy.mockImplementation(() => payload.error);
                    expectedEvent.form.error = payload.error;
                });

                it('should call `mapAnalyticsNames` with error', () => {
                    // Act
                    trackFormInteraction({ state, rootState }, payload);

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });

                it('should `push` expected event to `dataLayer`', () => {
                    // Act
                    trackFormInteraction({ state, rootState }, payload);

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });
            });

            describe('when no error is provided', () => {
                beforeEach(() => {
                    payload.error = null;
                    mapAnalyticsNamesSpy.mockImplementation(() => payload.error);
                    expectedEvent.form.error = payload.error;
                });

                it('should not call `mapAnalyticsNames`', () => {
                    // Act
                    trackFormInteraction({ state, rootState }, payload);

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });

                it('should `push` expected event to `dataLayer`', () => {
                    // Act
                    trackFormInteraction({ state, rootState }, payload);

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });
            });

            describe('when user `isLoggedIn` is true', () => {
                it('should set `name` to `checkout`', () => {
                    // Arrange
                    const expectedName = 'checkout';

                    rootState[VUEX_CHECKOUT_MODULE].isLoggedIn = true;
                    expectedEvent.form.name = expectedName;

                    // Act
                    trackFormInteraction({ state, rootState }, payload);

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });
            });

            describe('when user `isLoggedIn` is false', () => {
                it('should set `name` to `checkout_guest`', () => {
                    // Arrange
                    const expectedName = 'checkout_guest';

                    rootState[VUEX_CHECKOUT_MODULE].isLoggedIn = false;
                    expectedEvent.form.name = expectedName;

                    // Act
                    trackFormInteraction({ state, rootState }, payload);

                    // Assert
                    expect(window.dataLayer[0]).toEqual(expectedEvent);
                });
            });
        });

        describe('trackFormErrors ::', () => {
            const errors = ['error 1'];
            let getAnalyticsErrorCodeByApiErrorCodeSpy;

            beforeEach(() => {
                getAnalyticsErrorCodeByApiErrorCodeSpy = jest.spyOn(mapper, 'getAnalyticsErrorCodeByApiErrorCode');
                getAnalyticsErrorCodeByApiErrorCodeSpy.mockImplementation(() => errors);

                rootState[VUEX_CHECKOUT_MODULE].errors = errors;
            });

            it('should call `getAnalyticsErrorCodeByApiErrorCode` with each error', () => {
                // Assert
                trackFormErrors({ rootState, dispatch });

                // Assert
                expect(getAnalyticsErrorCodeByApiErrorCodeSpy).toHaveBeenCalled();
            });

            it('should dispatch `trackFormInteraction` with `start` action', () => {
                // Assert
                trackFormErrors({ rootState, dispatch });

                // Assert
                expect(dispatch).toHaveBeenCalledWith('trackFormInteraction', { action: 'error', error: errors });
            });
        });

        describe('trackDuplicateOrderWarnDialog ::', () => {
            it('should `push` expected event to `dataLayer`', () => {
                // Arrange
                const expected = {
                    event: 'trackEvent',
                    eventCategory: 'engagement',
                    eventAction: 'dialog_duplicate_order_warning',
                    eventLabel: 'view_dialog'
                };

                // Act
                trackDuplicateOrderWarnDialog();

                // Assert
                expect(window.dataLayer).toContainEqual(expected);
            });
        });

        describe('trackLowValueOrderExperiment ::', () => {
            it('should `push` low value order event to data layer if it is returned in request header`', () => {
                // Arrange
                const expected = {
                    custom: {
                        experiment: {
                            id: 'EX-1862',
                            name: 'low_value_order_threshold',
                            platform: 'experiment_api',
                            variant: {
                                name: 'test'
                            },
                            version: 1
                        }
                    },
                    event: 'trackExperimentV2'
                };

                const mockedResponseHeaders = {
                    [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: 'test'
                };

                // Act
                trackLowValueOrderExperiment(mockedResponseHeaders);

                // Assert
                expect(window.dataLayer).toContainEqual(expected);
            });

            it('should not `push` low value order event to data layer if it is returned in request header`', () => {
                // Arrange
                const mockedResponseHeaders = {};

                // Act
                trackLowValueOrderExperiment(mockedResponseHeaders);

                // Assert
                expect(window.dataLayer).toEqual([]);
            });
        });
    });

    describe('mutations ::', () => {
        beforeEach(() => {
            state = CheckoutAnalyticsModule.state();
        });

        describe(`${UPDATE_CHANGED_FIELD} ::`, () => {
            const field = 'note';

            it('should update state if `changedFields` does not include passed fields', () => {
                // Arrange
                state.changedFields = [];

                // Act
                mutations[UPDATE_CHANGED_FIELD](state, field);

                // Assert
                expect(state.changedFields).toEqual([field]);
            });

            it('should not update state if `changedFields` include passed fields', () => {
                // Arrange
                state.changedFields = [field];

                // Act
                mutations[UPDATE_CHANGED_FIELD](state, field);

                // Assert
                expect(state.changedFields).toEqual([field]);
            });
        });

        describe(`${UPDATE_AUTOFILL} ::`, () => {
            it('should update state `autofill` with payload', () => {
                // Arrange
                const payload = 'addressLine1';

                // Act
                mutations[UPDATE_AUTOFILL](state, payload);

                // Assert
                expect(state.autofill).toEqual(payload);
            });
        });
    });
});
