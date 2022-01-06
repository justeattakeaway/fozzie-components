const Link = require('../../test-utils/component-objects/f-link.component');

const link = new Link();

describe('f-link component tests', () => {
    beforeEach(() => {
        link.load();
    });

    it('should display the f-link component', () => {
        // Assert
        expect(link.isComponentDisplayed()).toBe(true);
    });
});
