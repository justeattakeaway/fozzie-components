import CheckoutAnalyticsModule from '../checkoutAnalytics.module';
import * as mapper from '../../services/mapper';
import { defaultCheckoutState, defaultAnalyticsState } from '../../components/_tests/helpers/setup';

import { UPDATE_AUTOFILL, UPDATE_CHANGED_FIELD, UPDATE_CHECKOUT_RESPONSE_HEADERS } from '../mutation-types';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../../constants';

const { actions, mutations } = CheckoutAnalyticsModule;

const {
    updateAutofill,
    updateChangedField,
    updateCheckoutResponseHeaders
} = actions;

const headers = {
    [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: 'test'
};

describe('CheckoutAnalyticsModule', () => {
    let state = CheckoutAnalyticsModule.state();

    it('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(defaultAnalyticsState);
    });

    describe('actions ::', () => {
        let commit;

        beforeEach(() => {
            commit = jest.fn();
            state = CheckoutAnalyticsModule.state();
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

        describe('updateCheckoutResponseHeaders ::', () => {
            it(`should call ${UPDATE_CHECKOUT_RESPONSE_HEADERS} with passed field`, () => {
                // Act
                updateCheckoutResponseHeaders({ commit }, headers);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_CHECKOUT_RESPONSE_HEADERS, headers);
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

        describe(`${UPDATE_CHECKOUT_RESPONSE_HEADERS} ::`, () => {
            it('should update state `headers` with payload', () => {
                // Act
                mutations[UPDATE_CHECKOUT_RESPONSE_HEADERS](state, headers);

                // Assert
                expect(state.checkoutResponseHeaders).toEqual(headers);
            });
        });
    });
});
