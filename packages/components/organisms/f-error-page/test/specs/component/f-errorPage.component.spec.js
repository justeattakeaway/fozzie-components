import ErrorPageComponent from '../../../test-utils/component-objects/f-errorPage.component';

describe('f-errorPage component tests', () => {
    beforeEach(() => {
        browser.url('?path=story/components-organisms--error-page-component');
        browser.switchToFrame(0);
        ErrorPageComponent.waitForErrorPageComponent();
    });

    it('should display the f-errorPage component', () => {
        // Assert
        expect(ErrorPageComponent.isErrorPageComponentDisplayed()).toBe(true);
    });
});
