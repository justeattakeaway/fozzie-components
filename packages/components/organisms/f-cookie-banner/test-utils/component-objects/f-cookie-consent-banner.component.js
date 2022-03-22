const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    COOKIE_BANNER_COMPONENT,
    COOKIE_BANNER_TITLE,
    COOKIE_POLICY_LINK,
    COOKIE_ACCEPT_ALL_BUTTON,
    COOKIE_ACCEPT_NECESSARY_BUTTON
} = require('./f-cookie-banner-selectors');

module.exports = class CookieBanner extends Page {
    constructor () {
        super('organism', 'cookie-banner-component');
    }

    get component () { return $(COOKIE_BANNER_COMPONENT); }

    get cookieBannerTitle () { return $(COOKIE_BANNER_TITLE); }

    get cookiePolicyLink () { return $(COOKIE_POLICY_LINK); }

    get cookiePolicyLinkHref () { return this.cookiePolicyLink.getAttribute('href'); }

    get cookieAcceptAllButton () { return $(COOKIE_ACCEPT_ALL_BUTTON); }

    get cookieAcceptNecessaryButton () { return $(COOKIE_ACCEPT_NECESSARY_BUTTON); }

    load () {
        this.open('/');
        browser.deleteCookies();
        super.load(this.component);
    }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        this.component.waitForExist();
    }

    isCookieBannerComponentDisplayed () {
        return this.component.isDisplayed();
    }

    clickCookiePolicyLink () {
        this.cookiePolicyLink.click();
    }

    acceptCookies (value) {
        const cookieType = {
            full: this.cookieAcceptAllButton,
            necessary: this.cookieAcceptNecessaryButton
        };

        return cookieType[value].click();
    }

    testTabOrder (tabOrder) {
        const tabOrderResult = super.testTabOrder(tabOrder);
        const expectedTabOrder = tabOrder.map(el => ({
            selector: el.getAttribute('data-test-id'),
            isFocused: true
        }));
        return {
            actual: tabOrderResult,
            expected: expectedTabOrder.concat(expectedTabOrder[0])
        };
    }
};
