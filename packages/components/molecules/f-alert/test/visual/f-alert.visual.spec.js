import forEach from 'mocha-each';

const Alert = require('../../test-utils/component-objects/f-alert.component');

let alert;

forEach([
    ['desktop', 'success'],
    ['desktop', 'warning'],
    ['desktop', 'info'],
    ['desktop', 'danger'],
    ['mobile', 'success'],
    ['mobile', 'warning'],
    ['mobile', 'info'],
    ['mobile', 'danger']
])
.describe('f-alert - %s - %s - visual tests', (device, type) => {
    beforeEach(() => {
        // Arrange
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }
        alert = new Alert();
    });

    it('should display the f-alert (%s) component as dismissible', async () => {
        // Act
        await alert.load({ type: `${type}` });

        // Assert
        await browser.percyScreenshot(`f-alert - ${type} - dismissible`, device);
    });

    it('should display the f-alert (%s) component as undismissible', async () => {
        // Act
        await alert.load({ isDismissible: false, type: `${type}` });

        // Assert
        await browser.percyScreenshot(`f-alert - ${type} - undismissible`, device);
    });
});
