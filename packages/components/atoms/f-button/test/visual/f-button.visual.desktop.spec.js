const ActionButton = require('../../test-utils/component-objects/f-button--action.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('f-button Desktop visual tests', () => {
    describe('primary, secondary, outline and ghost buttons in all 4 sizes', () => {
        it('should be displayed', async () => {
            // Arrange
            button = new ActionButton();

            // Act
            await button.load(button.component);

            // Assert
            await browser.percyScreenshot('f-button - Action', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new ActionButton();

                // Act
                await button.load(button.component, { isLoading: true });

                // Assert
                await browser.percyScreenshot('f-button - Action - Loading', 'desktop');
            });
        });

        describe('in disabled state', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new ActionButton();

                // Act
                await button.load(button.component, { disabled: true});

                // Assert
                await browser.percyScreenshot('f-button - Action - Disabled', 'desktop');
            });
        });

        describe('in state with leading icon', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new ActionButton();

                // Act
                await button.load(button.component, { hasIcon: 'leading' });

                // Assert
                await browser.percyScreenshot('f-button - Action - With Leading Icon', 'desktop');
            });
        });

        describe('in state with trailing icon', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new ActionButton();

                // Act
                await button.load(button.component, { hasIcon: 'trailing' });

                // Assert
                await browser.percyScreenshot('f-button - Action - With Trailing Icon', 'desktop');
            });
        });
    });

    describe('link button', () => {
        it('should be displayed in all 4 sizes', async () => {
            // Arrange
            button = new LinkButton();

            // Act
            await button.load(button.component);

            // Assert
            await browser.percyScreenshot('f-button - Link', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed in all 4 sizes', async () => {
                // Arrange
                button = new LinkButton();

                // Act
                await button.load(button.component, { isLoading: true });

                // Assert
                await browser.percyScreenshot('f-button - Link - Loading', 'desktop');
            });
        });

        describe('in disabled state', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new LinkButton();

                // Act
                await button.load(button.component, { disabled: true });

                // Assert
                await browser.percyScreenshot('f-button - Link - Disabled', 'desktop');
            });
        });

        describe('in state with leading icon', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new LinkButton();

                // Act
                await button.load(button.component, { hasIcon: 'leading' });

                // Assert
                await browser.percyScreenshot('f-button - Link - With Leading Icon', 'desktop');
            });
        });

        describe('in state with trailing icon', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new LinkButton();

                // Act
                await button.load(button.component, { hasIcon: 'trailing' });

                // Assert
                await browser.percyScreenshot('f-button - Link - With Trailing Icon', 'desktop');
            });
        });
    });

    describe('all valid iconButton types in all sizes', () => {
        it('should be displayed', async () => {
            // Arrange
            button = new IconButton();

            // Act
            await button.load(button.component);

            // Assert
            await browser.percyScreenshot('f-button - Icon', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed', async () => {
                // Arrange
                button = new IconButton();

                // Act
                await button.load(button.component, { isLoading: true });

                // Assert
                await browser.percyScreenshot('f-button - Icon - Loading', 'desktop');
            });
        });
    });
});
