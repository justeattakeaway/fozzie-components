const Header = require('../../../../test-utils/component-objects/f-header.component');
const header = new Header();

describe('Shared - f-header component tests', () => {
    beforeEach(() => {
        const headerData = {
            locale: 'gb',
            offers: true,
            delivery: true
        };

        header.open(headerData);
        header.waitForComponent();
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
