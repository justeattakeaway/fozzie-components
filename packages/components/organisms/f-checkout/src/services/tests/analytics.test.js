import Trak from '@justeat/f-trak';
import { trackInitialLoad, trackFormInteraction } from '../analytics';

describe('checkout analytics', () => {
    let trackEventSpy;

    beforeEach(() => {
        trackEventSpy = jest.spyOn(Trak, 'event').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('trackInitialLoad :: ', () => {
        const basket = {
            id: '11111',
            total: '12.25'
        };
        const restaurantId = '22222';
        const isLoggedIn = true;

        it('should call `event` method of `f-trak`', () => {
            // Arrange
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: basket.id,
                        total: basket.total
                    },
                    restaurant: {
                        id: restaurantId
                    },
                    pageData: {
                        name: 'Checkout 1 Overview',
                        group: 'Checkout'
                    }
                }
            };

            // Act
            trackInitialLoad(basket, restaurantId, isLoggedIn);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it.each([
            ['Checkout 1 Overview', true],
            ['Checkout 1 Guest', false]
        ])('should set `pageData.name` to %s if isLoggedIn is %s', (expectedName, isLoggedInState) => {
            // Arrange
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: basket.id,
                        total: basket.total
                    },
                    restaurant: {
                        id: restaurantId
                    },
                    pageData: {
                        name: expectedName,
                        group: 'Checkout'
                    }
                }
            };

            // Act
            trackInitialLoad(basket, restaurantId, isLoggedInState);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });
    });

    describe('trackFormInteraction :: ', () => {
        const eventData = {
            action: 'start',
            isLoggedIn: true,
            error: 'postcodeNotCovered',
            autofill: 'address.line1',
            changes: 'address.line1'
        };

        it('should call `event` method of `f-trak`', () => {
            // Arrange
            const expectedEvent = {
                event: 'Form',
                custom: {
                    form: {
                        name: 'checkout',
                        action: eventData.action,
                        error: eventData.error,
                        autofill: eventData.autofill,
                        changes: eventData.changes
                    }
                }
            };

            // Act
            trackFormInteraction(eventData);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it.each([
            ['checkout', true],
            ['checkout_guest', false]
        ])('should set `name` to %s if isLoggedIn is %s', (expectedName, isLoggedInState) => {
            // Arrange
            eventData.isLoggedIn = isLoggedInState;

            const expectedEvent = {
                event: 'Form',
                custom: {
                    form: {
                        name: expectedName,
                        action: eventData.action,
                        error: eventData.error,
                        autofill: eventData.autofill,
                        changes: eventData.changes
                    }
                }
            };

            // Act
            trackFormInteraction(eventData);

            // Assert
            expect(trackEventSpy).toHaveBeenCalledWith(expectedEvent);
        });
    });
});
