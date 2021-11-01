const Button = require('../../test-utils/component-objects/f-button.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');

let button;

describe('f-button Desktop visual tests', () => {
    describe('primary, secondary, ghost, ghostInverse and ghostTertiary buttons in all 4 sizes', () => {
        it('should be displayed', () => {
            // Arrange
            button = new Button();

            // Act
            button.load();

            // Assert
            browser.percyScreenshot('f-button - icon - Action', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed', () => {
                // Arrange
                button = new Button();
                button.withQuery('args', 'isLoading');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Action - Loading', 'desktop');
            });
        });

        describe('in disabled state', () => {
            it('should be displayed', () => {
                // Arrange
                button = new Button();
                button.withQuery('args', 'disabled');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Action - Disabled', 'desktop');
            });
        });

        describe('in state with leading icon', () => {
            it('should be displayed', () => {
                // Arrange
                button = new Button();
                button.withQuery('args', 'hasIcon:leading');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Action - With Leading Icon', 'desktop');
            });
        });

        describe('in state with trailing icon', () => {
            it('should be displayed', () => {
                // Arrange
                button = new Button();
                button.withQuery('args', 'hasIcon:trailing');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Action - With Trailing Icon', 'desktop');
            });
        });
    });

    describe('link button', () => {
        it('should be displayed in all 4 sizes', () => {
            // Arrange
            button = new LinkButton();

            // Act
            button.load();

            // Assert
            browser.percyScreenshot('f-button - Link', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed in all 4 sizes', () => {
                // Arrange
                button = new LinkButton();
                button.withQuery('args', 'isLoading');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Link - Loading', 'desktop');
            });
        });

        describe('in disabled state', () => {
            it('should be displayed', () => {
                // Arrange
                button = new LinkButton();
                button.withQuery('args', 'disabled');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Action - Disabled', 'desktop');
            });
        });

        describe('in state with leading icon', () => {
            it('should be displayed', () => {
                // Arrange
                button = new LinkButton();
                button.withQuery('args', 'hasIcon:leading');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Link - With Leading Icon', 'desktop');
            });
        });

        describe('in state with trailing icon', () => {
            it('should be displayed', () => {
                // Arrange
                button = new LinkButton();
                button.withQuery('args', 'hasIcon:trailing');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Link - With Trailing Icon', 'desktop');
            });
        });
    });
});
