const Header = require('../../test-utils/component-objects/f-header.component');

let header;

describe('Shared - f-header component tests - @percy', () => {
    beforeEach(() => {
        header = new Header();
        header.withQuery('&knob-Locale', 'en-GB');
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');

        // Act
        header.load();
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
