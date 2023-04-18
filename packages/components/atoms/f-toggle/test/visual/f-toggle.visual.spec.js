import Toggle from '../../test-utils/component-objects/f-toggle.component';

const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe('f-toggle - %s - Visual tests', () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-toggle component `checked=false`', async () => {
            // Act
            await Toggle.load();

            // Assert
            await browser.percyScreenshot('f-toggle - Visual Test', device);
        });

        it('should display the f-toggle component `checked=true`', async () => {
            // Act
            await Toggle.load({ checked: true });

            // Assert
            await browser.percyScreenshot('f-toggle - Visual Test - Checked', device);
        });

        describe('when f-toggle is disabled', () => {
            it('should display the f-toggle component `checked=false`', async () => {
                // Act
                await Toggle.load({ disabled: true });

                // Assert
                await browser.percyScreenshot('f-toggle - Visual Test', device);
            });

            it('should display the f-toggle component `checked=true`', async () => {
                // Act
                await Toggle.load({ disabled: true, checked: true });

                // Assert
                await browser.percyScreenshot('f-toggle - Visual Test - Checked', device);
            });
        });

        describe('when f-toggle in rtl reading/writing direction', () => {
            it('should display the f-toggle component `checked=false`', async () => {
                // Act
                await Toggle.load({ direction: 'rtl' });

                // Assert
                await browser.percyScreenshot('f-toggle - Visual Test', device);
            });

            it('should display the f-toggle component `checked=true`', async () => {
                // Act
                await Toggle.load({ direction: 'rtl', checked: true });

                // Assert
                await browser.percyScreenshot('f-toggle - Visual Test - Checked', device);
            });
        });
    });
});
