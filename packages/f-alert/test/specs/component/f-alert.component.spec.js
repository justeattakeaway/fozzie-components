import AlertComponent from '../../../test-utils/component-objects/f-alert.component';

describe('f-alert component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
        AlertComponent.waitForAlert();
    });

    it('should display Alert', () => {
        //Assert
        expect(AlertComponent.isAlertDisplayed()).toBe(true);
    });

    it('should close alert when exit button is clicked', () => {
        //Act
        AlertComponent.exitAlert(); 
        
        //Assert
        expect(AlertComponent.isAlertDisplayed()).toBe(false);
    });
});
