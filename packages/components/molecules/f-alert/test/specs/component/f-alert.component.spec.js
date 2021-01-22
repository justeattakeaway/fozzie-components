import AlertComponent from '../../../test-utils/component-objects/f-alert.component';
import { MOLECULES } from '../../../../../../../url.selectors';

describe('f-alert component tests', () => {
    beforeEach(() => {
        browser.url(`${MOLECULES}alert-component`);
    });

    it('should display Alert', () => {
        // Assert
        expect(AlertComponent.isAlertDisplayed()).toBe(true);
    });

    it('should close alert when exit button is clicked', () => {
        // Act
        AlertComponent.exitAlert();

        // Assert
        expect(AlertComponent.isAlertDisplayed()).toBe(false);
    });
});
