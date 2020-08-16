import HeaderComponent from '../../page-objects/f-header.page';
import assert from 'assert';

describe('f-header component tests', () => {
    it('should display the f-header component', () => {
        browser.url('http://localhost:8080');
        assert.ok(HeaderComponent.logoIsDisplayed());
    });
});

