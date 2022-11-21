import Rating from '../../test-utils/component-objects/f-rating.component';

const devices = [
    'desktop'
];

devices.forEach(device => {
    describe('f-rating Multi Star - %s - Visual tests', () => {
        describe('Visually displayed', () => {
            it('should display the f-rating component', async () => {
                // Act
                await Rating.load();

                // Assert
                await browser.percyScreenshot('f-rating Multi Star - Visual Test', device);
            });
        });

        describe('`starRating`', () => {
            it('should be displayed', async () => {
                // Act
                await Rating.load({ starRating: 5 });

                // Assert
                await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - starRating = 5', device);
            });
        });

        describe('`maxStarRating`', () => {
            it('should be displayed', async () => {
                // Act
                await Rating.load({ maxStarRating: 5 });

                // Assert
                await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - maxStarRating = 5', device);
            });
        });

        describe('`reviewCount`', () => {
            it('should be displayed', async () => {
                // Act
                await Rating.load({ reviewCount: 700 });

                // Assert
                await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - reviewCount = 700', device);
            });
        });

        describe('`starRatingSize`', () => {
            const starRatingSize = [
                'xsmall',
                'small',
                'medium',
                'large'
            ];

            starRatingSize.forEach(size => {
                it('should be displayed at the correct size', async () => {
                    // Act
                    await Rating.load({ starRatingSize: size });

                    // Assert
                    await browser.percyScreenshot(`f-rating Multi Star - Visual Test for Prop - starRatingSize = ${size}`, device);
                });
            });
        });

        describe('`ratingDisplayType`', () => {
            describe('when populated with a `long` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'long' });

                    // Assert
                    await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - ratingDisplayType = long', device);
                });
            });

            describe('when populated with a `short` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'short' });

                    // Assert
                    await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - ratingDisplayType = short', device);
                });
            });

            describe('when populated with a `medium` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'medium' });

                    // Assert
                    await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - ratingDisplayType = medium', device);
                });
            });

            describe('when populated with a `noRating` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'noRating' });

                    // Assert
                    await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - ratingDisplayType = noRating', device);
                });
            });

            describe('when using a default display type', () => {
                it('should be displayed with no description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: null });

                    // Assert
                    await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - ratingDisplayType = null', device);
                });
            });
        });

        describe('`isUserRating`', () => {
            it('should be displayed', async () => {
                // Act
                await Rating.load({ isUserRating: true, reviewCount: 100 });

                // Assert
                await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - isUserRating = true', device);
            });

            describe('when `reviewCount` is zero', () => {
                it('should not be displayed', async () => {
                    // Act
                    await Rating.load({ isUserRating: true, reviewCount: 0 });

                    // Assert
                    await browser.percyScreenshot('f-rating Multi Star - Visual Test for Prop - isUserRating when reviewCount = 0', device);
                });
            });
        });
    });
});
