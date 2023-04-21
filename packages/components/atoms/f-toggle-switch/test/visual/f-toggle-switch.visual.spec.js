import ToggleSwitch from '../../test-utils/component-objects/f-toggle-switch.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-toggle-switch - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-toggle-switch component `checked=false`', async () => {
            // Act
            await ToggleSwitch.load();

            // Assert
            await browser.percyScreenshot('f-toggle-switch - Visual Test', device);
        });

        it('should display the f-toggle-switch component `checked=true`', async () => {
            // Act
            await ToggleSwitch.load({ checked: true });

            // Assert
            await browser.percyScreenshot('f-toggle-switch - Visual Test - Checked', device);
        });

        describe('when f-toggle-switch is disabled', () => {
            it('should display the f-toggle-switch component `checked=false`', async () => {
                // Act
                await ToggleSwitch.load({ disabled: true });

                // Assert
                await browser.percyScreenshot('f-toggle-switch - Visual Test', device);
            });

            it('should display the f-toggle-switch component `checked=true`', async () => {
                // Act
                await ToggleSwitch.load({ disabled: true, checked: true });

                // Assert
                await browser.percyScreenshot('f-toggle-switch - Visual Test - Checked', device);
            });
        });

        describe('when f-toggle-switch in rtl reading/writing direction', () => {
            it('should display the f-toggle-switch component `checked=false`', async () => {
                // Act
                await ToggleSwitch.load({ direction: 'rtl' });

                // Assert
                await browser.percyScreenshot('f-toggle-switch - Visual Test', device);
            });

            it('should display the f-toggle-switch component `checked=true`', async () => {
                // Act
                await ToggleSwitch.load({ direction: 'rtl', checked: true });

                // Assert
                await browser.percyScreenshot('f-toggle-switch - Visual Test - Checked', device);
            });
        });
    });
});
