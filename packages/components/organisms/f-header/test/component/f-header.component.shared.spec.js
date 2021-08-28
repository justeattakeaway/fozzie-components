const Header = require('../../test-utils/component-objects/f-header.component');

let header = new Header();

describe('Shared - f-header component tests - @percy', () => {
    beforeEach(() => {
        // Act
        header.load({
            'Locale': 'en-GB',
            'Show offers link': 'true',
            'Show delivery enquiry': 'true'
        });
    });

    it('should display component', () => {
        // Assert
        expect(header.isComponentDisplayed()).toBe(true);
    });

    it('should display logo', () => {
        // Assert
        expect(header.isLogoDisplayed()).toBe(true);
    });
});
