const Button = require('../../test-utils/component-objects/f-button.component');

let button = new Button();

describe('f-button component tests', () => {
    it('should display the f-button action component', () => {
        // Act
        button.load({
            'Button Type': 'primary',
            'Button Size': 'medium',
        });

        // Assert
        expect(button.isActionComponentDisplayed()).toBe(true);
    });

    it('should display the f-button link component', () => {
        // Act
        button.loadLink({
            'Button Type': 'link',
            'href': 'link',
            'Button Size': 'medium',
        });

        // Assert
        expect(button.isLinkComponentDisplayed()).toBe(true);
    });
});
