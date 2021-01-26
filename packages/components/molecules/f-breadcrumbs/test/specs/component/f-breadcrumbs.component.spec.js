import BreadcrumbsComponent from '../../../test-utils/component-objects/f-breadcrumbs.component';

describe('f-breadCrumbs component tests', () => {
    beforeEach(() => {
        browser.url('/?path=/story/components--breadcrumbs-component');
        browser.switchToFrame(0);
        BreadcrumbsComponent.waitForBreadCrumbsComponent();
    });
    it('should display the f-breadcrumbs component', () => {
        // Assert
        expect(BreadcrumbsComponent.isBreadCrumbsComponentDisplayed()).toBe(true);
    });
});
