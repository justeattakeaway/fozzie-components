import StampcardsHeaderComponent from '../../../test-utils/component-objects/f-stampcardsHeader.component';

describe('f-stampcardsHeader component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components--stampcards-header-component');
        browser.switchToFrame(0);
        StampcardsHeaderComponent.waitForStampcardsHeaderComponent();
    });
    it('should display the f-stampcardsHeader component', () => {
        // Assert
        expect(StampcardsHeaderComponent.isStampcardsHeaderComponentDisplayed()).toBe(true);
    });
});
