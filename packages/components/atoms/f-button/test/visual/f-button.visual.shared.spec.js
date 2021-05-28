const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Button = require('../../test-utils/component-objects/f-button.component');

let button;

describe('f-button visual tests', () => {
    it('should display medium size primary button', () => {
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

    it('should display large size primary button', () => {
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

    it('should display small size primary button', () => {
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

    it('should display xsmall size primary button', () => {
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

    it('should display medium size secondary button', () => {
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

    it('should display large size secondary button', () => {
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

    it('should display small size secondary button', () => {
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

    it('should display xsmall size secondary button', () => {
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

    it('should display medium size outline button', () => {
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

    it('should display large size outline button', () => {
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

    it('should display small size outline button', () => {
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

    it('should display xsmall size outline button', () => {
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

    it('should display medium size ghost button', () => {
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

    it('should display large size ghost button', () => {
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

    it('should display small size ghost button', () => {
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

    it('should display xsmall size ghost button', () => {
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

    it('should display medium size link button', () => {
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

    it('should display large size link button', () => {
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

    it('should display small size link button', () => {
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

    it('should display xsmall size link button', () => {
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
});
