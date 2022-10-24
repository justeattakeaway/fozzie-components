import Rating from '../../test-utils/component-objects/f-rating.component';

const devices = [
    'desktop'
];

devices.forEach(device => {
    describe('f-rating - %s - Visual tests', () => {
        describe('Visually displayed', () => {
            it('should display the f-rating component', async () => {
                // Act
                await Rating.load();

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test', device);
            });
        });

        describe('`starRating`', () => {
            it('should be displayed', async () => {
                // Act
                await Rating.load({ starRating: 5 });

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test for Prop - starRating = 5', device);
            });
        });

        describe('`maxStarRating`', () => {
            it('should be displayed', async () => {
                // Act
                await Rating.load({ starRating: 5 });

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test for Prop - maxStarRating = 5', device);
            });
        });

        describe('`totalReviews`', () => {
            it('should be displayed', async () => {
                // Act
                await Rating.load({ totalReviews: 700 });

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test for Prop - totalReviews = 700', device);
            });
        });

        describe('`starRatingSize`', () => {
            it('should be displayed at the correct size', async () => {
                // Act
                await Rating.load({ starRatingSize: 'small' });

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test for Prop - starRatingSize = small', device);
            });

            it('should be displayed at the correct size', async () => {
                // Act
                await Rating.load({ starRatingSize: 'medium' });

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test for Prop - starRatingSize = medium', device);
            });

            it('should be displayed at the correct size', async () => {
                // Act
                await Rating.load({ starRatingSize: 'large' });

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test for Prop - starRatingSize = large', device);
            });
        });

        describe('`ratingDisplayType`', () => {
            describe('when populated with a `long` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'long' });

                    // Assert
                    await browser.percyScreenshot('f-rating - Visual Test for Prop - ratingDisplayType = long', device);
                });
            });

            describe('when populated with a `short` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'short' });

                    // Assert
                    await browser.percyScreenshot('f-rating - Visual Test for Prop - ratingDisplayType = short', device);
                });
            });

            describe('when populated with a `medium` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'medium' });

                    // Assert
                    await browser.percyScreenshot('f-rating - Visual Test for Prop - ratingDisplayType = medium', device);
                });
            });

            describe('when populated with a `noRating` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'noRating' });

                    // Assert
                    await browser.percyScreenshot('f-rating - Visual Test for Prop - ratingDisplayType = noRating', device);
                });
            });

            describe('when using a default display type', () => {
                it('should be displayed with no description', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: null });

                    // Assert
                    await browser.percyScreenshot('f-rating - Visual Test for Prop - ratingDisplayType = noRating', device);
                });
            });
        });
    });
});
