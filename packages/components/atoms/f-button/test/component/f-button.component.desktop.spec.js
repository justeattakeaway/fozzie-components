const Button = require('../../test-utils/component-objects/f-button.component');

const button = new Button();

describe('f-button component tests', () => {
    it('should display the f-button action component', () => {
        // Act
        button.open({
            type: 'primary',
            size: 'medium'
        });
        button.waitForActionComponent();

        // Assert
        expect(button.isActionComponentDisplayed()).toBe(true);
    });

    it('should display the f-button link component', () => {
        // Act
        button.open({
            type: 'link',
            size: 'medium'
        });
        button.waitForLinkComponent();

        // Assert
        expect(button.isLinkComponentDisplayed()).toBe(true);
    });
});
