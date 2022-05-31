const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    HEADER_COMPONENT,
    MOBILE_NAVIGATION_BAR,
    NAVIGATION
} = require('./f-header.selectors');


module.exports = class Header extends Page {
    constructor () {
        super('organism', 'header-component');
    }

    get component () { return $(HEADER_COMPONENT); }

    navigation = {
        offersIcon: {
            get link () { return $(NAVIGATION.offersIcon.link); }
        },
        offersLink: {
            get link () { return $(NAVIGATION.offersLink.link); }
        },
        help: {
            get link () { return $(NAVIGATION.help.link); }
        },
        delivery: {
            get link () { return $(NAVIGATION.delivery.link); }
        },
        userAccount: {
            get link () { return $(NAVIGATION.userAccount.link); }
        },
        countrySelector: {
            get link () { return $(NAVIGATION.countrySelector.link); },
            get currentIcon () { return $(NAVIGATION.countrySelector.currentIcon); },
            get countries () { return $$(NAVIGATION.countrySelector.countryList); }
        }
    };

    async load () {
        await super.load(this.component);
    }

    async waitForComponent () {
        await super.waitForComponent(this.component);
    }

    async isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    async isCountryLinkDisplayed (country) {
        const countryLink = await $(`[data-test-id="countrySelector-countryList-${country}"]`);

        return countryLink.isDisplayed();
    }

    async isNavigationItemClickable (item) {
        return this.navigation[item].link.isClickable();
    }

    async openCountrySelector () {
        const countrySelectorLink = await this.navigation.countrySelector.link;

        return countrySelectorLink.click();
    }

    async clickCountryListItem (country) {
        const countryLink = await $(`[data-test-id="countrySelector-countryList-${country}"]`);

        return countryLink.click();
    }

    async moveToNavigationLink (item) {
        const navigationItem = await this.navigation[item];
        const navigationItemLink = await navigationItem.link;

        await navigationItemLink.moveTo();
    }

    async openMobileNavigationBar () {
        const mobileNavigationBar = await $(MOBILE_NAVIGATION_BAR);

        await mobileNavigationBar.click();
        const inNavView = await $('.is-navInView');

        await inNavView.waitForExist();
    }

    async hoverOverLink (item) {
        const navItem = await this.navigation[item];
        const navItemLink = await navItem.link;

        await navItemLink.moveTo();
    }

    async pressDownTabKey (times = 1) {
        Array.from({ length: times }, () => browser.keys('\uE004'));
    }
};
