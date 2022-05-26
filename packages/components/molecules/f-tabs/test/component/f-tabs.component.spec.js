import forEach from 'mocha-each';

const Tabs = require('../../test-utils/component-objects/f-tabs.component');

const tabs = new Tabs();

describe('f-tabs component tests', () => {
    beforeEach(async () => {
        await tabs.load();
    });

    it('should display the f-tabs component', async () => {
        // Assert
        await expect(await tabs.isComponentDisplayed()).toBe(true);
    });

    forEach(['Your Stampcards', 'How it works'])
        .it('should display individual tabs', async tab => {
            // Arrange
            tabs.expectedTabButton = tab;

            // Assert
            await expect(await tabs.isTabButtonDisplayed(tab)).toBe(true);
        });
});
