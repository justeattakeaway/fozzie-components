import forEach from 'mocha-each';

const Alert = require('../../test-utils/component-objects/f-alert.component');

let alert;

forEach(['desktop', 'mobile'])
.forEach(['success', 'warning', 'info', 'danger'])
.describe('f-alert - %s - %s - visual tests', (type, device) => {
    beforeEach(() => {
        // Arrange
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }
        alert = new Alert();
        alert.path = `&args=type:${type};`;
    });

    it('should display the f-alert (%s) component as dismissible', async () => {
        // Act
        await alert.load();

        // Assert
        await browser.percyScreenshot(`f-alert - ${type} - dismissible`, device);
    });

    it('should display the f-alert (%s) component as undismissible', async () => {
        // Arrange
        alert.path += 'isDismissible:false';

        // Act
        await alert.load();
        await alert.waitForComponent();

        // Assert
        await browser.percyScreenshot(`f-alert - ${type} - undismissible`, device);
    });
});
