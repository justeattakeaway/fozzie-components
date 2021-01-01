import <%= name.filename %>Component from '../../../test-utils/component-objects/f-<%= name.class %>.component';

describe('f-<%= name.class %> component tests', () => {
    it('should display the f-<%= name.class %> component', () => {
        // Assert
        expect(<%= name.filename %>Component.is<%= name.filename %>ComponentDisplayed()).toBe(true);
    });
});
