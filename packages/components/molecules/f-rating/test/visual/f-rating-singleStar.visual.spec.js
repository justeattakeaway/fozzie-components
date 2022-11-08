import RatingSingleStar from '../../test-utils/component-objects/f-rating-singleStar.component';

const devices = [
    'desktop'
];

devices.forEach(device => {
    describe('f-rating Single Star - %s - Visual tests', () => {
        describe('`isSingleStarVariant`', () => {
            it('should display a single star variant', async () => {
                // Act
                await RatingSingleStar.load({ isSingleStarVariant: true });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - isSingleStarVariant = true', device);
            });
        });

        describe('`starRating`', () => {
            it('should be displayed', async () => {
                // Act
                await RatingSingleStar.load({ isSingleStarVariant: true, starRating: 5 });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - starRating = 5', device);
            });
        });

        describe('`maxStarRating`', () => {
            it('should be displayed', async () => {
                // Act
                await RatingSingleStar.load({ isSingleStarVariant: true, maxStarRating: 5 });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - maxStarRating = 5', device);
            });
        });

        describe('`reviewCount`', () => {
            it('should be displayed', async () => {
                // Act
                await RatingSingleStar.load({ isSingleStarVariant: true, reviewCount: 700 });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - reviewCount = 700', device);
            });
        });

        describe('`starRatingSize`', () => {
            it('should be displayed at the correct size', async () => {
                // Act
                await RatingSingleStar.load({ isSingleStarVariant: true, starRatingSize: 'small' });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - starRatingSize = small', device);
            });

            it('should be displayed at the correct size', async () => {
                // Act
                await RatingSingleStar.load({ isSingleStarVariant: true, starRatingSize: 'medium' });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - starRatingSize = medium', device);
            });

            it('should be displayed at the correct size', async () => {
                // Act
                await RatingSingleStar.load({ isSingleStarVariant: true, starRatingSize: 'large' });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - starRatingSize = large', device);
            });
        });

        describe('`ratingDisplayType`', () => {
            describe('when populated with a `long` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await RatingSingleStar.load({
                        isSingleStarVariant: true,
                        ratingDisplayType: 'long'
                    });

                    // Assert
                    await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - ratingDisplayType = long', device);
                });
            });

            describe('when populated with a `short` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await RatingSingleStar.load({
                        isSingleStarVariant: true,
                        ratingDisplayType: 'short'
                    });

                    // Assert
                    await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - ratingDisplayType = short', device);
                });
            });

            describe('when populated with a `medium` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await RatingSingleStar.load({
                        isSingleStarVariant: true,
                        ratingDisplayType: 'medium'
                    });

                    // Assert
                    await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - ratingDisplayType = medium', device);
                });
            });

            describe('when populated with a `noRating` display type', () => {
                it('should be displayed with the correct description', async () => {
                    // Act
                    await RatingSingleStar.load({
                        isSingleStarVariant: true,
                        ratingDisplayType: 'noRating'
                    });

                    // Assert
                    await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - ratingDisplayType = noRating', device);
                });
            });

            describe('when using a default display type', () => {
                it('should be displayed with no description', async () => {
                    // Act
                    await RatingSingleStar.load({
                        isSingleStarVariant: true,
                        ratingDisplayType: null
                    });

                    // Assert
                    await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - ratingDisplayType = null', device);
                });
            });
        });
    });
});
