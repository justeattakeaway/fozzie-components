const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.class %>.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const <%= name.class %> = new <%= name.filename %>

describe('f-<%= name.class %> component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(<%= name.class %>.componentType, <%= name.class %>.componentName, <%= name.class %>.path);

        <%= name.class %>.open(pageUrl)
        <%= name.class %>.waitForComponent();
    });

    it('should display the f-<%= name.class %> component', () => {
        // Assert
        expect(<%= name.class %>.isComponentDisplayed()).toBe(true);
    });
});
