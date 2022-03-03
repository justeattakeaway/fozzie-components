import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AnalyticsService from '../analytics';
import { createStore, defaultAnalyticsState, defaultCheckoutState } from '../../components/_tests/helpers/setup';
import * as mapper from '../mapper';
import { DUPLICATE_ORDER, HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../../constants';

const localVue = createLocalVue();

localVue.use(Vuex);

const $gtm = {
    pushEvent: jest.fn()
};

describe('Analytic Service ::', () => {
    let $store;
    let analyticsService;

    beforeEach(() => {
        // Arrange
        $store = createStore();
        window.dataLayer = [];

        analyticsService = new AnalyticsService({ $store, $gtm });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('trackInitialLoad ::', () => {
        let expectedEvent;

        beforeEach(() => {
            analyticsService.trackFormInteraction = jest.fn();

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

        it('should call `pushEvent` with expected event', () => {
            // Act
            analyticsService.trackInitialLoad();

            // Assert
            expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
        });

        it('should call `trackFormInteraction` with `start` action', () => {
            // Assert
            analyticsService.trackInitialLoad();

            // Assert
            expect(analyticsService.trackFormInteraction).toHaveBeenCalledWith({ action: 'start' });
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
                    changes: null
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
                analyticsService.trackFormInteraction(payload);

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
                analyticsService.trackFormInteraction(payload);

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
                analyticsService.trackFormInteraction(payload);

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
                analyticsService.trackFormInteraction(payload);

                // Assert
                expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
            });
        });

        describe('when `action === "submit"`', () => {
            beforeEach(() => {
                analyticsService.trackSelectedTimes = jest.fn();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should call `trackSelectedTime`', () => {
                // Arrange
                payload.action = 'submit';

                // Act
                analyticsService.trackFormInteraction(payload);

                // Assert
                expect(analyticsService.trackSelectedTimes).toHaveBeenCalled();
            });
        });
    });

    describe('trackFormErrors ::', () => {
        const errors = ['error 1'];
        let getAnalyticsErrorCodeByApiErrorCodeSpy;

        beforeEach(() => {
            getAnalyticsErrorCodeByApiErrorCodeSpy = jest.spyOn(mapper, 'getAnalyticsErrorCodeByApiErrorCode');
            getAnalyticsErrorCodeByApiErrorCodeSpy.mockImplementation(() => errors);
            analyticsService.trackFormInteraction = jest.fn();

            defaultCheckoutState.errors = errors;
        });

        it('should call `getAnalyticsErrorCodeByApiErrorCode` with each error', () => {
            // Assert
            analyticsService.trackFormErrors();

            // Assert
            expect(getAnalyticsErrorCodeByApiErrorCodeSpy).toHaveBeenCalled();
        });

        it('should call `trackFormInteraction` with `start` action', () => {
            // Assert
            analyticsService.trackFormErrors();

            // Assert
            expect(analyticsService.trackFormInteraction).toHaveBeenCalledWith({ action: 'error', error: errors });
        });
    });

    describe('trackDialogEvent ::', () => {
        it.each([
            ['dialog_duplicate_order_warning', DUPLICATE_ORDER, true],
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
            analyticsService.trackDialogEvent({ code, isDuplicateOrderError });

            // Assert
            expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('trackSelectedTimes ::', () => {
        it('should call `pushEvent` with `isAsapSelected`', () => {
            // Arrange
            const expectedEvent = {
                event: 'timeSelected',
                eventCategory: 'engagement',
                isAsapSelected: defaultCheckoutState.hasAsapSelected
            };

            // Act
            analyticsService.trackSelectedTimes();

            // Assert
            expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('trackLowValueOrderExperiment ::', () => {
        it('should call `pushEvent` with low value order if it is returned in request header', () => {
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
            analyticsService.trackLowValueOrderExperiment(mockedResponseHeaders);

            // Assert
            expect($gtm.pushEvent).toHaveBeenCalledWith(expectedEvent);
        });

        it('should not call `pushEvent` with low value order if it is not returned in request header', () => {
            // Arrange
            const mockedResponseHeaders = {
                [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: null
            };

            // Act
            analyticsService.trackLowValueOrderExperiment(mockedResponseHeaders);

            // Assert
            expect($gtm.pushEvent).not.toHaveBeenCalled();
        });
    });

    describe('trackGuestCheckoutSubmission', () => {
        it('should call `pushEvent` with correct arguments', () => {
            analyticsService.trackGuestCheckoutSubmission();
            expect($gtm.pushEvent).toHaveBeenCalledWith({
                event: 'trackEvent',
                eventCategory: 'engagement',
                eventAction: 'form_checkout_guest',
                eventLabel: 'success'
            });
        });
    });
});
