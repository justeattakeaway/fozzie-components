const Button = require('../../test-utils/component-objects/f-button.component');
const LinkButton = require('../../test-utils/component-objects/f-button--link.component');
const IconButton = require('../../test-utils/component-objects/f-button--icon.component');

let button;

describe('f-button Desktop visual tests', () => {
    describe('primary, secondary, outline and ghost buttons in all 4 sizes', () => {
        it('should be displayed', () => {
            // Arrange
            button = new Button();

            // Act
            button.load();

            // Assert
            browser.percyScreenshot('f-button - Action', 'desktop');
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
                browser.percyScreenshot('f-button - Link - Disabled', 'desktop');
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

    describe('all valid iconButton types in all sizes', () => {
        it('should be displayed', () => {
            // Arrange
            button = new IconButton();

            // Act
            button.load();

            // Assert
            browser.percyScreenshot('f-button - Icon', 'desktop');
        });

        describe('in isLoading state', () => {
            it('should be displayed', () => {
                // Arrange
                button = new IconButton();
                button.withQuery('args', 'isLoading');

                // Act
                button.load();

                // Assert
                browser.percyScreenshot('f-button - Icon - Loading', 'desktop');
            });
        });
    });
});
