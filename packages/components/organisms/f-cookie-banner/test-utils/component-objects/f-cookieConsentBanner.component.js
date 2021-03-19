const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class CookieBanner extends Page {

    get component () { return $('[data-test-id="cookieConsentBanner"]')}
    get cookiePolicyLink () { return this.component.$('[data-test-id="cookie-policy-link"]')}
    get cookieAcceptAllButton () { return this.component.$('[data-test-id="accept-all-cookies-button"]')}
    get cookieAcceptNecessaryButton () { return this.component.$('[data-test-id="accept-necessary-cookies-button"]')}
    get componentContent () { return $('[data-test-id="cookieBannerContent"]')}

    open (locale = 'ie') {
        let countryFormatted = locale.toUpperCase();
        let formattedLocale = '';
        switch (countryFormatted) {
            case 'IE':
                formattedLocale = `en-${countryFormatted}`;
                break;
            case 'DK':
                formattedLocale = `da-${countryFormatted}`;
                break;
            case 'ES':
                formattedLocale = `es-${countryFormatted}`;
                break;
            case 'IT':
                formattedLocale = `it-${countryFormatted}`;
                break;
            case 'NO':
                formattedLocale = `nb-${countryFormatted}`;
                break;
            default:
                throw new Error (`locale ${countryFormatted} is not supported`);
        }
        super.openComponent('organism', `cookie-banner-component&knob-Locale=${formattedLocale}`);
    }




    waitForComponent() {
        this.component.waitForExist();
    }

    isCookieBannerComponentDisplayed() {
        return this.component.isDisplayed();
    }

    isCookieBannerContentDisplayed() {
        return this.componentContent.isDisplayed();
    }

    isCookieBannerAcceptAllButtonDisplayed() {
        return this.cookieAcceptAllButton.isDisplayed();
    }

    isCookieBannerAcceptNecessaryButtonDisplayed() {
        return this.cookieAcceptNecessaryButton.isDisplayed();
    }

    clickCookiePolicyLink() {
        this.cookiePolicyLink.click();
    }


    acceptCookies(cookieType) {
        switch(cookieType.toLowerCase()) {
            case 'full':
                this.cookieAcceptAllButton.click();
            break;
            case 'necessary':
                this.cookieAcceptNecessaryButton.click();
            break;
        }
        return this;
    }
};
