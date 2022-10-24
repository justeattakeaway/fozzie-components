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
            it('should be displayed', async () => {
                // Act
                await Rating.load({ starRatingSize: 'medium' });

                // Assert
                await browser.percyScreenshot('f-rating - Visual Test for Prop - starRatingSize = medium', device);
            });
        });

        describe('`ratingDisplayType`', () => {
            describe('when populated with a valid type', () => {
                it('should be displayed', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'long' });

                    // Assert
                    await browser.percyScreenshot('f-rating - Visual Test for Prop - ratingDisplayType = long', device);
                });
            });

            describe('when using a default type', () => {
                it('should be displayed', async () => {
                    // Act
                    await Rating.load({ ratingDisplayType: 'noRating' });

                    // Assert
                    await browser.percyScreenshot('f-rating - Visual Test for Prop - ratingDisplayType = noRating', device);
                });
            });
        });
    });
});
