import Trak from '@justeat/f-trak';
import { trackInitialLoad, trackFormInteraction, cleanFields } from '../analytics';
import {
    analyticsData
} from '../../components/_tests/helpers/setup';

describe('checkout analytics', () => {
    let trackEventSpy;

    beforeEach(() => {
        trackEventSpy = jest.spyOn(Trak, 'event').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('trackInitialLoad :: ', () => {
        it('should call `event` method of `f-trak`', () => {
            // Arrange
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: analyticsData.basket.id,
                        total: analyticsData.basket.total
                    },
                    restaurant: {
                        id: analyticsData.restaurantId
                    },
                    pageData: {
                        name: 'Checkout 1 Guest',
                        group: 'Checkout'
                    }
                }
            };

            // Act
            trackInitialLoad(analyticsData);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it.each([
            ['Checkout 1 Overview', true],
            ['Checkout 1 Guest', false]
        ])('should set `pageData.name` to %s if isLoggedIn is %s', (expectedName, isLoggedInState) => {
            analyticsData.isLoggedIn = isLoggedInState;

            // Arrange
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: analyticsData.basket.id,
                        total: analyticsData.basket.total
                    },
                    restaurant: {
                        id: analyticsData.restaurantId
                    },
                    pageData: {
                        name: expectedName,
                        group: 'Checkout'
                    }
                }
            };

            // Act
            trackInitialLoad(analyticsData);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('trackFormInteraction :: ', () => {
        const action = 'start';
        const error = 'postcodeNotCovered';

        it('should call `event` method of `f-trak`', () => {
            // Arrange
            const expectedEvent = {
                event: 'Form',
                custom: {
                    form: {
                        name: 'checkout_guest',
                        action,
                        error,
                        autofill: analyticsData.autofill,
                        changes: analyticsData.changes
                    }
                }
            };

            // Act
            trackFormInteraction(action, analyticsData, error);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it.each([
            ['checkout', true],
            ['checkout_guest', false]
        ])('should set `name` to %s if isLoggedIn is %s', (expectedName, isLoggedInState) => {
            // Arrange
            analyticsData.isLoggedIn = isLoggedInState;

            const expectedEvent = {
                event: 'Form',
                custom: {
                    form: {
                        name: expectedName,
                        action,
                        error,
                        autofill: analyticsData.autofill,
                        changes: analyticsData.changes
                    }
                }
            };

            // Act
            trackFormInteraction(action, analyticsData, error);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('cleanFields :: ', () => {
        it.each([
            ['address.line1', 'addressLine1'],
            ['line1', 'addressLine1'],
            ['address.line2', 'addressLine2'],
            ['line2', 'addressLine2'],
            ['address.city', 'addressCity'],
            ['city', 'addressCity'],
            ['address.postcode', 'addressPostcode'],
            ['postcode', 'addressPostcode'],
            ['customer.firstName', 'firstName'],
            ['customer.lastName', 'lastName'],
            ['customer.mobileNumber', 'phone'],
            ['mobileNumber', 'phone'],
            ['customer.email', 'email']
        ])('should correct %s to %s', (provided, cleaned) => {
            // Act & Assert
            expect(cleanFields(provided)).toEqual(cleaned);
        });

        it('should correctly clean an array of fields', () => {
            // Arrange
            const provided = [
                'mobilePhone',
                'address.line1',
                'customer.firstName',
                'lastName',
                'customer.email',
                'city'
            ];

            const expected = [
                'addressCity',
                'addressLine1',
                'email',
                'firstName',
                'lastName',
                'mobilePhone'
            ];

            // Act & Assert
            expect(cleanFields(provided)).toEqual(expected);
        });
    });
});
