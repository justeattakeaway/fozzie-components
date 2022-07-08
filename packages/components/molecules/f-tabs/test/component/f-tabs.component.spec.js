import Tabs from '../../test-utils/component-objects/f-tabs.component';

describe('f-tabs component tests', () => {
    beforeEach(async () => {
        await Tabs.load();
    });

    it('should display the f-tabs component', async () => {
        // Assert
        await expect(await Tabs.isComponentDisplayed()).toBe(true);
    });

    const tabs = [
        'Your Stampcards',
        'How it works (I can be renamed)'
    ];
    tabs.forEach(tab => {
        it('should display individual tabs', async () => {
            // Assert
            await expect(await Tabs.isTabButtonDisplayed(tab)).toBe(true);
        });
    });
});
