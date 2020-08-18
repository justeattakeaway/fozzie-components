import HeaderComponent from './utils/f-header.page';

describe('f-header component tests', () => {
    browser.url('http://localhost:8080');
    const header = new HeaderComponent();

    it('should display the f-header component', () => {
        header.logoIsDisplayed();
    });
});

