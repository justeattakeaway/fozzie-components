import ActionButton from '../../test-utils/component-objects/f-button--action.component';
import LinkButton from '../../test-utils/component-objects/f-button--link.component';
import IconButton from '../../test-utils/component-objects/f-button--icon.component';

describe('f-button Desktop visual tests', () => {
    describe('primary, secondary, outline and ghost buttons in all 4 sizes', () => {
        it('should be displayed', async () => {
            // Act
            await ActionButton.load();

            // Assert
            await browser.percyScreenshot('f-button - Action', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed', async () => {
                // Act
                await ActionButton.load({ isLoading: true });

                // Assert
                await browser.percyScreenshot('f-button - Action - Loading', 'desktop');
            });
        });

        describe('in disabled state', () => {
            it('should be displayed', async () => {
                // Act
                await ActionButton.load({ disabled: true });

                // Assert
                await browser.percyScreenshot('f-button - Action - Disabled', 'desktop');
            });
        });

        describe('in state with leading icon', () => {
            it('should be displayed', async () => {
                // Act
                await ActionButton.load({ hasIcon: 'leading' });

                // Assert
                await browser.percyScreenshot('f-button - Action - With Leading Icon', 'desktop');
            });
        });

        describe('in state with trailing icon', () => {
            it('should be displayed', async () => {
                // Act
                await ActionButton.load({ hasIcon: 'trailing' });

                // Assert
                await browser.percyScreenshot('f-button - Action - With Trailing Icon', 'desktop');
            });
        });
    });

    describe('link button', () => {
        it('should be displayed in all 4 sizes', async () => {
            // Act
            await LinkButton.load();

            // Assert
            await browser.percyScreenshot('f-button - Link', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed in all 4 sizes', async () => {
                // Act
                await LinkButton.load({ isLoading: true });

                // Assert
                await browser.percyScreenshot('f-button - Link - Loading', 'desktop');
            });
        });

        describe('in disabled state', () => {
            it('should be displayed', async () => {
                // Act
                await LinkButton.load({ disabled: true });

                // Assert
                await browser.percyScreenshot('f-button - Link - Disabled', 'desktop');
            });
        });

        describe('in state with leading icon', () => {
            it('should be displayed', async () => {
                // Act
                await LinkButton.load({ hasIcon: 'leading' });

                // Assert
                await browser.percyScreenshot('f-button - Link - With Leading Icon', 'desktop');
            });
        });

        describe('in state with trailing icon', () => {
            it('should be displayed', async () => {
                // Act
                await LinkButton.load({ hasIcon: 'trailing' });

                // Assert
                await browser.percyScreenshot('f-button - Link - With Trailing Icon', 'desktop');
            });
        });
    });

    describe('all valid iconButton types in all sizes', () => {
        it('should be displayed', async () => {
            // Act
            await IconButton.load();

            // Assert
            await browser.percyScreenshot('f-button - Icon', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed', async () => {
                // Act
                await IconButton.load({ isLoading: true });

                // Assert
                await browser.percyScreenshot('f-button - Icon - Loading', 'desktop');
            });
        });
    });
});
