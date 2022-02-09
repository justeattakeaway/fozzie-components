import forEach from 'mocha-each';

const Alert = require('../../test-utils/component-objects/f-alert.component');

const alert = new Alert();

forEach(['success', 'warning', 'info', 'danger'])
.describe('f-alert - %s - visual tests', type => {
    beforeEach(() => {
        // Arrange
        alert.path = `&args=type:${type};`;
    });

    it('should display the f-alert (%s) component as dismissible', () => {
        // Act
        alert.load();

        // Assert
        browser.percyScreenshot(`f-alert - ${type} - dismissible`, 'desktop');
    });

    it('should display the f-alert (%s) component as undismissible', () => {
        // Arrange
        alert.path += 'isDismissible:false';

        // Act
        alert.load();
        alert.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-alert - ${type} - undismissible`, 'desktop');
    });
});
