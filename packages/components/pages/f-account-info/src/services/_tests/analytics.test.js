import AccountInfoAnalyticsService from '../analytics';

let gtmMock;
let analytics;

const pushEventSpy = jest.fn();

describe('Analytics', () => {
    beforeEach(() => {
        gtmMock = {
            pushEvent: pushEventSpy
        };

        analytics = new AccountInfoAnalyticsService(gtmMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('trackFormSubmission ::', () => {
        describe('address has not been updated', () => {
            it('should push submit event only ', () => {
                // Act
                analytics.trackFormSubmission(false);

                // Assert
                expect(pushEventSpy).toMatchSnapshot();
            });
        });

        describe('address has been updated', () => {
            it('should push submit and address changed events', () => {
                // Act
                analytics.trackFormSubmission(true);

                // Assert
                expect(pushEventSpy).toMatchSnapshot();
            });
        });
    });
});
