import FooterComponent from '../../../test-utils/component-objects/f-footer.component';

describe('f-header component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
        FooterComponent.waitForFooter();
    });

    it('should display App Store Icons', () => {
        //Assert
        expect(FooterComponent.isIosIconDisplayed()).toBe(true);
        expect(FooterComponent.isAndroidIconDisplayed()).toBe(true);
    });

    it('App Store links should be correct', () => {
        FooterComponent.clickIosIcon();
        expect(browser.getUrl()).toContain("https://apps.apple.com");  
        browser.back();
        FooterComponent.waitForFooter();
        FooterComponent.clickAndroidIcon();
        expect(browser.getUrl()).toContain("https://play.google.com/");
    });

    it('should display Social Media Icons', () => {
        //Assert
        expect(FooterComponent.isTwitterIconDisplayed()).toBe(true);
        expect(FooterComponent.isInstagramIconDisplayed()).toBe(true);
        expect(FooterComponent.isFacebookIconDisplayed()).toBe(true);
    });

    it('Social Media links should be correct', () => {
        // Act
        FooterComponent.clickFacebookIcon(); 

        // Assert
        expect(browser.getUrl()).toContain("https://www.facebook.com");

        // Act
        browser.back(); 
        FooterComponent.waitForFooter();
        FooterComponent.clickTwitterIcon(); 

        // Assert
        expect(browser.getUrl()).toContain("https://twitter.com");

        // Act
        browser.back(); 
        FooterComponent.waitForFooter(); 
        FooterComponent.clickInstagramIcon();
        
        // Assert
        expect(browser.getUrl()).toContain("https://www.instagram.com");
    });

});