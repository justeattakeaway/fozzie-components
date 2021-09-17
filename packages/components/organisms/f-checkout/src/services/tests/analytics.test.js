import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AnalyticsService, { trackDialogEvent, trackLowValueOrderExperiment } from '../analytics';
import { createStore, defaultAnalyticsState, defaultCheckoutState } from '../../components/_tests/helpers/setup';
import * as mapper from '../mapper';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../../constants';

const localVue = createLocalVue();

localVue.use(Vuex);

Object.defineProperty(global, 'window', {
    value: {
        dataLayer: []
    }
});

describe('Analytic Service ::', () => {
    let store;
    let analyticsService;

    beforeEach(() => {
        // Arrange
        store = createStore();
        window.dataLayer = [];

        analyticsService = new AnalyticsService(store);
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

        it('should `push` expected event to `dataLayer`', () => {
            // Act
            analyticsService.trackInitialLoad();

            // Assert
            expect(window.dataLayer[0]).toEqual(expectedEvent);
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

            it('should `push` expected event to `dataLayer`', () => {
                // Act
                analyticsService.trackFormInteraction(payload);

                // Assert
                expect(window.dataLayer[0]).toEqual(expectedEvent);
            });
        });

        describe('when no error is provided', () => {
            beforeEach(() => {
                payload.error = null;
                expectedEvent.form.error = payload.error;
            });

            it('should `push` expected event to `dataLayer`', () => {
                // Act
                analyticsService.trackFormInteraction(payload);

                // Assert
                expect(window.dataLayer[0]).toEqual(expectedEvent);
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
                expect(window.dataLayer[0]).toEqual(expectedEvent);
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
            ['dialog_duplicate_order_warning', 'DuplicateOrder', true],
            ['dialog_restaurant_not_taking_orders_error', 'RESTAURANT_NOT_TAKING_ORDERS', false],
            ['dialog_additional_items_required_error', 'ADDITIONAL_ITEMS_REQUIRED', false]
        ])('should `push` expected event with %s `eventAction` to `dataLayer` when error is %s', (eventAction, code, isDuplicateOrderError) => {
            // Arrange
            const expected = {
                event: 'trackEvent',
                eventCategory: 'engagement',
                eventAction,
                eventLabel: 'view_dialog'
            };

            // Act
            trackDialogEvent({ code, isDuplicateOrderError });

            // Assert
            expect(window.dataLayer).toContainEqual(expected);
        });
    });

    describe('trackLowValueOrderExperiment ::', () => {
        it('should `push` low value order event to data layer if it is returned in request header', () => {
            // Arrange
            const expected = {
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
            trackLowValueOrderExperiment(mockedResponseHeaders);

            // Assert
            expect(window.dataLayer).toContainEqual(expected);
        });

        it('should not `push` low value order event to data layer if it is not returned in request header', () => {
            // Arrange
            const mockedResponseHeaders = {
                [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: null
            };

            // Act
            trackLowValueOrderExperiment(mockedResponseHeaders);

            // Assert
            expect(window.dataLayer).toEqual([]);
        });
    });
});
