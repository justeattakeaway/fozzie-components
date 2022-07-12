import FormField from '../../test-utils/component-objects/f-form-field--visual.component';

describe('f-form-field visual tests', () => {
    describe('default state', () => {
        it('should display all fields in the default state', async () => {
            // Act
            await FormField.load();

            // Assert
            await browser.percyScreenshot('f-form-field - Base State', 'desktop');
        });
    });

    describe('disabled state', () => {
        it('should display all fields in a disabled state', async () => {
            // Act
            await FormField.load({ isDisabled: true });

            // Assert
            await browser.percyScreenshot('f-form-field - Disabled State', 'desktop');
        });
    });

    describe('errored state', () => {
        it('should display all fields in an errored state', async () => {
            // Act
            await FormField.load({ hasError: true });

            // Assert
            await browser.percyScreenshot('f-form-field - Errored State', 'desktop');
        });
    });

    describe('required state', () => {
        it.each([
            ['WITH', true],
            ['WITHOUT', false]
        ])('should be able to display required fields %s visual indicator', async (withOrWithout, isVisuallyRequired) => {
            // Act
            await FormField.load({
                required: true,
                isVisuallyRequired
            });

            // Assert
            await browser.percyScreenshot(`f-form-field - Required ${withOrWithout} visual indicator', 'desktop`);
        });
    });
});
