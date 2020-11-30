import FooterComponent from '../../../test-utils/component-objects/f-footer.component';

describe('f-footer component tests', () => {
    it('should display the footer', () => {
        //Assert
        expect(FooterComponent.isFooterDisplayed()).toBe(true);
    });

    it('should display App Store Icons', () => {
        //Assert
        expect(FooterComponent.isIosIconDisplayed()).toBe(true);
        expect(FooterComponent.isAndroidIconDisplayed()).toBe(true);
    });

    it('App Store links should be correct', () => {
        //Act
        FooterComponent.clickIosIcon();

        //Assert
        expect(browser.getUrl()).toContain("https://apps.apple.com");  

        //Act
        browser.back();
        FooterComponent.waitForFooter();
        FooterComponent.clickAndroidIcon();

        //Assert
        expect(browser.getUrl()).toContain("https://play.google.com/");

        //Act
        // browser.back();
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
