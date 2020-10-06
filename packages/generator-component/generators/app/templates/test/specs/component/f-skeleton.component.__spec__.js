import <%= name.filename %>Component from '../../../test-utils/component-objects/f-<%= name.class %>.component';

describe('f-<%= name.class %> component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
    })

    it('should display the f-<%= name.class %> component', () => {
        // Assert
        expect(<%= name.filename %>Component.is<%= name.filename %>ComponentDisplayed()).toBe(true);
    });
});
