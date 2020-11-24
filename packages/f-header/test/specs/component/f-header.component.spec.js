import HeaderComponent from '../../../test-utils/component-objects/f-header.component';

describe('f-header component tests', () => {
    it('should display the f-header component', () => {
        // Assert
        expect(HeaderComponent.isLogoDisplayed()).toBe(true);
    });

    it('should alter visibility of navbar depending on window size', () => {
        // Act
        browser.setWindowSize(500, 500)

         // Assert
         expect(HeaderComponent.isNavIconVisible()).toBe(true);
         expect(HeaderComponent.isHelpLinkDisplayed()).toBe(false); 
         expect(HeaderComponent.isLoginLinkDisplayed()).toBe(false);

        // Act
         browser.setWindowSize(1000, 1000); 

         // Assert
         expect(HeaderComponent.isNavIconVisible()).toBe(false);
         expect(HeaderComponent.isHelpLinkDisplayed()).toBe(true); 
         expect(HeaderComponent.isLoginLinkDisplayed()).toBe(true);
    });

    it('should display navigation toolbar when window is responsive', () => {
        // Act
        browser.setWindowSize(500, 500)

        //Assert
        expect(HeaderComponent.isHelpLinkDisplayed()).toBe(false);
        expect(HeaderComponent.isLoginLinkDisplayed()).toBe(false);
    });

    it('should change url when help link is clicked', () => {

        // Act
        browser.setWindowSize(1000, 1000)
        HeaderComponent.clickHelpLink(); 

        //Assert
        expect(browser.getUrl()).toContain("http://localhost:8080/help");

        // Act
        browser.back();
    }); 

    it('should change url when login link is clicked', () => {
        // Act
        HeaderComponent.clickLoginLink(); 

        // //Assert
        expect(browser.getUrl()).toContain("/account/login");
    });
});