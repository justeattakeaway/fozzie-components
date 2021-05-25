const Button = require('../../test-utils/component-objects/f-button.component');

const button = new Button();

describe('f-button visual tests', () => {
    it('should display the f-button action component', () => {
        // Act
        button.open();
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Action', 'shared');
    });

    it('should display the f-button link component', () => {
        // Act
        button.open('link');
        button.waitForLinkComponent();

        // Assert
        browser.percyScreenshot('f-button - Link', 'shared');
    });
});
