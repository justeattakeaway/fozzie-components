import assert from 'assert';
import HeaderComponent from '../../test-utils/component-objects/f-header.component';

describe('f-header component tests', () => {
    it('should display the f-header component', () => {
        // Arrange
        browser.url('http://localhost:8080');

        // Assert
        assert.ok(HeaderComponent.isLogoDisplayed());
    });
});

