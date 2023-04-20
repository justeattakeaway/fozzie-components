import Switch from '../../test-utils/component-objects/f-switch.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-switch - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-switch component `checked=false`', async () => {
            // Act
            await Switch.load();

            // Assert
            await browser.percyScreenshot('f-switch - Visual Test', device);
        });

        it('should display the f-switch component `checked=true`', async () => {
            // Act
            await Switch.load({ checked: true });

            // Assert
            await browser.percyScreenshot('f-switch - Visual Test - Checked', device);
        });

        describe('when f-switch is disabled', () => {
            it('should display the f-switch component `checked=false`', async () => {
                // Act
                await Switch.load({ disabled: true });

                // Assert
                await browser.percyScreenshot('f-switch - Visual Test', device);
            });

            it('should display the f-switch component `checked=true`', async () => {
                // Act
                await Switch.load({ disabled: true, checked: true });

                // Assert
                await browser.percyScreenshot('f-switch - Visual Test - Checked', device);
            });
        });

        describe('when f-switch in rtl reading/writing direction', () => {
            it('should display the f-switch component `checked=false`', async () => {
                // Act
                await Switch.load({ direction: 'rtl' });

                // Assert
                await browser.percyScreenshot('f-switch - Visual Test', device);
            });

            it('should display the f-switch component `checked=true`', async () => {
                // Act
                await Switch.load({ direction: 'rtl', checked: true });

                // Assert
                await browser.percyScreenshot('f-switch - Visual Test - Checked', device);
            });
        });
    });
});
