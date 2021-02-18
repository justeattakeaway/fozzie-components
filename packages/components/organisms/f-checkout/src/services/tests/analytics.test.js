import Trak from '@justeat/f-trak';
import * as analytics  from '../analytics';

describe('checkout analytics', () => {
    let eventSpy;

    beforeEach(() => {
        eventSpy = jest.spyOn(Trak, 'event').mockImplementation();
        // FormInteractionSpy = jest.spyOn(Analytics, 'trackFormInteraction').mockImplementation();;
        });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('trackInitialLoad :: ', () => {
        const basket =  {
            id: '11111',
            total: '12.25'
        };
        const restaurantId =  '22222';
        const isLoggedIn =  true;

        xit('should call `event` method of `f-trak`', () => {
            // Arrange
            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: eventData.basket.id,
                        total: eventData.basket.total
                    },
                    restaurant: {
                        id: eventData.restaurantId
                    },
                    pageData: {
                        name: `Checkout 1 Overview`,
                        group: 'Checkout'
                    }
                }
            };

            // Act
            trackInitialLoad(basket, restaurantId, isLoggedIn);

            // Assert
            expect(eventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        xit.each([
            ['Checkout 1 Overview', true],
            ['Checkout 1 Guest', false]
        ])('should set `pageData.name` to %s if isLoggedIn is %s', (expectedName, isLoggedIn) => {
            // Arrange
            eventData.isLoggedIn = isLoggedIn;

            const expectedEvent = {
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: eventData.basket.id,
                        total: eventData.basket.total
                    },
                    restaurant: {
                        id: eventData.restaurantId
                    },
                    pageData: {
                        name: expectedName,
                        group: 'Checkout'
                    }
                }
            }

            // Act
            trackInitialLoad(basket, restaurantId, isLoggedIn);

            // Assert
            expect(eventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it('should call `trackFormInteraction` if `eventData` contains `checkoutData`', () => {
            // Arrange
            const trackSpy = jest.spyOn(analytics, 'trackFormInteraction');
            const checkoutData = 'data';

            // Act
            analytics.trackInitialLoad(basket, restaurantId, isLoggedIn, checkoutData);

            // Assert
            expect(trackSpy).toHaveBeenCalled();
        });
    });

    xdescribe('trackFormInteraction :: ', () => {
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
            expect(eventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it.each([
            ['checkout', true],
            ['checkout_guest', false]
        ])('should set `name` to %s if isLoggedIn is %s', (expectedName, isLoggedIn) => {
            // Arrange
            eventData.isLoggedIn = isLoggedIn;

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
            expect(eventSpy).toHaveBeenCalledWith(expectedEvent);
        });
    });
});
