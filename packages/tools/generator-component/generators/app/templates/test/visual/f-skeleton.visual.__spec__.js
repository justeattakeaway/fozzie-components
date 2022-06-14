import forEach from 'mocha-each';

const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

forEach(['desktop', 'mobile'])
.describe('f-<%= name.default %> - %s - Visual tests', device => {
    let <%= name.class %>;

    beforeEach(() => {
        // Arrange
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }

        <%= name.class %> = new <%= name.filename %>();
    });

    it('should display the f-<%= name.default %> component', async () => {
        // Act
        await <%= name.class %>.load();

        // Assert
        await browser.percyScreenshot('f-<%= name.default %> - Visual Test', device);
    });
});
