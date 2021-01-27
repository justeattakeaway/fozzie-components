import BreadcrumbsComponent from '../../../test-utils/component-objects/f-breadcrumbs.component';

describe('f-breadcrumbs component tests', () => {
    beforeEach(() => {
        browser.url('/?path=/story/components--breadcrumbs-component');
        browser.switchToFrame(0);
        BreadcrumbsComponent.waitForBreadcrumbsComponent();
    });
    it('should display the f-breadcrumbs component', () => {
        // Assert
        expect(BreadcrumbsComponent.isBreadcrumbsComponentDisplayed()).toBe(true);
    });
});
