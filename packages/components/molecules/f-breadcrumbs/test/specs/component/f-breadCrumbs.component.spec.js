import BreadCrumbsComponent from '../../../test-utils/component-objects/f-breadCrumbs.component';

describe('f-breadCrumbs component tests', () => {
    beforeEach(() => {
        browser.url('/?path=/story/components--bread-crumbs-component');
        browser.switchToFrame(0);
        BreadCrumbsComponent.waitForBreadCrumbsComponent();
    });
    it('should display the f-breadCrumbs component', () => {
        // Assert
        expect(BreadCrumbsComponent.isBreadCrumbsComponentDisplayed()).toBe(true);
    });
});
