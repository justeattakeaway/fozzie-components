import forEach from 'mocha-each';
const Tabs = require ('../../../test-utils/component-objects/f-tabs.component');
const tabs = new Tabs();

describe('f-tabs component tests', () => {
    beforeEach(() => {
        tabs.open();
        tabs.waitForComponent();
    });

    it('should display the f-tabs component', () => {
        // Assert
        expect(tabs.isComponentDisplayed()).toBe(true);
    });

    forEach(['Your Stampcards', 'How it works'])
    .it('should display individual tabs', tab => {
        // Arrange
        tabs.expectedTabButton = tab;

        // Assert
        expect(tabs.isTabButtonDisplayed(tab)).toBe(true);
    });
});
