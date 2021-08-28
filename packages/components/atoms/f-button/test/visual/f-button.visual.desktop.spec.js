const Button = require('../../test-utils/component-objects/f-button.component');

let button = new Button();

describe('f-button Desktop visual tests', () => {
    describe('primary button', () => {
        it('should display medium size', () => {
            // Act
            button.load({
                'Button Type': 'primary',
                'Button Size': 'medium',
            });

            // Assert
            browser.percyScreenshot('f-button - Primary - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Act
            button.load({
                'Button Type': 'primary',
                'Button Size': 'large',
            });

            // Assert
            browser.percyScreenshot('f-button - Primary - Large', 'desktop');
        });

        it('should display small size', () => {
            // Act
            button.load({
                'Button Type': 'primary',
                'Button Size': 'small',
            });

            // Assert
            browser.percyScreenshot('f-button - Primary - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Act
            button.load({
                'Button Type': 'primary',
                'Button Size': 'xsmall',
            });

            // Assert
            browser.percyScreenshot('f-button - Primary - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'primary',
                    'Button Size': 'medium',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Primary - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'primary',
                    'Button Size': 'large',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Primary - Large - Loading', 'desktop');
            });
        });
    });

    describe('secondary button', () => {
        it('should display medium size', () => {
            // Act
            button.load({
                'Button Type': 'secondary',
                'Button Size': 'medium',
            });

            // Assert
            browser.percyScreenshot('f-button - Secondary - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Act
            button.load({
                'Button Type': 'secondary',
                'Button Size': 'large',
            });

            // Assert
            browser.percyScreenshot('f-button - Secondary - Large', 'desktop');
        });

        it('should display small size', () => {
            // Act
            button.load({
                'Button Type': 'secondary',
                'Button Size': 'small',
            });

            // Assert
            browser.percyScreenshot('f-button - Secondary - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Act
            button.load({
                'Button Type': 'secondary',
                'Button Size': 'xsmall',
            });

            // Assert
            browser.percyScreenshot('f-button - Secondary - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'secondary',
                    'Button Size': 'medium',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Secondary - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'secondary',
                    'Button Size': 'large',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Secondary - Large - Loading', 'desktop');
            });
        });
    });

    describe('outline button', () => {
        it('should display medium size', () => {
            // Act
            button.load({
                'Button Type': 'outline',
                'Button Size': 'medium',
            });

            // Assert
            browser.percyScreenshot('f-button - Outline - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Act
            button.load({
                'Button Type': 'outline',
                'Button Size': 'large',
            });

            // Assert
            browser.percyScreenshot('f-button - Outline - Large', 'desktop');
        });

        it('should display small size', () => {
            // Act
            button.load({
                'Button Type': 'outline',
                'Button Size': 'small',
            });

            // Assert
            browser.percyScreenshot('f-button - Outline - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Act
            button.load({
                'Button Type': 'outline',
                'Button Size': 'xsmall',
            });

            // Assert
            browser.percyScreenshot('f-button - Outline - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'outline',
                    'Button Size': 'medium',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Outline - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'outline',
                    'Button Size': 'large',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Outline - Large - Loading', 'desktop');
            });
        });
    });

    describe('ghost', () => {
        it('should display medium size', () => {
            // Act
            button.load({
                'Button Type': 'ghost',
                'Button Size': 'medium',
            });

            // Assert
            browser.percyScreenshot('f-button - Ghost - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Act
            button.load({
                'Button Type': 'ghost',
                'Button Size': 'large',
            });

            // Assert
            browser.percyScreenshot('f-button - Ghost - Large', 'desktop');
        });

        it('should display small size', () => {
            // Act
            button.load({
                'Button Type': 'ghost',
                'Button Size': 'small',
            });

            // Assert
            browser.percyScreenshot('f-button - Ghost - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Act
            button.load({
                'Button Type': 'ghost',
                'Button Size': 'xsmall',
            });

            // Assert
            browser.percyScreenshot('f-button - Ghost - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'ghost',
                    'Button Size': 'medium',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Ghost - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'ghost',
                    'Button Size': 'large',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Ghost - Large - Loading', 'desktop');
            });
        });
    });

    describe('link', () => {
        it('should display medium size', () => {
            // Act
            button.load({
                'Button Type': 'link',
                'Button Size': 'medium',
            });

            // Assert
            browser.percyScreenshot('f-button - Link - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Act
            button.load({
                'Button Type': 'link',
                'Button Size': 'large',
            });

            // Assert
            browser.percyScreenshot('f-button - Link - Large', 'desktop');
        });

        it('should display small size', () => {
            // Act
            button.load({
                'Button Type': 'link',
                'Button Size': 'small',
            });

            // Assert
            browser.percyScreenshot('f-button - Link - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Act
            button.load({
                'Button Type': 'link',
                'Button Size': 'xsmall',
            });

            // Assert
            browser.percyScreenshot('f-button - Link - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'link',
                    'Button Size': 'medium',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Link - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Act
                button.load({
                    'Button Type': 'link',
                    'Button Size': 'large',
                    'isLoading': 'true',
                });

                // Assert
                browser.percyScreenshot('f-button - Link - Large - Loading', 'desktop');
            });
        });
    });
});
