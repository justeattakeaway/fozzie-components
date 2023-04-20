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
                    await RatingSingleStar.load({ isSingleStarVariant: true, starRatingSize: size });

                    // Assert
                    await browser.percyScreenshot(`f-rating Single Star - Visual Test for Prop - starRatingSize = ${size}`, device);
                });
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

        describe('`isUserRating`', () => {
            it('should be displayed', async () => {
                // Act
                await RatingSingleStar.load({ isUserRating: true, reviewCount: 100 });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - isUserRating = true', device);
            });

            describe('when `reviewCount` is zero', () => {
                it('should not be displayed', async () => {
                    // Act
                    await RatingSingleStar.load({ isUserRating: true, reviewCount: 0 });

                    // Assert
                    await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - isUserRating when reviewCount = 0', device);
                });
            });
        });

        describe('`shouldAlignRatingTextLeft`', () => {
            it('should be displayed on the left hand side of the ratings with a default font size', async () => {
                // Act
                await RatingSingleStar.load({ shouldAlignRatingTextLeft: true, reviewCount: 5, ratingDisplayType: 'short' });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - shouldAlignRatingTextLeft = true', device);
            });
        });

        describe('`ratingFontSize`', () => {
            it('should be displayed on the left hand side of the ratings with a `large` font size', async () => {
                // Act
                await RatingSingleStar.load({ shouldAlignRatingTextLeft: true, ratingFontSize: 'large', ratingDisplayType: 'short' });

                // Assert
                await browser.percyScreenshot('f-rating Single Star - Visual Test for Prop - ratingFontSize = large & shouldAlignRatingTextLeft = true', device);
            });
        });
    });
});
