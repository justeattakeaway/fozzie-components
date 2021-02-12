import * as analyticsService from '../analytics.service';

describe('`dataLayerPushPageData`', () => {
    it('should be defined', () => {
        // Act & Assert
        expect(analyticsService.dataLayerPushPageData).toBeDefined();
    });

    describe('when invoked', () => {
        it('should push `pageData` & `platformData` to the dataLayer with the correct values', () => {
            // Arrange
            const spy = jest.spyOn(Array.prototype, 'push');

            // Act
            analyticsService.dataLayerPushPageData('en-GB');

            // Assert
            expect(spy).toHaveBeenCalledWith({
                pageData: {
                    group: 'Error',
                    httpStatusCode: 404,
                    name: 'Error'
                },
                platformData: {
                    appType: 'Web',
                    applicationId: 7,
                    branding: 'default',
                    country: 'UK',
                    language: 'en-GB',
                    name: 'static_web',
                    statusCode: 404,
                    version: '1'
                }
            });
        });
    });
});
