import HeaderComponent from '../../../test-utils/component-objects/f-header.component';

describe('f-header component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    })

    it('should display the f-header component', () => {

        // Assert
        expect(HeaderComponent.isLogoDisplayed()).toBe(true);
    });
});
