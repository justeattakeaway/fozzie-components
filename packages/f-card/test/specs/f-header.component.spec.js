import HeaderComponent from './utils/f-header.page';

describe('f-header component tests', () => {
    it('should display the f-header component', () => {
        browser.url('http://localhost:8080');
        const header = new HeaderComponent();

        header.logoIsDisplayed();
    });
});

