const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Button = require('../../test-utils/component-objects/f-button.component');

let button;

describe('f-button visual tests', () => {
    describe('primary button', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - Medium', 'shared');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - Large', 'shared');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - Small', 'shared');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'primary');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Primary - XSmall', 'shared');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'primary');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Primary - Medium - Loading', 'shared');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'primary');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Primary - Large - Loading', 'shared');
            });
        });
    });

    describe('secondary button', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - Medium', 'shared');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - Large', 'shared');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - Small', 'shared');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'secondary');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Secondary - XSmall', 'shared');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'secondary');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Secondary - Medium - Loading', 'shared');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'secondary');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Secondary - Large - Loading', 'shared');
            });
        });
    });

    describe('outline button', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - Medium', 'shared');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - Large', 'shared');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - Small', 'shared');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'outline');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Outline - XSmall', 'shared');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'outline');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Outline - Medium - Loading', 'shared');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'outline');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Outline - Large - Loading', 'shared');
            });
        });
    });

    describe('ghost', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - Medium', 'shared');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - Large', 'shared');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - Small', 'shared');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'ghost');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Ghost - XSmall', 'shared');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'ghost');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Ghost - Medium - Loading', 'shared');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'ghost');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Ghost - Large - Loading', 'shared');
            });
        });
    });

    describe('link', () => {
        it('should display medium size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'medium');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - Medium', 'shared');
        });

        it('should display large size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'large');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - Large', 'shared');
        });

        it('should display small size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'small');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - Small', 'shared');
        });

        it('should display xsmall size', () => {
            // Arrange
            button = new Button('atom-folder', 'f-button--button-component');
            button.withQuery('knob-Button Type', 'link');
            button.withQuery('knob-Button Size', 'xsmall');
            const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

            // Act
            button.open(pageUrl);
            button.waitForActionComponent();

            // Assert
            browser.percyScreenshot('f-button - Link - XSmall', 'shared');
        });

        describe('isLoading', () => {
            it('should display medium size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'link');
                button.withQuery('knob-Button Size', 'medium');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Link - Medium - Loading', 'shared');
            });

            it('should display large size in a loading state', () => {
                // Arrange
                button = new Button('atom-folder', 'f-button--button-component');
                button.withQuery('knob-Button Type', 'link');
                button.withQuery('knob-Button Size', 'large');
                button.withQuery('knob-isLoading', 'true');
                const pageUrl = buildUrl(button.componentType, button.componentName, button.path);

                // Act
                button.open(pageUrl);
                button.waitForActionComponent();

                // Assert
                browser.percyScreenshot('f-button - Link - Large - Loading', 'shared');
            });
        });
    });
});
