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
         expect(HeaderComponent.isMobileNavigationVisible()).toBe(true);
         expect(HeaderComponent.isHelpLinkDisplayed()).toBe(false); 
         expect(HeaderComponent.isLoginLinkDisplayed()).toBe(false);

        // Act
         browser.setWindowSize(1000, 1000); 

         // Assert
         expect(HeaderComponent.isMobileNavigationVisible()).toBe(false);
         expect(HeaderComponent.isHelpLinkDisplayed()).toBe(true); 
         expect(HeaderComponent.isLoginLinkDisplayed()).toBe(true);
    });

    it('should change url when help link is clicked', () => {
        // Act
        HeaderComponent.clickHelpLink(); 

        // Assert
        expect(browser.getUrl()).toContain("http://localhost:8080/help");
    }); 

    it('should change url when login link is clicked', () => {
        // Act
        HeaderComponent.clickLoginLink(); 

        // Assert
        expect(browser.getUrl()).toContain("/account/login");
    });

    it('should change the url to offers when offers link is clicked', () => {
       // Act
       HeaderComponent.clickOffersLink(); 

       // Assert
       expect(browser.getUrl()).toContain("/offers");
    });

    it('should display the "For You" icon for mobile', () => {
        //Act
        browser.setWindowSize(500, 500);

        //Assert
        expect(HeaderComponent.isMobileOffersIconDisplayed()).toBe(true); 
    });
    // Skip until we have solved mobile icon
    it.skip('should display expected offers link depending on viewport-size', () => {
     
        // Assert
        expect(HeaderComponent.isNavigationOffersLinkDisplayed()).toBe(true);
        expect(HeaderComponent.isMobileOffersIconDisplayed()).toBe(false);

        //Act
        // resize to mobile
        browser.setWindowSize(500, 500);

        expect(HeaderComponent.isNavigationOffersLinkDisplayed()).toBe(false);
        expect(HeaderComponent.isMobileOffersIconDisplayed()).toBe(true);

        // Act
        HeaderComponent.openMobileNavigation()

        // Assert
        expect(HeaderComponent.isNavigationOffersLinkDisplayed()).toBe(true);
        expect(HeaderComponent.isMobileOffersIconDisplayed()).toBe(true);

    });
});