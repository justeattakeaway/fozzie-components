const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Button = require('../../test-utils/component-objects/f-button.component');

let button;

describe('f-button Desktop visual tests', () => {
    describe('primary button', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - Large', 'desktop');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'primary');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Primary - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'primary');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Primary - Large - Loading', 'desktop');
            });
        });
    });

    describe('secondary button', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - Large', 'desktop');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'secondary');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Secondary - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'secondary');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Secondary - Large - Loading', 'desktop');
            });
        });
    });

    describe('outline button', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - Large', 'desktop');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'outline');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Outline - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'outline');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Outline - Large - Loading', 'desktop');
            });
        });
    });

    describe('ghost', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - Large', 'desktop');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'ghost');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Ghost - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'ghost');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Ghost - Large - Loading', 'desktop');
            });
        });
    });

    describe('link', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - Medium', 'desktop');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - Large', 'desktop');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - Small', 'desktop');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button();
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - XSmall', 'desktop');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'link');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Link - Medium - Loading', 'desktop');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button();
                button.withQuery('knob-Button Type', 'link');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Link - Large - Loading', 'desktop');
            });
        });
    });
});
