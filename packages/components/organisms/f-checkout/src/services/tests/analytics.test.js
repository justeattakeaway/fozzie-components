import Trak from '@justeat/f-trak';
import * as analytics  from '../analytics';

describe('checkout analytics', () => {
    let eventSpy;
    let trackSpy;

    beforeEach(() => {
        eventSpy = jest.spyOn(Trak, 'event').mockImplementation();
        trackSpy = jest.spyOn(analytics, 'trackFormInteraction').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('analytics.trackInitialLoad :: ', () => {
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
                        id: basket.id,
                        total: basket.total
                    },
                    restaurant: {
                        id: restaurantId
                    },
                    pageData: {
                        name: `Checkout 1 Overview`,
                        group: 'Checkout'
                    }
                }
            };

            // Act
            analytics.trackInitialLoad(basket, restaurantId, isLoggedIn);

            // Assert
            expect(eventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        xit.each([
            ['Checkout 1 Overview', true],
            ['Checkout 1 Guest', false]
        ])('should set `pageData.name` to %s if isLoggedIn is %s', (expectedName, isLoggedIn) => {
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
            }

            // Act
            analytics.trackInitialLoad(basket, restaurantId, isLoggedIn);

            // Assert
            expect(eventSpy).toHaveBeenCalledWith(expectedEvent);
        });

        it('should call `trackFormInteraction` if `eventData` contains `checkoutData`', () => {
            // Arrange
            const checkoutData = 'data';
            analytics.trackFormInteraction =jest.fn();

            // Act
            analytics.trackInitialLoad(basket, restaurantId, isLoggedIn, checkoutData);
            console.log(analytics.trackFormInteraction); // eslint-disable-line no-console

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
            analytics.trackFormInteraction(eventData);

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
            analytics.trackFormInteraction(eventData);

            // Assert
            expect(eventSpy).toHaveBeenCalledWith(expectedEvent);
        });
    });
});
