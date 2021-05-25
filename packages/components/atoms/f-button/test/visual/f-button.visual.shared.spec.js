const Button = require('../../test-utils/component-objects/f-button.component');

const button = new Button();

describe('f-button visual tests', () => {
    it('should display mediun size primary button', () => {
        const buttonData = {
            type: 'primary',
            size: 'medium'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Primary - Medium', 'shared');
    });

    it('should display large size primary button', () => {
        const buttonData = {
            type: 'primary',
            size: 'large'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Primary - Large', 'shared');
    });

    it('should display small size primary button', () => {
        const buttonData = {
            type: 'primary',
            size: 'small'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Primary - Small', 'shared');
    });

    it('should display xsmall size primary button', () => {
        const buttonData = {
            type: 'primary',
            size: 'xsmall'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Primary - XSmall', 'shared');
    });

    it('should display mediun size secondary button', () => {
        const buttonData = {
            type: 'secondary',
            size: 'medium'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Secondary - Medium', 'shared');
    });

    it('should display large size secondary button', () => {
        const buttonData = {
            type: 'secondary',
            size: 'large'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Secondary - Large', 'shared');
    });

    it('should display small size secondary button', () => {
        const buttonData = {
            type: 'secondary',
            size: 'small'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Secondary - Small', 'shared');
    });

    it('should display xsmall size secondary button', () => {
        const buttonData = {
            type: 'secondary',
            size: 'xsmall'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Secondary - XSmall', 'shared');
    });

    it('should display mediun size outline button', () => {
        const buttonData = {
            type: 'outline',
            size: 'medium'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Outline - Medium', 'shared');
    });

    it('should display large size outline button', () => {
        const buttonData = {
            type: 'outline',
            size: 'large'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Outline - Large', 'shared');
    });

    it('should display small size outline button', () => {
        const buttonData = {
            type: 'outline',
            size: 'small'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Outline - Small', 'shared');
    });

    it('should display xsmall size outline button', () => {
        const buttonData = {
            type: 'outline',
            size: 'xsmall'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Outline - XSmall', 'shared');
    });

    it('should display mediun size ghost button', () => {
        const buttonData = {
            type: 'ghost',
            size: 'medium'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Ghost - Medium', 'shared');
    });

    it('should display large size ghost button', () => {
        const buttonData = {
            type: 'ghost',
            size: 'large'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Ghost - Large', 'shared');
    });

    it('should display small size ghost button', () => {
        const buttonData = {
            type: 'ghost',
            size: 'small'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Ghost - Small', 'shared');
    });

    it('should display xsmall size ghost button', () => {
        const buttonData = {
            type: 'ghost',
            size: 'xsmall'
        };

        button.open(buttonData);
        button.waitForActionComponent();

        // Assert
        browser.percyScreenshot('f-button - Ghost - XSmall', 'shared');
    });

        it('should display medium size link button', () => {
        const buttonData = {
            type: 'link',
            size: 'medium'
        };

        button.open(buttonData);
        button.waitForLinkComponent();

        // Assert
        browser.percyScreenshot('f-button - Link - Medium', 'shared');
    });

    it('should display large size link button', () => {
        const buttonData = {
            type: 'link',
            size: 'large'
        };

        button.open(buttonData);
        button.waitForLinkComponent();

        // Assert
        browser.percyScreenshot('f-button - Link - Large', 'shared');
    });

    it('should display small size link button', () => {
        const buttonData = {
            type: 'link',
            size: 'small'
        };

        button.open(buttonData);
        button.waitForLinkComponent();

        // Assert
        browser.percyScreenshot('f-button - Link - Small', 'shared');
    });

    it('should display xsmall size link button', () => {
        const buttonData = {
            type: 'link',
            size: 'xsmall'
        };

        button.open(buttonData);
        button.waitForLinkComponent();

        // Assert
        browser.percyScreenshot('f-button - Link - XSmall', 'shared');
    });
});
