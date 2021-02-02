import <%= name.filename %>Component from '../../../test-utils/component-objects/f-<%= name.class %>.component';

describe('f-<%= name.class %> component tests', () => {
    beforeEach(() => {
        browser.url('?path=<%= storybook.path %>');
        browser.switchToFrame(0);
        <%= name.filename %>Component.waitFor<%= name.filename %>Component();
    });

    it('should display the f-<%= name.class %> component', () => {
        // Assert
        expect(<%= name.filename %>Component.is<%= name.filename %>ComponentDisplayed()).toBe(true);
    });
});
