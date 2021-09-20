import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import AnalyticsMixin from '../analytics.mixin';
import { createStore, defaultAnalyticsState, defaultCheckoutState } from '../../components/_tests/helpers/setup';
import * as mapper from '../../services/mapper';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../../constants';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Analytic Service ::', () => {
    let wrapper;

    const $gtm = {
        pushEvent: jest.fn()
    };

    beforeEach(() => {
        // Arrange
        wrapper = shallowMount(AnalyticsMixin, {
            render () {},
            store: createStore(),
            localVue,
            mocks: {
                $gtm
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('trackInitialLoad ::', () => {
        let expectedEvent;
        let trackFormInteractionSpy;

        beforeEach(() => {
            trackFormInteractionSpy = jest.spyOn(wrapper.vm, 'trackFormInteraction').mockImplementation();

            expectedEvent = {
                checkout: {
                    step: 1
                },
                basket: {
                    id: defaultCheckoutState.basket.id,
                    total: defaultCheckoutState.basket.total
                },
                restaurant: {
                    id: defaultCheckoutState.restaurant.id,
                    seoName: defaultCheckoutState.restaurant.seoName
                },
                menu: {
                    type: defaultCheckoutState.serviceType
                }
            };
        });

        afterEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        });

        it('should call `pushEvent` with expected event', () => {
            // Act
            wrapper.vm.trackInitialLoad();

            // Assert
            expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
        });

        it('should call `trackFormInteraction` with `start` action', () => {
            // Assert
            wrapper.vm.trackInitialLoad();

            // Assert
            expect(trackFormInteractionSpy).toHaveBeenCalledWith({ action: 'start' });
        });
    });

    describe('trackFormInteraction ::', () => {
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
                    autofill: defaultAnalyticsState.autofill,
                    changes: ''
                }
            };
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('when an error is provided', () => {
            beforeEach(() => {
                payload.error = 'postcodeNotDefined';
                expectedEvent.form.error = payload.error;
            });

            it('should call `pushEvent` with expected event', () => {
                // Act
                wrapper.vm.trackFormInteraction(payload);

                // Assert
                expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
            });
        });

        describe('when no error is provided', () => {
            beforeEach(() => {
                payload.error = null;
                expectedEvent.form.error = payload.error;
            });

            it('should call `pushEvent` with expected event', () => {
                // Act
                wrapper.vm.trackFormInteraction(payload);

                // Assert
                expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
            });
        });

        describe('when user `isLoggedIn` is true', () => {
            it('should set `name` to `checkout`', () => {
                // Arrange
                const expectedName = 'checkout';

                defaultCheckoutState.isLoggedIn = true;
                expectedEvent.form.name = expectedName;

                // Act
                wrapper.vm.trackFormInteraction(payload);

                // Assert
                expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
            });
        });

        describe('when user `isLoggedIn` is false', () => {
            it('should set `name` to `checkout_guest`', () => {
                // Arrange
                const expectedName = 'checkout_guest';

                defaultCheckoutState.isLoggedIn = false;
                expectedEvent.form.name = expectedName;

                // Act
                wrapper.vm.trackFormInteraction(payload);

                // Assert
                expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
            });
        });
    });

    describe('trackFormErrors ::', () => {
        const errors = ['error 1'];
        let getAnalyticsErrorCodeByApiErrorCodeSpy;
        let trackFormInteractionSpy;

        beforeEach(() => {
            getAnalyticsErrorCodeByApiErrorCodeSpy = jest.spyOn(mapper, 'getAnalyticsErrorCodeByApiErrorCode');
            getAnalyticsErrorCodeByApiErrorCodeSpy.mockImplementation(() => errors);
            trackFormInteractionSpy = jest.spyOn(wrapper.vm, 'trackFormInteraction').mockImplementation();

            defaultCheckoutState.errors = errors;
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should call `getAnalyticsErrorCodeByApiErrorCode` with each error', () => {
            // Assert
            wrapper.vm.trackFormErrors();

            // Assert
            expect(getAnalyticsErrorCodeByApiErrorCodeSpy).toHaveBeenCalled();
        });

        it('should call `trackFormInteraction` with `start` action', () => {
            // Assert
            wrapper.vm.trackFormErrors();

            // Assert
            expect(trackFormInteractionSpy).toHaveBeenCalledWith({ action: 'error', error: errors });
        });
    });

    describe('trackDialogEvent ::', () => {
        it.each([
            ['dialog_duplicate_order_warning', 'DuplicateOrder', true],
            ['dialog_restaurant_not_taking_orders_error', 'RESTAURANT_NOT_TAKING_ORDERS', false],
            ['dialog_additional_items_required_error', 'ADDITIONAL_ITEMS_REQUIRED', false]
        ])('should call `pushEvent` with %s `eventAction` when error is %s', (eventAction, code, isDuplicateOrderError) => {
            // Arrange
            const expectedEvent = {
                event: 'trackEvent',
                eventCategory: 'engagement',
                eventAction,
                eventLabel: 'view_dialog'
            };

            // Act
            wrapper.vm.trackDialogEvent({ code, isDuplicateOrderError });

            // Assert
            expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('trackLowValueOrderExperiment ::', () => {
        it('should call `pushEvent` with expectedEvent when request header is returned', () => {
            // Arrange
            const expectedEvent = {
                custom: {
                    experiment: {
                        id: 'EX-1880',
                        name: 'low_value_order_phase_2',
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
            wrapper.vm.trackLowValueOrderExperiment(mockedResponseHeaders);

            // Assert
            expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
        });

        it('should not call `pushEvent` with expectedEvent when request header is not returned', () => {
            // Arrange
            const mockedResponseHeaders = {
                [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: null
            };

            // Act
            wrapper.vm.trackLowValueOrderExperiment(mockedResponseHeaders);

            // Assert
            expect($gtm.pushEvent).not.toHaveBeenCalled();
        });
    });
});
